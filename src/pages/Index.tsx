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
        {/* 表單卡片 - 仿 fate-ro 風格：白色半透明毛玻璃 */}
        <div className="w-full max-w-lg rounded-3xl bg-white/60 backdrop-blur-xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/40 animate-scale-in">
          {/* LOGO */}
          <div className="flex justify-center mb-2 animate-fade-in">
            <img
              src={logo}
              alt="沐月仙境"
              className="h-44 w-auto drop-shadow-2xl md:h-52"
            />
          </div>

          {/* 標題 */}
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 drop-shadow-sm">
            搶先預約
          </h1>

          {/* 表單元件 */}
          <RegistrationForm />
        </div>

        {/* 底部文字 */}
        <p className="mt-8 text-center text-white/90 drop-shadow-lg text-lg font-medium">
          開啟您的沐月仙境之旅
        </p>
      </div>
    </div>
  );
};

export default Index;
