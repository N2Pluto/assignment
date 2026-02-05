export function debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
    let timeout: NodeJS.Timeout | null = null;

    const debounced = function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    } as ((...args: Parameters<T>) => void) & { cancel: () => void };

    debounced.cancel = () => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
}
