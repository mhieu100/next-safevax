# SafeVax - Vaccine Management Platform

A modern, full-featured vaccine management and booking platform built with Next.js 15, featuring blockchain integration for transparent vaccine tracking and comprehensive patient management.

## Features

### Core Functionality
- **Vaccine Catalog & Discovery**: Browse and search vaccines with advanced filtering by country, manufacturer, price range, and ratings
- **Smart Booking System**: Multi-dose scheduling with automatic reminder system for follow-up vaccinations
- **Shopping Cart & Checkout**: Add multiple vaccines, manage quantities, and complete bookings with various payment methods
- **User Profiles**: Comprehensive patient profiles with health information, vaccination history, and family member management
- **Center Locator**: Find nearby vaccination centers with real-time availability

### Advanced Features
- **Blockchain Integration**: Transparent vaccine tracking and verification using blockchain technology
- **Multi-Payment Support**: Cash, bank transfer, PayPal, and MetaMask cryptocurrency payments
- **Family Management**: Manage vaccination records for multiple family members
- **Health Reminders**: Automated notifications for upcoming vaccinations and health checkups
- **Real-time Updates**: WebSocket integration for live booking updates and notifications

### Technical Highlights
- **Internationalization**: Full i18n support with `next-i18next`
- **Form Management**: Type-safe forms with `react-hook-form` and `zod` validation
- **State Management**: Efficient global state with Zustand
- **Data Fetching**: Smart caching and synchronization with TanStack Query (React Query)
- **Modern UI**: Ant Design components with Tailwind CSS v4 styling
- **Type Safety**: Full TypeScript coverage with strict mode enabled

## Tech Stack

### Framework & Core
- **Next.js 15.5.4** - React framework with App Router and Turbopack
- **React 18.2.0** - UI library
- **TypeScript 5+** - Static type checking

### UI & Styling
- **Ant Design 5.27+** - Enterprise-level UI components
- **Tailwind CSS 4** - Utility-first CSS framework
- **@ant-design/icons** - Icon library

### State & Data Management
- **Zustand 5.0** - Lightweight state management
- **TanStack Query 5.90+** - Server state management and caching
- **Axios 1.12+** - HTTP client with interceptors

### Forms & Validation
- **React Hook Form 7.63+** - Performant form management
- **Zod 4.1+** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### Internationalization
- **i18next 25.5+** - i18n framework
- **react-i18next 16.0+** - React i18n bindings
- **next-i18next 15.4+** - Next.js i18n integration

### Real-time & Blockchain
- **Socket.io Client 4.8** - WebSocket client for real-time features
- **Web3** integration for MetaMask payments

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing
- **pnpm 9.0** - Fast, disk space efficient package manager

## Getting Started

### Prerequisites
- Node.js >= 18
- pnpm 9.0.0 or later

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server with Turbopack
pnpm dev

# The app will be available at:
# - Local:   http://localhost:3000
# - Network: http://[your-ip]:3000
```

### Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Linting

```bash
# Run ESLint
pnpm lint
```

## Project Structure

```
safevax-repo/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes (login, register, etc.)
│   │   ├── (public)/          # Public routes (home, vaccines, etc.)
│   │   └── (private)/         # Protected routes (profile, bookings, etc.)
│   ├── components/            # Reusable React components
│   │   ├── blockchain/        # Blockchain-related components
│   │   ├── card/              # Card components (vaccines, users, etc.)
│   │   ├── dropdown/          # Dropdown components
│   │   ├── modal/             # Modal dialogs
│   │   ├── share/             # Shared components (providers, layouts)
│   │   └── tab/               # Tab components
│   ├── contexts/              # React Context providers (Socket, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API service layer
│   ├── store/                 # Zustand stores (auth, cart, etc.)
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── constants/             # Application constants
│   └── schemas/               # Zod validation schemas
├── public/                    # Static assets
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint configuration
├── postcss.config.mjs        # PostCSS configuration
└── package.json              # Project dependencies
```

## Key Routes

- `/` - Home page with featured vaccines
- `/vaccine` - Vaccine catalog with filtering
- `/vaccine/[slug]` - Vaccine detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout and payment
- `/booking` - Booking management
- `/profile` - User profile and health records
- `/blockchain` - Blockchain tracking
- `/login` - User authentication
- `/register` - New user registration

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SOCKET_URL=your_socket_url

# Payment Integration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
NEXT_PUBLIC_METAMASK_NETWORK=your_metamask_network
```

## Features in Detail

### Vaccine Booking Flow
1. Browse vaccine catalog
2. View detailed vaccine information (dosage, price, manufacturer, etc.)
3. Add to cart or book immediately
4. Select vaccination center and schedule
5. Manage multi-dose appointments
6. Complete payment (multiple methods supported)
7. Receive booking confirmation and reminders

### User Management
- Secure authentication with JWT
- Profile management with health information
- Family member profiles
- Vaccination history tracking
- Health reminder system

### Payment Methods
- Cash on arrival
- Bank transfer
- PayPal integration
- MetaMask cryptocurrency payments

## Performance

- **Fast Refresh**: Sub-second HMR with Turbopack
- **Optimized Images**: Automatic image optimization with next/image
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered static pages where possible
- **Optimized Bundle**: Tree-shaking and minification in production

