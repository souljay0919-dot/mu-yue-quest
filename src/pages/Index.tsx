import { RegistrationForm } from "@/components/RegistrationForm";
import logo from "@/assets/logo.png";
import bg1 from "@/assets/bg1.jpg";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 背景圖片 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 淡色遮罩 */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 內容區塊 */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* LOGO - 位於卡片上方，與卡片重疊 */}
        <div className="flex justify-center mb-[-3rem] z-10 animate-fade-in">
          <img
            src={logo}
            alt="沐月仙境"
            className="w-80 md:w-96 drop-shadow-2xl translate-x-3"
          />
        </div>

        {/* 表單卡片 - 原始透明玻璃感 */}
        <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg p-8 pt-16 shadow-2xl border border-white/20 animate-scale-in">
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
