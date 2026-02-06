"use client";

import Link from "next/link";
import { SlBasket } from "react-icons/sl";
import { useCart } from "@/contexts/CartContext";

export function Header() {
    const { totalItems, openCart } = useCart();

    return (
        <div className="flex justify-between items-center w-full h-fit px-4 md:px-12 z-40 fixed bg-background-navbar py-6">
            <Link
                href={"/"}
            >
                <div className="flex items-center gap-2 cursor-pointer hover:scale-105">
                    <p className="text-text-primary text-2xl">Assignment</p>
                    <p className="text-text-secondary text-sm">by n2pluto</p>
                </div>
            </Link>


            <div
                className="flex gap-2 justify-center items-center cursor-pointer hover:opacity-80 transition-opacity hover:scale-105"
                onClick={openCart}
            >
                <SlBasket className="stroke-3 size-5 text-text-primary" />
                {totalItems > 0 && (
                    <div className="flex items-center justify-center rounded-full border border-border-brand-solid bg-background-brand-primary px-2 py-0.5 min-w-7 min-h-7">
                        <p className="text-sm font-medium text-text-primary">{totalItems.toLocaleString()}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
