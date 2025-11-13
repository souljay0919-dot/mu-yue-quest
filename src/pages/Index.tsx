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
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景圖片 */}
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

      {/* Logo - 左上角 */}
      <div className="absolute top-6 left-6 z-20 animate-fade-in">
        <img
          src={logo}
          alt="沐月仙境"
          className="h-24 w-auto drop-shadow-2xl md:h-28"
        />
      </div>

      {/* 內容 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* 表單卡片 */}
        <div className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur-md p-8 shadow-2xl border border-mystic-cyan/30 animate-scale-in">
          <h1 className="mb-6 text-center text-3xl font-bold text-mystic-dark bg-gradient-to-r from-mystic-purple to-mystic-cyan bg-clip-text text-transparent">
            搶先預約
          </h1>
          <RegistrationForm />
        </div>

        {/* 底部文字 */}
        <p className="mt-8 text-center text-white drop-shadow-lg text-lg font-medium">
          開啟您的沐月仙境之旅
        </p>
      </div>
    </div>
  );
};

export default Index;
