"use client";

import { useCart } from "@/contexts/CartContext";
import { IoClose, IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { exportCartData } from "@/lib/utils/flattenCart";
import { useState } from "react";

export function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState<Record<string, string | number> | null>(null);

  const handleExport = () => {
    const flattened = exportCartData(items, {});
    setExportData(flattened);
    setShowExportModal(true);

    console.log("Exported Cart Data (Flattened):", flattened);
  };

  const handleDownloadJSON = () => {
    if (!exportData) return;
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cart-export-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleDownloadTXT = () => {
    if (!exportData) return;
    const lines = Object.entries(exportData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cart-export-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-xl z-50 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-primary">
          <h2 className="text-xl font-semibold text-text-primary">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <IoClose className="size-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-text-secondary text-lg mb-2">Your cart is empty</p>
              <p className="text-text-secondary text-sm">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-border-primary rounded-lg hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col gap-2">
                    <h3 className="font-medium text-text-primary line-clamp-2">{item.name}</h3>
                    <p className="text-text-secondary text-sm">{item.price.toFixed(2)} $</p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="flex items-center gap-2 border border-border-primary rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <IoRemove className="size-4" />
                        </button>
                        <span className="px-3 py-1 min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <IoAdd className="size-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        aria-label="Remove item"
                      >
                        <IoTrashOutline className="size-5" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-text-primary mt-1">
                      Total: {(item.price * item.quantity).toFixed(2)} $
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-primary p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-text-primary">Total:</span>
              <span className="text-xl font-bold text-text-primary">
                {totalPrice.toFixed(2)} $
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-text-secondary">
              <span>{totalItems} {totalItems === 1 ? "item" : "items"}</span>
            </div>
            <button
              onClick={handleExport}
              className="w-full px-4 py-2 border border-border-primary rounded-lg hover:bg-gray-50 transition-colors text-text-primary"
            >
              Export Cart
            </button>
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && exportData && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border-primary">
              <h3 className="text-xl font-semibold text-text-primary">Cart Export</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <IoClose className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(exportData, null, 2)}
              </pre>
            </div>
            <div className="flex gap-2 p-6 border-t border-border-primary">
              <button
                onClick={handleDownloadJSON}
                className="flex-1 px-4 py-2 bg-[#26B689] text-white rounded-lg hover:bg-[#219176] transition-colors"
              >
                Download JSON
              </button>
              <button
                onClick={handleDownloadTXT}
                className="flex-1 px-4 py-2 border border-border-primary rounded-lg hover:bg-gray-50 transition-colors text-text-primary"
              >
                Download TXT
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
