"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Product } from "@/types/product";
import { useSearchParams, useRouter } from "next/navigation";
import { debounce } from "@/lib/utils/debounce";

interface ProductFiltersProps {
    products: Product[];
    onFilteredProductsChange: (filtered: Product[]) => void;
}

export function ProductFilters({ products, onFilteredProductsChange }: ProductFiltersProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchParams.get("search") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
    const [priceRange, setPriceRange] = useState(searchParams.get("priceRange") || "all");

    // Debounce search query
    const debouncedUpdate = useRef(
        debounce((value: string) => {
            setDebouncedSearchQuery(value);
        }, 300)
    ).current;

    useEffect(() => {
        debouncedUpdate(searchQuery);

        // Cleanup on unmount
        return () => {
            debouncedUpdate.cancel();
        };
    }, [searchQuery, debouncedUpdate]);

    // Get unique categories from products
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
        return uniqueCategories.sort();
    }, [products]);

    // Update URL params when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (debouncedSearchQuery) params.set("search", debouncedSearchQuery);
        if (selectedCategory !== "all") params.set("category", selectedCategory);
        if (priceRange !== "all") params.set("priceRange", priceRange);

        const newUrl = params.toString() ? `?${params.toString()}` : "/";
        router.replace(newUrl, { scroll: false });
    }, [debouncedSearchQuery, selectedCategory, priceRange, router]);

    // Filter products
    useEffect(() => {
        let filtered = [...products];

        // Search filter
        if (debouncedSearchQuery) {
            const query = debouncedSearchQuery.toLowerCase();
            filtered = filtered.filter((product) =>
                product.title.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter((product) => product.category === selectedCategory);
        }

        // Price range filter
        if (priceRange !== "all") {
            filtered = filtered.filter((product) => {
                switch (priceRange) {
                    case "under-1000":
                        return product.price < 1000;
                    case "1000-5000":
                        return product.price >= 1000 && product.price <= 5000;
                    case "over-5000":
                        return product.price > 5000;
                    default:
                        return true;
                }
            });
        }

        onFilteredProductsChange(filtered);
    }, [products, debouncedSearchQuery, selectedCategory, priceRange, onFilteredProductsChange]);

    return (
        <div className="space-y-4 mb-6">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26B689] focus:border-transparent"
                />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Category Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26B689] focus:border-transparent bg-white"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                        Price Range
                    </label>
                    <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-[#26B689] focus:border-transparent bg-white"
                    >
                        <option value="all">All Prices</option>
                        <option value="under-1000">Under $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="over-5000">Over $5,000</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
