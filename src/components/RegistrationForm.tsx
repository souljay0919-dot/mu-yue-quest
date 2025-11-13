import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const registrationSchema = z.object({
  username: z
    .string()
    .min(6, { message: "帳號至少需要6個字元" })
    .regex(/^[a-zA-Z0-9]+$/, { message: "帳號不能包含特殊符號" }),
  password: z.string().min(1, { message: "請輸入密碼" }),
  captcha: z.string().min(1, { message: "請輸入驗證碼" }),
});

const generateCaptcha = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  return captcha;
};

export const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      registrationSchema.parse({
        username,
        password,
        captcha: captchaInput,
      });

      if (captchaInput.toLowerCase() !== captcha.toLowerCase()) {
        toast({
          title: "驗證碼錯誤",
          description: "請輸入正確的驗證碼",
          variant: "destructive",
        });
        refreshCaptcha();
        return;
      }

      setIsSubmitting(true);

      const { error } = await supabase
        .from("registrations")
        .insert([{ username, password }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "預約失敗",
            description: "此帳號已被使用，請使用其他帳號",
            variant: "destructive",
            duration: 5000,
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "🎉 預約成功！",
          description: "感謝您的預約，我們會盡快與您聯繫",
          duration: 5000,
          className: "text-2xl font-bold",
        });
        setUsername("");
        setPassword("");
        setCaptchaInput("");
        refreshCaptcha();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "輸入錯誤",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "預約失敗",
          description: "系統發生錯誤，請稍後再試",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-mystic-dark text-base sm:text-lg font-semibold">
            帳號
          </Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="至少6個字元，不含特殊符號"
            className="bg-white border-mystic-cyan/40 text-mystic-dark placeholder:text-gray-400 focus:border-mystic-purple focus:ring-mystic-purple/20"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-mystic-dark text-base sm:text-lg font-semibold">
            密碼
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="請輸入密碼"
            className="bg-white border-mystic-cyan/40 text-mystic-dark placeholder:text-gray-400 focus:border-mystic-purple focus:ring-mystic-purple/20"
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="captcha" className="text-mystic-dark text-base sm:text-lg font-semibold">
            驗證碼
          </Label>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <Input
              id="captcha"
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="請輸入驗證碼"
              className="bg-white border-mystic-cyan/40 text-mystic-dark placeholder:text-gray-400 focus:border-mystic-purple focus:ring-mystic-purple/20"
              disabled={isSubmitting}
            />
            <div className="flex gap-2 items-center">
              <div className="bg-gradient-to-r from-mystic-cyan/20 to-mystic-purple/20 px-4 py-2 rounded-lg font-mono text-xl font-bold tracking-wider select-none border-2 border-mystic-cyan/50 text-mystic-purple">
                {captcha}
              </div>
              <Button
                type="button"
                onClick={refreshCaptcha}
                variant="outline"
                size="icon"
                disabled={isSubmitting}
                className="border-mystic-cyan/40 hover:bg-mystic-cyan/10 hover:border-mystic-cyan"
              >
                🔄
              </Button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full text-base sm:text-lg py-4 sm:py-6 bg-gradient-to-r from-mystic-purple to-mystic-cyan hover:from-mystic-purple/90 hover:to-mystic-cyan/90 text-white font-bold shadow-lg hover:shadow-xl transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "處理中..." : "搶先預約"}
        </Button>
      </form>
    </div>
  );
};
