"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI만 구현 - 실제 인증 로직 없음
    alert(isLogin ? "로그인 기능은 준비 중입니다." : "회원가입 기능은 준비 중입니다.");
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-20">
      <div className="w-full max-w-md mx-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="text-3xl font-serif tracking-wider text-stone-900"
          >
            MAISON DESSERT
          </Link>
          <p className="text-stone-500 mt-4">
            {isLogin ? "로그인하고 더 많은 혜택을 누리세요" : "회원가입하고 특별한 혜택을 받아보세요"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-stone-200 p-8 md:p-12">
          {/* Tabs */}
          <div className="flex border-b border-stone-200 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-4 text-sm tracking-wider uppercase transition-colors ${
                isLogin
                  ? "text-stone-900 border-b-2 border-stone-900"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-4 text-sm tracking-wider uppercase transition-colors ${
                !isLogin
                  ? "text-stone-900 border-b-2 border-stone-900"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              회원가입
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-stone-600 mb-2"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                  placeholder="홍길동"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-stone-600 mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                placeholder="hello@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-stone-600 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-stone-300 rounded"
                  />
                  로그인 상태 유지
                </label>
                <button
                  type="button"
                  className="text-stone-500 hover:text-stone-900 transition-colors"
                >
                  비밀번호 찾기
                </button>
              </div>
            )}

            {!isLogin && (
              <div className="text-sm text-stone-500">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-stone-300 rounded mt-0.5"
                    required
                  />
                  <span>
                    <span className="text-stone-900">(필수)</span> 이용약관 및
                    개인정보처리방침에 동의합니다.
                  </span>
                </label>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" className="mt-8">
              {isLogin ? "로그인" : "회원가입"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-stone-400">또는</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full py-3 border border-stone-300 flex items-center justify-center gap-3 text-stone-600 hover:bg-stone-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 계속하기
            </button>
            <button className="w-full py-3 border border-stone-300 bg-[#FEE500] flex items-center justify-center gap-3 text-stone-900 hover:bg-[#FDD835] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 3C6.48 3 2 6.48 2 11c0 2.95 1.86 5.54 4.63 6.91-.15.53-.64 2.28-.73 2.65-.12.48.18.47.38.34.15-.1 2.41-1.63 3.38-2.29.76.11 1.54.17 2.34.17 5.52 0 10-3.48 10-8s-4.48-8-10-8z"
                />
              </svg>
              카카오로 계속하기
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-stone-500 text-sm mt-8">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            홈으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}

