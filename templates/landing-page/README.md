# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your values.

3. **Start development server**
   ```bash
   pnpm dev
   ```

   Open http://localhost:5173 in your browser.

4. **Build for production**
   ```bash
   pnpm build
   ```

## 📁 Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── assets/          # Images, fonts, etc.
│   ├── lib/             # Utilities and helpers
│   ├── App.tsx
│   └── main.tsx
├── public/              # Static assets
└── package.json
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Lint code
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Type check with TypeScript

## 🔧 Tech Stack

- **React 18** + TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **React Helmet Async** - SEO optimization
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icons

## 🎨 Features

- ✅ Fully responsive design
- ✅ SEO optimized
- ✅ Fast page loads
- ✅ Smooth animations
- ✅ Contact form ready
- ✅ Analytics integration ready
- ✅ Accessible components

## 📦 Deployment

### Netlify
```bash
# Build command
pnpm build

# Publish directory
dist
```

### Vercel
```bash
# Build command
pnpm build

# Output directory
dist
```

## 📝 Customization

1. **Colors** - Edit `tailwind.config.js`
2. **Content** - Update components in `src/pages/`
3. **SEO** - Modify meta tags in page components
4. **Contact Form** - Integrate with your email service

## 📝 License

MIT
