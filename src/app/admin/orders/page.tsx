"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";

type OrderStatus = "pending" | "confirmed" | "shipped" | "canceled";

type AdminOrder = {
  id: string;
  orderNumber?: string;
  status?: OrderStatus;
  createdAt?: any;

  customer?: {
    name?: string;
    phone?: string;
  };

  shipping?: {
    address?: string;
    addressDetail?: string;
    request?: string;
  };

  items?: Array<{
    productId?: string;
    name?: string;
    price?: number;
    quantity?: number;
  }>;

  pricing?: {
    subtotal?: number;
    shippingFee?: number;
    total?: number;
  };
};

const STATUS_OPTIONS: Array<{ value: OrderStatus | "all"; label: string }> = [
  { value: "all", label: "전체" },
  { value: "pending", label: "대기" },
  { value: "confirmed", label: "확인" },
  { value: "shipped", label: "발송" },
  { value: "canceled", label: "취소" },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function statusBadge(status?: OrderStatus) {
  switch (status) {
    case "pending":
      return "bg-stone-100 text-stone-700";
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "shipped":
      return "bg-green-100 text-green-700";
    case "canceled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-stone-100 text-stone-700";
  }
}

function statusLabel(status?: OrderStatus) {
  switch (status) {
    case "pending":
      return "대기";
    case "confirmed":
      return "확인";
    case "shipped":
      return "발송";
    case "canceled":
      return "취소";
    default:
      return "-";
  }
}

const STORAGE_KEY = "cafe_admin_password_v1";

export default function AdminOrdersPage() {
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authed, setAuthed] = useState(false);

  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);

  // ✅ Stage2-1: 선택된 주문
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // 로컬 저장된 비번 자동 로드
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      setAdminPassword(saved);
      setAuthed(true);
    }
  }, []);

  const fetchOrders = async (pw: string, status: OrderStatus | "all") => {
    setLoading(true);
    setError(null);

    try {
      const qs = new URLSearchParams();
      if (status !== "all") qs.set("status", status);
      qs.set("limit", "100");

      const res = await fetch(`/api/admin/orders?${qs.toString()}`, {
        headers: {
          "x-admin-password": pw,
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        throw new Error("비밀번호가 틀렸습니다.");
      }
      if (!res.ok) {
        throw new Error("주문 목록을 불러오지 못했습니다.");
      }

      const data = await res.json();
      const nextOrders: AdminOrder[] = data.orders || [];
      setOrders(nextOrders);

      // ✅ 선택 유지 로직
      setSelectedOrderId((prev) => {
        if (!nextOrders.length) return null;
        if (!prev) return nextOrders[0].id;
        const exists = nextOrders.some((o) => o.id === prev);
        return exists ? prev : nextOrders[0].id;
      });
    } catch (e: any) {
      setOrders([]);
      setSelectedOrderId(null);
      setError(e?.message || "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 인증 후 최초 로드
  useEffect(() => {
    if (!authed || !adminPassword) return;
    fetchOrders(adminPassword, filterStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  // 필터 변경 시 재조회
  useEffect(() => {
    if (!authed || !adminPassword) return;
    fetchOrders(adminPassword, filterStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  const totalCount = orders.length;

  const selectedOrder = useMemo(() => {
    if (!orders.length) return null;
    if (!selectedOrderId) return orders[0] || null;
    return orders.find((o) => o.id === selectedOrderId) || orders[0] || null;
  }, [orders, selectedOrderId]);

  const handleLogin = async () => {
    const pw = passwordInput.trim();
    if (!pw) return;

    setAdminPassword(pw);
    setLoading(true);
    setError(null);

    try {
      await fetchOrders(pw, filterStatus);
      sessionStorage.setItem(STORAGE_KEY, pw);
      setAuthed(true);
      setPasswordInput("");
    } catch (e: any) {
      // fetchOrders 내부에서 setError 처리됨
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setAdminPassword("");
    setOrders([]);
    setSelectedOrderId(null);
    setError(null);
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    if (!adminPassword) return;

    try {
      const res = await fetch(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({ status }),
      });

      if (res.status === 401) {
        throw new Error("비밀번호가 틀렸습니다. 다시 로그인해주세요.");
      }
      if (!res.ok) {
        throw new Error("상태 변경에 실패했습니다.");
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (e: any) {
      alert(e?.message || "오류가 발생했습니다.");
    }
  };

  // =========================
  // ✅ Stage2-2/2-3: CSV Export (주문/출고) - UI 변경 없이 버튼만 추가
  // =========================
  const csvEscape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;

  const downloadCSVBlob = (filename: string, headers: string[], rows: any[][]) => {
    const csv =
      "\uFEFF" +
      [headers, ...rows]
        .map((row) => row.map(csvEscape).join(","))
        .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  const getDateTag = () => new Date().toISOString().slice(0, 10);
  const getStatusTag = () => (filterStatus === "all" ? "all" : filterStatus);

  // 1) 주문 CSV (주문 1건 = 1행)
  const downloadOrdersCSV = () => {
    if (!orders.length) {
      alert("다운로드할 주문이 없습니다.");
      return;
    }

    const headers = [
      "주문번호",
      "상태",
      "주문일시",
      "고객명",
      "연락처",
      "주소",
      "상세주소",
      "배송요청사항",
      "상품요약",
      "상품수량합계",
      "소계",
      "배송비",
      "총결제금액",
    ];

    const rows = orders.map((o) => {
      const createdAt =
        o.createdAt &&
        typeof o.createdAt === "object" &&
        "_seconds" in (o.createdAt as any)
          ? new Date((o.createdAt as any)._seconds * 1000).toLocaleString("ko-KR")
          : "-";

      const items = o.items || [];
      const itemSummary = items
        .map((it) => `${it.name || "-"}×${it.quantity || 0}`)
        .join(" | ");
      const totalQty = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

      return [
        o.orderNumber || "-",
        statusLabel(o.status),
        createdAt,
        o.customer?.name || "-",
        o.customer?.phone || "-",
        o.shipping?.address || "-",
        o.shipping?.addressDetail || "",
        o.shipping?.request || "",
        itemSummary || "-",
        totalQty,
        typeof o.pricing?.subtotal === "number" ? o.pricing.subtotal : "",
        typeof o.pricing?.shippingFee === "number" ? o.pricing.shippingFee : "",
        typeof o.pricing?.total === "number" ? o.pricing.total : "",
      ];
    });

    downloadCSVBlob(
      `orders_${getStatusTag()}_${getDateTag()}.csv`,
      headers,
      rows
    );
  };

  // 2) 출고 CSV (상품 1개 = 1행, 현장 친화형)
  const downloadPackingCSV = () => {
    if (!orders.length) {
      alert("다운로드할 주문이 없습니다.");
      return;
    }

    type Agg = {
      productName: string;
      totalQty: number;
      orderNumbers: Set<string>;
      customerNames: Set<string>;
      requestOrderNumbers: Set<string>; // 요청사항 있는 주문번호
    };

    const map = new Map<string, Agg>();

    for (const o of orders) {
      const orderNo = o.orderNumber || o.id; // 주문번호 없으면 id fallback
      const customerName = o.customer?.name || "-";
      const hasRequest = Boolean(o.shipping?.request && o.shipping.request.trim());

      const items = o.items || [];
      for (const it of items) {
        const name = it.name || it.productId || "-";
        const key = name; // 상품명 기준 집계 (실무에서 제일 직관적)

        const qty = it.quantity || 0;

        if (!map.has(key)) {
          map.set(key, {
            productName: name,
            totalQty: 0,
            orderNumbers: new Set(),
            customerNames: new Set(),
            requestOrderNumbers: new Set(),
          });
        }

        const agg = map.get(key)!;
        agg.totalQty += qty;
        agg.orderNumbers.add(orderNo);
        if (customerName) agg.customerNames.add(customerName);
        if (hasRequest) agg.requestOrderNumbers.add(orderNo);
      }
    }

    const headers = [
      "상품명",
      "총수량",
      "주문번호목록",
      "고객명요약",
      "요청사항있는주문(주문번호)",
    ];

    const rows = Array.from(map.values())
      .sort((a, b) => b.totalQty - a.totalQty)
      .map((agg) => {
        const orderList = Array.from(agg.orderNumbers).join(", ");
        const customers = Array.from(agg.customerNames);

        // 고객명 요약: "홍길동 외 3명"
        let customerSummary = "-";
        if (customers.length === 1) customerSummary = customers[0];
        else if (customers.length > 1) customerSummary = `${customers[0]} 외 ${customers.length - 1}명`;

        const requestOrders = Array.from(agg.requestOrderNumbers).join(", ");

        return [
          agg.productName,
          agg.totalQty,
          orderList,
          customerSummary,
          requestOrders || "",
        ];
      });

    downloadCSVBlob(
      `packing_${getStatusTag()}_${getDateTag()}.csv`,
      headers,
      rows
    );
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-stone-900">
              관리자 · 주문관리
            </h1>
            <p className="text-stone-500 mt-2 text-sm">
              주문 목록 조회 및 상태 변경
            </p>
          </div>

          {authed ? (
            <div className="flex items-center gap-3">
              <div className="text-sm text-stone-500">
                총{" "}
                <span className="text-stone-900 font-medium">{totalCount}</span>건
              </div>
              <Button variant="outline" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Auth Modal */}
          {!authed && (
            <div className="max-w-md mx-auto bg-white border border-stone-200 p-8">
              <h2 className="text-lg font-medium text-stone-900 mb-2">
                관리자 비밀번호
              </h2>
              <p className="text-sm text-stone-500 mb-6">
                임시 보호 단계입니다. 비밀번호를 입력하세요.
              </p>

              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors"
                placeholder="비밀번호"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />

              <div className="mt-4">
                <Button
                  fullWidth
                  size="lg"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "확인 중..." : "확인"}
                </Button>
              </div>

              {error && (
                <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
              )}
            </div>
          )}

          {/* Content */}
          {authed && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border border-stone-200 p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-stone-900">
                      주문 목록
                    </h2>
                    <p className="text-sm text-stone-500 mt-1">
                      최신순 · 상태별 필터
                    </p>
                  </div>

                  {/* ✅ 기존 버튼 라인 유지 + 버튼만 1개 추가 */}
                  <div className="flex items-center gap-3">
                    <select
                      value={filterStatus}
                      onChange={(e) =>
                        setFilterStatus(e.target.value as OrderStatus | "all")
                      }
                      className="px-3 py-2 border border-stone-300 bg-white focus:border-stone-900 focus:outline-none text-sm"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <Button
                      variant="outline"
                      onClick={() => fetchOrders(adminPassword, filterStatus)}
                      disabled={loading}
                    >
                      {loading ? "불러오는 중..." : "새로고침"}
                    </Button>

                    {/* 기존 CSV 버튼을 '주문 CSV'로 명확화 (같은 자리) */}
                    <Button
                      variant="outline"
                      onClick={downloadOrdersCSV}
                      disabled={loading || orders.length === 0}
                    >
                      주문 CSV
                    </Button>

                    {/* ✅ 추가: 출고 CSV */}
                    <Button
                      variant="outline"
                      onClick={downloadPackingCSV}
                      disabled={loading || orders.length === 0}
                    >
                      출고 CSV
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="bg-white border border-red-200 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="bg-white border border-stone-200 overflow-hidden">
                  <div className="divide-y divide-stone-200">
                    {orders.map((o) => {
                      const isSelected = selectedOrderId === o.id;
                      return (
                        <div
                          key={o.id}
                          onClick={() => setSelectedOrderId(o.id)}
                          className={`p-5 flex gap-4 cursor-pointer transition ${
                            isSelected ? "bg-stone-100" : "hover:bg-stone-50"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <div className="text-stone-900 font-medium truncate">
                                주문번호: {o.orderNumber || "-"}
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${statusBadge(
                                  o.status
                                )}`}
                              >
                                {statusLabel(o.status)}
                              </span>
                            </div>

                            <div className="text-sm text-stone-500 mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <span>
                                고객:{" "}
                                <span className="text-stone-700">
                                  {o.customer?.name || "-"}
                                </span>
                              </span>
                              <span>
                                연락처:{" "}
                                <span className="text-stone-700">
                                  {o.customer?.phone || "-"}
                                </span>
                              </span>
                              <span>
                                시간:{" "}
                                <span className="text-stone-700">
                                  {o.createdAt &&
                                  typeof o.createdAt === "object" &&
                                  "_seconds" in (o.createdAt as any)
                                    ? new Date(
                                        (o.createdAt as any)._seconds * 1000
                                      ).toLocaleString("ko-KR")
                                    : "-"}
                                </span>
                              </span>
                            </div>

                            <div className="text-sm text-stone-500 mt-2">
                              금액:{" "}
                              <span className="text-stone-900 font-medium">
                                {typeof o.pricing?.total === "number"
                                  ? `${formatPrice(o.pricing.total)}원`
                                  : "-"}
                              </span>
                            </div>
                          </div>

                          {/* ✅ 상태 변경 영역 클릭 시 row 클릭 방지 */}
                          <div
                            className="flex flex-col gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <select
                              value={o.status || "pending"}
                              onChange={(e) =>
                                updateStatus(
                                  o.id,
                                  e.target.value as OrderStatus
                                )
                              }
                              className="px-3 py-2 border border-stone-300 bg-white focus:border-stone-900 focus:outline-none text-sm"
                            >
                              <option value="pending">대기</option>
                              <option value="confirmed">확인</option>
                              <option value="shipped">발송</option>
                              <option value="canceled">취소</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}

                    {!loading && orders.length === 0 && (
                      <div className="p-10 text-center text-stone-500">
                        주문이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-stone-200 p-6 sticky top-24">
                  <h2 className="text-lg font-medium text-stone-900">
                    주문 상세(미리보기)
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">
                    왼쪽 목록에서 주문을 클릭하면 상세가 전환됩니다.
                  </p>

                  <div className="mt-6 space-y-4 text-sm">
                    <div>
                      <p className="text-stone-500">주문번호</p>
                      <p className="text-stone-900 font-medium">
                        {selectedOrder?.orderNumber || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-stone-500">고객</p>
                      <p className="text-stone-900">
                        {selectedOrder?.customer?.name || "-"} (
                        {selectedOrder?.customer?.phone || "-"})
                      </p>
                    </div>

                    <div>
                      <p className="text-stone-500">배송지</p>
                      <p className="text-stone-900">
                        {selectedOrder?.shipping?.address || "-"}{" "}
                        {selectedOrder?.shipping?.addressDetail || ""}
                      </p>
                      {selectedOrder?.shipping?.request ? (
                        <p className="text-stone-500 mt-1">
                          요청: {selectedOrder.shipping.request}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <p className="text-stone-500">상품</p>
                      <div className="mt-2 space-y-2">
                        {(selectedOrder?.items || []).map((it, idx) => (
                          <div
                            key={`${it.productId || idx}-${idx}`}
                            className="flex justify-between gap-4"
                          >
                            <span className="text-stone-900 truncate">
                              {it.name || "-"} × {it.quantity || 0}
                            </span>
                            <span className="text-stone-700 whitespace-nowrap">
                              {typeof it.price === "number"
                                ? `${formatPrice(it.price)}원`
                                : "-"}
                            </span>
                          </div>
                        ))}
                        {(selectedOrder?.items || []).length === 0 && (
                          <p className="text-stone-500">-</p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200">
                      <p className="text-stone-500">총 결제 금액</p>
                      <p className="text-stone-900 font-semibold text-lg">
                        {typeof selectedOrder?.pricing?.total === "number"
                          ? `${formatPrice(selectedOrder.pricing.total)}원`
                          : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-xs text-stone-500">
                    Stage 2-1 완료: 클릭한 주문 기준으로 상세 미리보기 전환.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
