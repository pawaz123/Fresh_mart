import { Product } from './types';

export const CATEGORIES = [
  { id: 'fruits', name: 'Fresh Fruits', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
  { id: 'dairy', name: 'Dairy & Bakery', icon: '🥛' },
  { id: 'staples', name: 'Staples', icon: '🌾' },
  { id: 'snacks', name: 'Snacks', icon: '🍪' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop',
    title: 'Fresh Vegetables Big Sale',
    subtitle: 'Get up to 40% OFF'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2574&auto=format&fit=crop',
    title: 'Organic Fruits',
    subtitle: 'Farm fresh to your doorstep'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Red Apple (Kashmir)',
    category: 'Fresh Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80',
    variants: [
      { weight: '500g', price: 80, mrp: 100 },
      { weight: '1kg', price: 150, mrp: 200 }
    ],
    discount: 25,
    description: 'Sweet and crunchy apples directly from Kashmir orchards.',
    inStock: true,
    rating: 4.5,
    reviews: 120
  },
  {
    id: '2',
    name: 'Farm Fresh Tomatoes',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
    variants: [
      { weight: '500g', price: 20, mrp: 30 },
      { weight: '1kg', price: 35, mrp: 60 }
    ],
    discount: 40,
    description: 'Locally grown, ripe red tomatoes perfect for curries.',
    inStock: true,
    rating: 4.2,
    reviews: 85
  },
  {
    id: '3',
    name: 'Full Cream Milk',
    category: 'Dairy & Bakery',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80',
    variants: [
      { weight: '500ml', price: 32, mrp: 35 },
      { weight: '1L', price: 62, mrp: 70 }
    ],
    discount: 10,
    description: 'Pasteurized full cream milk, rich in calcium.',
    inStock: true,
    rating: 4.8,
    reviews: 300
  },
  {
    id: '4',
    name: 'Whole Wheat Atta',
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80',
    variants: [
      { weight: '1kg', price: 45, mrp: 60 },
      { weight: '5kg', price: 210, mrp: 300 }
    ],
    discount: 30,
    description: '100% whole wheat flour with natural fiber.',
    inStock: true,
    rating: 4.6,
    reviews: 150
  },
  {
    id: '5',
    name: 'Potato (New Crop)',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
    variants: [
      { weight: '1kg', price: 30, mrp: 40 },
      { weight: '2kg', price: 55, mrp: 80 }
    ],
    discount: 25,
    description: 'Fresh seasonal potatoes.',
    inStock: true,
    rating: 4.0,
    reviews: 90
  },
  {
    id: '6',
    name: 'Premium Tea',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=500&q=80',
    variants: [
      { weight: '250g', price: 120, mrp: 150 },
      { weight: '500g', price: 230, mrp: 300 }
    ],
    discount: 23,
    description: 'Aromatic tea blend for a refreshing morning.',
    inStock: true,
    rating: 4.7,
    reviews: 200
  },
  {
    id: '7',
    name: 'Salted Potato Chips',
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80',
    variants: [
      { weight: '50g', price: 20, mrp: 20 },
      { weight: '100g', price: 35, mrp: 40 }
    ],
    discount: 12,
    description: 'Classic salted crunchy potato chips.',
    inStock: true,
    rating: 4.1,
    reviews: 50
  },
  {
    id: '8',
    name: 'Basmati Rice',
    category: 'Staples',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
    variants: [
      { weight: '1kg', price: 90, mrp: 120 },
      { weight: '5kg', price: 420, mrp: 600 }
    ],
    discount: 30,
    description: 'Long grain aromatic basmati rice.',
    inStock: false,
    rating: 4.9,
    reviews: 410
  },
  {
    id: '9',
    name: 'Orange Juice',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80',
    variants: [
      { weight: '1L', price: 110, mrp: 140 }
    ],
    discount: 21,
    description: 'No added sugar 100% orange juice.',
    inStock: true,
    rating: 4.4,
    reviews: 65
  },
  {
    id: '10',
    name: 'Brown Bread',
    category: 'Dairy & Bakery',
    image: 'https://images.unsplash.com/photo-1542834371-41b438a42146?w=500&q=80',
    variants: [
      { weight: '400g', price: 40, mrp: 50 }
    ],
    discount: 20,
    description: 'Healthy whole wheat brown bread.',
    inStock: true,
    rating: 4.3,
    reviews: 112
  }
];
