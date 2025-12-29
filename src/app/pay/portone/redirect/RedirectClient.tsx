"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedirectClient() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const imp_uid = sp.get("imp_uid") || "";
    const merchant_uid = sp.get("merchant_uid") || "";

    router.replace(
      `/order/complete?imp_uid=${encodeURIComponent(imp_uid)}&merchant_uid=${encodeURIComponent(merchant_uid)}`
    );
  }, [router, sp]);

  return (
    <div className="min-h-screen flex items-center justify-center text-stone-600">
      결제 결과 확인 중...
    </div>
  );
}
