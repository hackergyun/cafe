import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import {
  categories,
  products,
  getProductsByCategory,
  getCategoryById,
} from "@/data/products";
import { notFound } from "next/navigation";

interface ShopPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function ShopPage({ params }: ShopPageProps) {
  const { category } = await params;

  // 'all'이면 전체 상품, 아니면 해당 카테고리 상품
  const isAll = category === "all";
  const currentCategory = isAll ? null : getCategoryById(category);

  if (!isAll && !currentCategory) {
    notFound();
  }

  const filteredProducts = isAll ? products : getProductsByCategory(category);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <p className="text-amber-700 text-sm tracking-[0.2em] uppercase mb-4">
            Shop
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
  휘낭시에
</h1>

          {currentCategory && (
            <p className="text-stone-600 mt-4 max-w-xl">
              {currentCategory.description}
            </p>
          )}
        </div>
      </section>
      

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-stone-500 text-sm mb-8">
            {filteredProducts.length}개의 상품
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-stone-500">해당 카테고리에 상품이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  const categoryParams = categories.map((category) => ({
    category: category.id,
  }));

  return [{ category: "all" }, ...categoryParams];
}





