export function ProductCardSkeleton() {
    return (
        <div className="h-full border border-border-primary rounded-3xl p-4 animate-pulse">
            <div className="w-full h-60 bg-gray-200 rounded-3xl mb-4" />
            <div className="flex flex-col gap-2 mb-4">
                <div className="h-5 bg-gray-200 rounded-3xl w-3/4" />
                <div className="h-4 bg-gray-200 rounded-3xl w-1/4" />
            </div>
            <div className="h-10 bg-gray-200 rounded-3xl w-32" />
        </div>
    );
}
