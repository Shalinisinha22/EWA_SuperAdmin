# EWA Super Admin Dashboard

A React TypeScript application for managing the EWA Fashion Platform as a super administrator.

## Features

- 🔐 **Secure Authentication**: Login system with JWT token persistence
- 🏪 **Store Management**: View and manage all stores in the platform
- 📊 **Global Analytics**: Overview of all stores' performance
- 🛡️ **Role-based Access**: Super admin only access
- 🔄 **Persistent Sessions**: Login state persists across page refreshes
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS

## Prerequisites

- Node.js (v16 or higher)
- Backend server running on `http://localhost:5000`
- Super admin account created in the backend

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 3. Backend Setup

Ensure your backend server is running and you have created a super admin account using the API endpoint:

```bash
POST http://localhost:5000/api/admin/super-admin
Content-Type: application/json

{
  "name": "Super Admin",
  "email": "admin@ewa.com",
  "password": "your-secure-password"
}
```

## Authentication Flow

1. **Login**: Users must authenticate with email and password
2. **Token Storage**: JWT token is stored in localStorage
3. **Session Persistence**: Token is automatically restored on page refresh
4. **Protected Routes**: All dashboard routes require authentication
5. **Logout**: Clears token and redirects to login

## API Integration

The application integrates with the following backend endpoints:

- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/profile` - Get admin profile
- `GET /api/admin` - Get all admins (super admin only)
- `POST /api/admin` - Create new admin (super admin only)

## Project Structure

```
src/
├── components/
│   ├── LoginPage.tsx          # Login form component
│   ├── ProtectedRoute.tsx     # Route protection wrapper
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── GlobalOverview.tsx    # Dashboard overview
│   ├── StoreManagement.tsx   # Store management interface
│   └── StoreAnalytics.tsx    # Individual store analytics
├── context/
│   └── AuthContext.tsx       # Authentication state management
├── services/
│   └── api.ts               # API service functions
├── utils/
│   └── apiClient.ts         # HTTP client utility
├── types/
│   └── store.ts            # TypeScript type definitions
└── App.tsx                 # Main application component
```

## Security Features

- **JWT Token Authentication**: Secure token-based authentication
- **Role-based Access Control**: Only super admins can access the dashboard
- **Automatic Token Refresh**: Tokens are validated on app initialization
- **Secure Logout**: Complete session cleanup on logout

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend has CORS configured for `http://localhost:5173`
2. **Authentication Failed**: Verify the super admin account exists in the backend
3. **API Connection**: Check that the backend server is running on port 5000

### Backend Requirements

The backend must implement:
- JWT token generation and validation
- CORS configuration for the frontend domain
- Super admin role management
- Admin CRUD operations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the EWA Fashion Platform.




