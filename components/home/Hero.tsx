"use client";

import { getProducts } from "@/lib/services/products";
import { Product } from "@/types/product";
import { useEffect, useState, useCallback, Suspense } from "react";
import { ProductCard } from "../card/ProductCard";
import { ProductCardSkeleton } from "../card/ProductCardSkeleton";
import { ProductFilters } from "../filters/ProductFilters";

export function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getProducts()
      .then((products) => {
        setProducts(products);
        setFilteredProducts(products);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleFilteredProductsChange = useCallback((filtered: Product[]) => {
    setFilteredProducts(filtered);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={<div className="h-32 bg-gray-100 rounded-lg animate-pulse mb-6" />}>
        <ProductFilters
          products={products}
          onFilteredProductsChange={handleFilteredProductsChange}
        />
      </Suspense>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">{error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-secondary text-lg">No products found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
