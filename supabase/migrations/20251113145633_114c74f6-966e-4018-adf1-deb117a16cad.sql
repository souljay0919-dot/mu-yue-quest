-- 創建預約表
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 啟用 RLS (Row Level Security)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- 創建公開插入政策（允許任何人註冊）
CREATE POLICY "Anyone can register"
ON public.registrations
FOR INSERT
TO anon
WITH CHECK (true);

-- 創建索引以提升查詢效能
CREATE INDEX idx_registrations_username ON public.registrations(username);
CREATE INDEX idx_registrations_created_at ON public.registrations(created_at DESC);