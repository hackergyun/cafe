import { Suspense } from "react";
import RedirectClient from "./RedirectClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-stone-600">
          결제 결과 확인 중...
        </div>
      }
    >
      <RedirectClient />
    </Suspense>
  );
}
