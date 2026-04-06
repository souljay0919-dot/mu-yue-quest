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
        {/* LOGO - 放寬，往上移，並向右偏移 */}
        <div className="flex justify-center mb-6 -mt-24 translate-x-12">
          <img
            src={logo}
            alt="沐月仙境"
            className="w-[36rem] md:w-[42rem] lg:w-[48rem] drop-shadow-2xl"
          />
        </div>

        {/* 表單卡片 - 直立長方形比例 */}
        <div
          className="
            w-full max-w-sm
            h-[36rem] md:h-[42rem] lg:h-[48rem]
            -mt-4
            rounded-2xl bg-white/10 backdrop-blur-lg
            p-10 pt-16 shadow-2xl border border-white/20 animate-scale-in
            flex flex-col justify-start
          "
        >
          {/* 標題 */}
          <h1 className="mb-8 text-center text-3xl font-bold text-white drop-shadow-md">
            搶先預約
          </h1>

          {/* 表單元件 */}
          <RegistrationForm />

          {/* 底部文字 */}
          <p className="mt-auto text-center text-white/70 drop-shadow">
            開啟您的沐月仙境之旅
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
