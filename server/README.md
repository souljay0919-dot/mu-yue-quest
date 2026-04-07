# 搶先預約 API Server

Node.js Express 後端，提供 `/api/registrations` CRUD 路由。

## 安裝

```bash
cd server
npm install
```

## 環境變數

建立 `.env` 或直接在終端設定：

| 變數 | 說明 | 預設值 |
|------|------|--------|
| `DB_TYPE` | 資料庫類型 `mysql` 或 `postgres` | `postgres` |
| `DB_HOST` | 資料庫主機 | `localhost` |
| `DB_PORT` | 資料庫埠 | MySQL: `3306` / PG: `5432` |
| `DB_USER` | 資料庫帳號 | MySQL: `root` / PG: `postgres` |
| `DB_PASSWORD` | 資料庫密碼 | （空） |
| `DB_NAME` | 資料庫名稱 | `registration_db` |
| `PORT` | API 伺服器埠 | `3000` |

## 啟動

```bash
# PostgreSQL
DB_TYPE=postgres DB_PASSWORD=your_password npm run dev

# MySQL
DB_TYPE=mysql DB_PASSWORD=your_password npm run dev
```

## API 端點

| Method | Path | 說明 |
|--------|------|------|
| `POST` | `/api/registrations` | 新增預約（帳號 + 密碼）|
| `GET` | `/api/registrations` | 取得所有預約列表 |
| `GET` | `/api/registrations/:id` | 取得單筆預約 |
| `PUT` | `/api/registrations/:id` | 更新預約 |
| `DELETE` | `/api/registrations/:id` | 刪除預約 |

## 前端設定

在前端專案根目錄的 `.env` 加入：

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## 請求範例

```bash
# 新增預約
curl -X POST http://localhost:3000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"123456"}'

# 取得所有預約
curl http://localhost:3000/api/registrations
```
