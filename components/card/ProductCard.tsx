"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { FaShoppingBag } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";

export function ProductCard({ product }: { product: Product }) {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const { addItem } = useCart();

    const handleAddToCartClick = () => {
        setShowModal(true);
        setQuantity(1);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirm = () => {
        addItem(product, quantity);
        setShowModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };


    return (
        <>
            <div className="h-full border border-border-primary rounded-3xl p-4 hover:shadow-lg hover:border-border-brand-solid transition-shadow flex flex-col">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-60 object-cover rounded-xl mb-4"
                />
                <div className="flex flex-col gap-2 mb-4 flex-1">
                    <p className="text-text-primary text-lg font-bold line-clamp-2">{product.title}</p>
                    <p className="text-text-secondary text-sm">{product.price.toFixed(2)} $</p>
                </div>

                <div
                    className="flex items-center gap-2 border border-border-primary rounded-xl p-2 w-fit cursor-pointer hover:bg-gray-50 transition-colors mt-auto hover:scale-105"
                    onClick={handleAddToCartClick}
                >
                    <FaShoppingBag className="size-4" />
                    <p>Add to cart</p>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add to Cart</h2>
                        <div className="mb-4 flex flex-col gap-2">
                            <div>
                                <span className="font-medium">{product.title}</span>
                                <span className="ml-2 text-text-secondary">{product.price.toFixed(2)} $</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <span>Quantity:</span>
                                <button
                                    type="button"
                                    className="border rounded-lg px-2 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button
                                    type="button"
                                    className="border rounded-lg  px-2 py-1 text-lg bg-gray-100 hover:bg-gray-200 "
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="mt-2">
                                <span className="font-medium">Total: </span>
                                <span>{(product.price * quantity).toFixed(2)} $</span>
                            </p>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-background-brand-solid_alt text-white hover:bg-background-brand-solid_alt/80 transition-colors"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-[#26B689] text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
                    <p>Added to cart successfully!</p>
                </div>
            )}
        </>
    );
}