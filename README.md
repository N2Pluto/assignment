# E-commerce Product Listing & Cart

Modern e-commerce product listing with shopping cart built with **Next.js 15+**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
echo "NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com" > .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✨ Features

### Core Features
- ✅ **Product Grid**: Responsive layout (1/2/3-4 columns), skeleton loaders, hover effects
- ✅ **Shopping Cart**: Sidebar with quantity controls, remove items, empty state, totals
- ✅ **Search & Filters**: Debounced search, category filter, price ranges (Under $1k, $1k-$5k, Over $5k)

### Additional Features
- ✅ **State Persistence**: Cart in localStorage, filters in URL params (shareable links)
- ✅ **Cart Export**: Flatten nested data to dot notation, download JSON/TXT
- ✅ **UI Polish**: Toast notifications, animations, responsive design

## 📁 Project Structure

```
├── app/                    # Next.js app router
├── components/
│   ├── card/              # Product cards & skeletons
│   ├── cart/              # Cart sidebar
│   ├── filters/           # Search & filter components
│   ├── home/              # Home page components
│   └── navbar/            # Header
├── contexts/              # Cart state (React Context)
├── lib/
│   ├── services/          # API services
│   └── utils/             # Debounce, flattenCart utilities
└── types/                 # TypeScript types
```

## 🛠️ Tech Stack & Decisions

| Decision | Why |
|----------|-----|
| **React Context** | Simple state management, no extra dependencies |
| **localStorage** | Persist cart across refreshes, no backend needed |
| **URL Params** | Shareable filter links, better UX |
| **Debounced Search** | 300ms delay for performance |
| **Dot Notation Export** | Flatten nested data for analytics/logging |

## 📊 Cart Export Example

**Input:**
```json
{
  "items": [{ "id": 1, "name": "Product", "price": 100, "quantity": 2 }],
  "filters": { "category": "electronics" }
}
```

**Output (Flattened):**
```json
{
  "items.0.id": 1,
  "items.0.name": "Product",
  "items.0.price": 100,
  "items.0.quantity": 2,
  "filters.category": "electronics"
}
```

## ⚡ Performance

- Debounced search (300ms)
- Memoized categories & callbacks
- Skeleton loaders for better UX
- Responsive images


## 🔧 Build

```bash
npm run build && npm start```