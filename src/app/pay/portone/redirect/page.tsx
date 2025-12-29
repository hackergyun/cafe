"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/**
 * PortOne 결제 리다이렉트 페이지
 * /pay/portone/redirect
 *
 * URL 쿼리에서 imp_uid, merchant_uid를 읽어서
 * /order/complete로 리다이렉트
 */
export default function PortOneRedirectPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const imp_uid = searchParams.get("imp_uid");
    const merchant_uid = searchParams.get("merchant_uid");

    if (imp_uid && merchant_uid) {
      // 쿼리 파라미터를 포함하여 주문 완료 페이지로 이동
      router.replace(
        `/order/complete?imp_uid=${imp_uid}&merchant_uid=${merchant_uid}`
      );
    } else {
      // 필수 파라미터가 없으면 홈으로 이동
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-stone-600">결제 결과 확인 중...</p>
      </div>
    </div>
  );
}

