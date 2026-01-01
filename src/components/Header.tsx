"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

export default function Header() {
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
  href="/"
  aria-label="narijae financier"
  className="transition-colors hover:opacity-90"
>
  <span className="block font-[var(--font-brand)] leading-[0.82] tracking-[-0.02em] text-[#EF9843]">
    <span className="block text-[22px] md:text-[26px]">narijae</span>
    <span className="block text-[22px] md:text-[26px]">financier</span>
  </span>
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/brand"
              className="text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase transition-colors"
            >
              Brand
            </Link>
            <div className="relative group">
              <button className="text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase transition-colors">
                Shop
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="bg-white border border-stone-200 shadow-lg py-4 px-6 min-w-48">
                  <Link
                    href="/shop/all"
                    className="block py-2 text-stone-600 hover:text-amber-700 text-sm tracking-wide transition-colors"
                  >
                    전체 상품
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop/${category.id}`}
                      className="block py-2 text-stone-600 hover:text-amber-700 text-sm tracking-wide transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/login"
              className="text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase transition-colors"
            >
              Login
            </Link>
            <Link
              href="/cart"
              className="relative text-stone-600 hover:text-stone-900 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-stone-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-6 space-y-4">
            <Link
              href="/brand"
              className="block text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Brand
            </Link>
            <Link
              href="/shop/all"
              className="block text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.id}`}
                className="block pl-4 text-stone-500 hover:text-stone-900 text-sm tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="block text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm tracking-wider uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
              {getTotalItems() > 0 && (
                <span className="bg-amber-700 text-white text-xs px-2 py-0.5 rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}





