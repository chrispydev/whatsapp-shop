# WhatsApp Shop

A modern e-commerce shop built with Vue 3, TypeScript, and Tailwind CSS that allows customers to browse products and place orders directly via WhatsApp.

## Features

- 📱 Responsive design that works on all devices
- 🛒 Shopping cart functionality
- 📞 Direct WhatsApp integration for orders
- ⚡ Built with Vue 3 and Vite for fast development
- 🎨 Beautiful UI with Tailwind CSS
- 📦 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (version 20.19.0 or higher, or 22.12.0+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd whatsapp-shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Configuration

### WhatsApp Integration

To enable WhatsApp ordering, update the phone number in `src/components/Cart.vue`:

```typescript
const phoneNumber = "233XXXXXXXXX"; // Replace with your WhatsApp business number
```

Replace `233XXXXXXXXX` with your actual WhatsApp business number in international format (without + symbol).

### Adding Products

Products are managed in `src/data/products.ts`. To add new products:

```typescript
{
  id: 7,
  name: "Your Product Name",
  price: 100,
  image: "https://your-image-url.com/image.jpg",
}
```

## Project Structure

```
src/
├── components/          # Vue components
│   ├── Cart.vue        # Shopping cart component
│   └── ProductCard.vue # Product display component
├── data/               # Data files
│   └── products.ts     # Product catalog
├── types/              # TypeScript type definitions
│   └── index.ts        # Type interfaces
├── assets/             # Static assets
│   └── main.css        # Main CSS file
├── App.vue             # Main application component
└── main.ts             # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **WhatsApp API** - Direct messaging integration

## How It Works

1. Customers browse products on the website
2. They add items to their cart
3. When ready to order, they click "Order via WhatsApp"
4. A pre-formatted message with their order details opens in WhatsApp
5. They can send the message directly to your business WhatsApp number

## Customization

### Styling
The project uses Tailwind CSS. You can customize the design by modifying the classes in the Vue components or extending the Tailwind configuration in `tailwind.config.js`.

### Adding New Features
- Cart persistence: Add localStorage to save cart data
- Product categories: Extend the Product interface and add filtering
- Image gallery: Add multiple images per product
- Inventory management: Add stock tracking

## Deployment

To deploy the application:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider (Netlify, Vercel, GitHub Pages, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Troubleshooting

### Images Not Loading?

If product images aren't displaying properly, you have several options:

**Quick Fix - Switch to Alternative Images:**

1. Open `src/App.vue`
2. Change the import on line 3 from:
   ```typescript
   import { products } from "./data/products";
   ```
   to:
   ```typescript
   import { products } from "./data/products-alternative";
   ```

**Alternative Image Sources:**

- **Unsplash** (current): High-quality real product photos
- **Picsum Photos**: Random placeholder images (more reliable)
- **Data URLs**: Built-in SVG fallbacks (always work)

**Manual Image Replacement:**

1. Replace URLs in `src/data/products.ts` with your own hosted images
2. Use local images in the `public` folder:
   ```typescript
   image: "/images/your-product-image.jpg"
   ```

**Test Images:**

Run the image test script to check which URLs work:
```bash
node test-images.js
```

### Common Issues

- **CORS Errors**: Some image services block cross-origin requests
- **Rate Limiting**: Too many requests to image APIs
- **Network Issues**: Slow or unstable internet connection

**Solution**: Use the alternative products file or host images locally.

## License

This project is open source and available under the [MIT License](LICENSE).