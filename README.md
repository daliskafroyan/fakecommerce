# FakeStore E-Commerce Application

A modern e-commerce application built with Next.js that showcases products from the FakeStore API, providing a complete shopping experience with product browsing, cart functionality, and checkout process.

## Tech Stack

### Core Technologies
- **Next.js 14**: React framework with App Router for server-side rendering and routing
- **TypeScript**: For type safety and better developer experience
- **React 18**: UI library for building component-based interfaces

### UI Framework
- **Material UI (MUI)**: Component library implementing Google's Material Design
  - Grid/Box components for responsive layouts
  - Card, Dialog, and Paper components for content presentation
  - Form controls (TextField, Select) for user input
  - Snackbar/Alert system for toast notifications

### State Management
- **React Context API**: Used for global state management
  - CartContext: Managing shopping cart state
  - NotificationContext: Managing toast notifications
  - AuthContext: Managing user authentication state

### Data Fetching
- **React Query**: For server state management, caching, and data fetching
- **Axios**: HTTP client for API requests

### Authentication
- **Custom Auth Implementation**: Using the FakeStore API for login/logout functionality
- **RouteGuard Component**: Protecting routes that require authentication

### Features
- **Product Catalog**: Browsing products with search and filter capabilities
- **Shopping Cart**: Add, remove, update quantities, and checkout
- **Toast Notifications**: User feedback for cart actions and authentication
- **Pagination**: For cart items and product listings

### Development Tools
- **ESLint**: For code quality and consistency
- **Next.js Dev Server**: With hot module replacement for development

## Project Structure

- `/src/app`: Application pages using Next.js App Router
- `/src/components`: Reusable React components
- `/src/contexts`: React context providers
- `/src/utils`: Utility functions and API integrations
- `/src/types`: TypeScript type definitions

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## API Integration

This application uses the [FakeStore API](https://fakestoreapi.com/) to fetch product data, handle authentication, and simulate cart operations.
