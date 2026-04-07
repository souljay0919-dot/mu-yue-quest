/**
 * 搶先預約 API Server
 * 支援 MySQL 或 PostgreSQL，透過環境變數 DB_TYPE 切換
 *
 * 使用方式：
 *   cd server
 *   npm install
 *   # 設定環境變數（見下方說明）
 *   npm run dev
 *
 * 環境變數：
 *   DB_TYPE=mysql 或 DB_TYPE=postgres（預設 postgres）
 *   DB_HOST=localhost
 *   DB_PORT=3306（MySQL）或 5432（PostgreSQL）
 *   DB_USER=root
 *   DB_PASSWORD=your_password
 *   DB_NAME=registration_db
 *   PORT=3000（API 伺服器埠）
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_TYPE = (process.env.DB_TYPE || "postgres").toLowerCase();

app.use(cors());
app.use(express.json());

// ===================== 資料庫連線 =====================

let db;

if (DB_TYPE === "mysql") {
  const mysql = require("mysql2/promise");
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "registration_db",
    waitForConnections: true,
    connectionLimit: 10,
  });

  db = {
    query: async (sql, params) => {
      const [rows] = await pool.execute(sql, params);
      return rows;
    },
    init: async () => {
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS registrations (
          id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("[MySQL] registrations 資料表已就緒");
    },
  };
} else {
  const { Pool } = require("pg");
  const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "registration_db",
  });

  db = {
    query: async (sql, params) => {
      const result = await pool.query(sql, params);
      return result.rows;
    },
    init: async () => {
      await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
        CREATE TABLE IF NOT EXISTS registrations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          username VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMPTZ DEFAULT now()
        )
      `);
      console.log("[PostgreSQL] registrations 資料表已就緒");
    },
  };
}

// ===================== CRUD 路由 =====================

// POST /api/registrations — 新增預約
app.post("/api/registrations", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "帳號和密碼為必填欄位" });
    }

    let result;
    if (DB_TYPE === "mysql") {
      const id = require("crypto").randomUUID();
      await db.query(
        "INSERT INTO registrations (id, username, password) VALUES (?, ?, ?)",
        [id, username, password]
      );
      result = await db.query("SELECT * FROM registrations WHERE id = ?", [id]);
      result = result[0];
    } else {
      const rows = await db.query(
        "INSERT INTO registrations (username, password) VALUES ($1, $2) RETURNING *",
        [username, password]
      );
      result = rows[0];
    }

    res.status(201).json(result);
  } catch (err) {
    if (err.code === "23505" || err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "此帳號已被使用" });
    }
    console.error("POST /api/registrations error:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// GET /api/registrations — 取得所有預約
app.get("/api/registrations", async (req, res) => {
  try {
    const rows = await db.query(
      "SELECT id, username, created_at FROM registrations ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /api/registrations error:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// GET /api/registrations/:id — 取得單筆預約
app.get("/api/registrations/:id", async (req, res) => {
  try {
    const placeholder = DB_TYPE === "mysql" ? "?" : "$1";
    const rows = await db.query(
      `SELECT id, username, created_at FROM registrations WHERE id = ${placeholder}`,
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "找不到此預約" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("GET /api/registrations/:id error:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// PUT /api/registrations/:id — 更新預約
app.put("/api/registrations/:id", async (req, res) => {
  try {
    const { username, password } = req.body;
    let result;

    if (DB_TYPE === "mysql") {
      await db.query(
        "UPDATE registrations SET username = COALESCE(?, username), password = COALESCE(?, password) WHERE id = ?",
        [username || null, password || null, req.params.id]
      );
      result = await db.query("SELECT id, username, created_at FROM registrations WHERE id = ?", [
        req.params.id,
      ]);
      if (result.length === 0) return res.status(404).json({ error: "找不到此預約" });
      result = result[0];
    } else {
      const rows = await db.query(
        "UPDATE registrations SET username = COALESCE($1, username), password = COALESCE($2, password) WHERE id = $3 RETURNING id, username, created_at",
        [username || null, password || null, req.params.id]
      );
      if (rows.length === 0) return res.status(404).json({ error: "找不到此預約" });
      result = rows[0];
    }

    res.json(result);
  } catch (err) {
    if (err.code === "23505" || err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "此帳號已被使用" });
    }
    console.error("PUT /api/registrations/:id error:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// DELETE /api/registrations/:id — 刪除預約
app.delete("/api/registrations/:id", async (req, res) => {
  try {
    const placeholder = DB_TYPE === "mysql" ? "?" : "$1";
    const rows = await db.query(
      `DELETE FROM registrations WHERE id = ${placeholder} ${DB_TYPE === "mysql" ? "" : "RETURNING id"}`,
      [req.params.id]
    );

    if (DB_TYPE === "mysql") {
      // MySQL doesn't support RETURNING, check affectedRows
    }

    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/registrations/:id error:", err);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// ===================== 啟動 =====================

(async () => {
  try {
    await db.init();
    app.listen(PORT, () => {
      console.log(`\n✅ API Server 啟動成功`);
      console.log(`   資料庫類型: ${DB_TYPE.toUpperCase()}`);
      console.log(`   http://localhost:${PORT}/api/registrations\n`);
    });
  } catch (err) {
    console.error("❌ 無法啟動伺服器:", err.message);
    process.exit(1);
  }
})();
