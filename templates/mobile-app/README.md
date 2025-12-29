# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your Supabase credentials.

3. **Start the development server**
   ```bash
   pnpm start
   ```

4. **Run on a platform**
   ```bash
   # iOS Simulator
   pnpm ios

   # Android Emulator
   pnpm android

   # Web browser
   pnpm web
   ```

## 📁 Project Structure

```
{{PROJECT_NAME}}/
├── app/                 # Expo Router pages
│   ├── (tabs)/         # Tab navigation
│   ├── _layout.tsx     # Root layout
│   └── index.tsx       # Home screen
├── components/         # Reusable components
├── services/           # API clients & services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── assets/             # Images, fonts, etc.
└── app.json           # Expo configuration
```

## 🛠️ Tech Stack

- **React Native** + TypeScript
- **Expo** ~50
- **Expo Router** - File-based routing
- **NativeWind** - Tailwind for React Native
- **Supabase** - Backend & Authentication
- **TanStack Query** - Data fetching
- **Expo Secure Store** - Encrypted storage
- **Expo Local Authentication** - Biometrics
- **Expo Notifications** - Push notifications

## 📝 Available Scripts

- `pnpm start` - Start Expo development server
- `pnpm ios` - Run on iOS simulator
- `pnpm android` - Run on Android emulator
- `pnpm web` - Run in web browser
- `pnpm lint` - Lint code
- `pnpm format` - Format code
- `pnpm typecheck` - Type check

## 🔐 Features

- ✅ Authentication with Supabase
- ✅ Biometric authentication
- ✅ Push notifications
- ✅ Offline-first with TanStack Query
- ✅ Secure storage
- ✅ Tab navigation
- ✅ TypeScript support
- ✅ NativeWind styling

## 📦 Building

### Development Build
```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

### Production Build
```bash
# iOS
eas build --profile production --platform ios

# Android
eas build --profile production --platform android
```

## 📝 License

MIT
