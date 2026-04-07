import { RegistrationForm } from "@/components/RegistrationForm";
import logo from "@/assets/logo.png";
import bg1 from "@/assets/bg1.jpg";
import tianbo from "@/assets/tianbo.png";

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
        {/* LOGO 區域 with animations */}
        <div className="relative flex justify-center mb-6 -mt-24 translate-x-12">
          {/* 旋轉光線 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-rotate-lines" style={{ width: '36rem', height: '36rem' }}>
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 animate-line-pulse"
                  style={{
                    width: '2px',
                    height: '45%',
                    background: `linear-gradient(to top, transparent, hsla(${280 + i * 15}, 80%, 70%, 0.6), transparent)`,
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.25}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* LOGO with glow */}
          <div className="relative animate-logo-glow animate-logo-shine">
            <img
              src={logo}
              alt="沐月仙境"
              className="w-[36rem] md:w-[42rem] lg:w-[48rem]"
            />
          </div>

          {/* 天波角色 - 圍繞跳動 */}
          <div className="absolute -right-4 -top-4 md:right-4 md:top-0 animate-tianbo-orbit">
            <img
              src={tianbo}
              alt="天波"
              className="w-20 md:w-28 lg:w-32 animate-tianbo-bounce drop-shadow-lg"
            />
          </div>
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
