import { useState, useEffect } from "react";
import { RegistrationForm } from "@/components/RegistrationForm";
import logo from "@/assets/logo.png";
import bg1 from "@/assets/bg1.jpg";
import bg2 from "@/assets/bg2.png";

const Index = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const backgrounds = [bg1, bg2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 15000); // 每 15 秒輪播一次
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景圖片輪播 */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentBg === index ? 1 : 0,
          }}
        />
      ))}

      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 內容區塊 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* 表單卡片 */}
        <div className="w-full max-w-md rounded-2xl bg-white/0 backdrop-blur-md p-8 shadow-xl border border-white/10 animate-scale-in">
          {/* LOGO 放在表單區塊上方 */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <img
              src={logo}
              alt="沐月仙境"
              className="h-24 w-auto drop-shadow-2xl md:h-28"
            />
          </div>

          {/* 標題 */}
          <h1 className="mb-6 text-center text-3xl font-bold text-white drop-shadow-md">
            搶先預約
          </h1>

          {/* 表單元件 */}
          <RegistrationForm />
        </div>

        {/* 底部文字 */}
        <p className="mt-8 text-center text-white/80 drop-shadow-lg">
          開啟您的沐月仙境之旅
        </p>
      </div>
    </div>
  );
};

export default Index;
