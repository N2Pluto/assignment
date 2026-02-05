// Flattens a nested cart object into a flat key-value structure using dot notation
// Handles arrays, objects, and nested structures

export function flattenCart(cart: Record<string, unknown>): Record<string, string | number> {
    const result: Record<string, string | number> = {};

    function flatten(obj: unknown, prefix = ""): void {
        if (obj === null || obj === undefined) {
            return;
        }

        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                const key = prefix ? `${prefix}.${index}` : `${index}`;
                if (typeof item === "object" && item !== null) {
                    flatten(item, key);
                } else {
                    result[key] = item as string | number;
                }
            });
        } else if (typeof obj === "object") {
            Object.entries(obj).forEach(([key, value]) => {
                const newKey = prefix ? `${prefix}.${key}` : key;
                if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                    flatten(value, newKey);
                } else if (Array.isArray(value)) {
                    flatten(value, newKey);
                } else {
                    result[newKey] = value as string | number;
                }
            });
        } else {
            result[prefix] = obj as string | number;
        }
    }

    flatten(cart);
    return result;
}

// Exports cart data in flattened format

export function exportCartData(
    items: Array<{ id: number; name: string; price: number; quantity: number }>,
    filters?: { category?: string; priceRange?: string; search?: string }
): Record<string, string | number> {
    const cartData = {
        items,
        filters: filters || {},
        metadata: {
            timestamp: new Date().toISOString(),
            totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
            totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        },
    };

    return flattenCart(cartData);
}
