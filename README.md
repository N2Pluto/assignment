# E-commerce Product Listing & Cart

A modern, responsive e-commerce product listing page with shopping cart functionality built with Next.js 15+, TypeScript, and Tailwind CSS.

## Features Implemented

### Core Requirements (Must Have - 100%)

✅ **Product Listing**
- Grid layout with responsive columns (1 on mobile, 2 on tablet, 3-4 on desktop)
- Product cards display: image, name, price, and "Add to Cart" button
- Skeleton loaders during data fetching (not just spinners)
- Smooth hover effects on cards

✅ **Shopping Cart (Sidebar)**
- Slide-in sidebar with cart items
- Quantity controls (+/-) for each item
- Display item name, price per unit, and total per item
- Remove item functionality
- Empty state when cart is empty
- Total price calculation
- Item count badge in header

✅ **Filter & Search**
- Real-time search by product name (debounced for performance)
- Category filter (dropdown with all available categories)
- Price range filter:
  - Under $1,000
  - $1,000 - $5,000
  - Over $5,000

### Intermediate Features (Nice to Have - 100%)

✅ **UI Polish**
- Skeleton loaders for better loading experience
- Smooth hover effects on product cards
- Cart animation when opening sidebar
- Toast notifications on successful add to cart
- Sticky header with cart icon showing item count

✅ **State Persistence**
- Cart saved to localStorage (persists across page refreshes)
- Active filters synced to URL params (shareable links)
- Filters restored from URL on page load

✅ **Cart Summary Export**
- Export cart data in flattened format (dot notation)
- Download as JSON or TXT file
- Display in modal/dialog
- Logs to browser console
- Handles nested structures, arrays, and metadata

### Advanced Features (Bonus - 100%)

✅ **Debounced Search**
- 300ms debounce delay for optimal performance
- Prevents excessive API calls/filtering

✅ **Responsive Design**
- Fully responsive across all screen sizes
- Mobile-first approach
- Touch-friendly interactions

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blt-soft-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Technical Decisions & Trade-offs

### State Management
- **Decision**: Used React Context API instead of external libraries (Redux, Zustand)
- **Rationale**: 
  - Simpler for this scope
  - No additional dependencies
  - Sufficient for cart state management
  - Easier to understand and maintain

### Cart Persistence
- **Decision**: localStorage for cart persistence
- **Rationale**:
  - Simple and effective
  - Works across page refreshes
  - No backend required
  - Syncs automatically on state changes

### URL Parameter Syncing
- **Decision**: Sync filters to URL params using Next.js router
- **Rationale**:
  - Enables shareable links with active filters
  - Better UX (back/forward buttons work)
  - No additional state management needed
  - Uses Next.js built-in capabilities

### Debounced Search
- **Decision**: 300ms debounce delay
- **Rationale**:
  - Balances responsiveness and performance
  - Reduces unnecessary filtering operations
  - Improves UX on slower devices
  - Custom implementation for full control

### Cart Export Format
- **Decision**: Flatten nested structure using dot notation
- **Rationale**:
  - Simulates real-world analytics/logging scenarios
  - Handles complex nested data structures
  - Reusable utility function
  - Supports arrays, objects, and metadata

### Responsive Grid
- **Decision**: Tailwind CSS grid with breakpoints
- **Rationale**:
  - Mobile: 1 column (better readability)
  - Tablet: 2 columns (balanced layout)
  - Desktop: 3-4 columns (optimal space usage)
  - Uses Tailwind's responsive utilities

### Component Structure
- **Decision**: Organized by feature/domain
- **Rationale**:
  - `components/card/` - Product-related components
  - `components/cart/` - Cart-related components
  - `components/filters/` - Filter components
  - `contexts/` - Global state management
  - `lib/utils/` - Utility functions
  - Clear separation of concerns

## File Structure

```
blt-soft-assignment/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── card/
│   │   ├── ProductCard.tsx
│   │   └── ProductCardSkeleton.tsx
│   ├── cart/
│   │   └── CartSidebar.tsx
│   ├── filters/
│   │   └── ProductFilters.tsx
│   ├── home/
│   │   └── Hero.tsx
│   └── navbar/
│       └── header.tsx
├── contexts/
│   └── CartContext.tsx      # Cart state management
├── lib/
│   ├── services/
│   │   ├── client.service.ts
│   │   └── products.ts
│   └── utils/
│       ├── debounce.ts
│       └── flattenCart.ts
├── types/
│   ├── cart.ts
│   └── product.ts
└── views/
    └── HomeView.tsx
```

## Time Spent

- **Hours 1-2**: Core functionality (grid, cart, add/remove)
- **Hours 3-4**: Filters, search, state management, URL syncing
- **Hours 5-6**: Polish, animations, skeleton loaders, cart export, responsive design

**Total**: ~6 hours

## Key Features Breakdown

### Cart Export Implementation

The cart export feature transforms nested cart data into a flattened format:

**Original Structure:**
```json
{
  "items": [
    { "id": 1, "name": "Product", "price": 100, "quantity": 2 }
  ],
  "filters": { "category": "electronics" },
  "metadata": { "timestamp": "2026-01-15T10:00:00Z" }
}
```

**Flattened Output:**
```json
{
  "items.0.id": 1,
  "items.0.name": "Product",
  "items.0.price": 100,
  "items.0.quantity": 2,
  "filters.category": "electronics",
  "metadata.timestamp": "2026-01-15T10:00:00Z"
}
```

This demonstrates:
- Handling nested objects
- Array indexing in dot notation
- Metadata inclusion
- Reusable utility function

## Performance Considerations

- **Debounced Search**: Prevents excessive filtering on every keystroke
- **Memoized Categories**: Categories list is memoized to avoid recalculation
- **useCallback**: Filter handler is memoized to prevent unnecessary re-renders
- **Skeleton Loaders**: Better perceived performance than spinners
- **Lazy Loading**: Images load as needed (browser default)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design tested on various screen sizes

## Future Enhancements (If Time Permitted)

- Infinite scroll or pagination
- Quick-view modal for products
- Sort options (price, name)
- Product image lazy loading with intersection observer
- Cart item animations when adding/removing
- Keyboard navigation support

## License

This project is part of a technical assignment.
# assignment
