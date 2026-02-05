import type { Product } from "@/types/product";
import { apiFetch } from "./client.service";

export function getProducts() {
  return apiFetch<Product[]>("/products");
}

export function getProductById(id: number) {
  return apiFetch<Product>(`/products/${id}`);
}
