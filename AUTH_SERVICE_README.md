# Angular Auth Service Documentation

This Angular authentication service is designed to work with your backend AuthController. It provides all the necessary methods to handle user authentication, password reset, and user management.

## 🚀 Features

- **Complete Backend Integration**: Matches all your AuthController endpoints
- **Environment Configuration**: Uses Angular environment files for API URLs
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Token Management**: Automatic JWT token storage and management
- **User State Management**: Observable-based user state with BehaviorSubject
- **Utility Methods**: Simplified methods for common operations

## 📁 File Structure

```
src/
├── environments/
│   ├── environment.ts          # Development API URL
│   └── environment.prod.ts     # Production API URL
├── app/
│   ├── models/
│   │   └── auth.models.ts      # TypeScript interfaces
│   ├── services/
│   │   └── auth.service.ts     # Main auth service
│   └── examples/
│       └── auth-service-usage.example.ts  # Usage examples
```

## 🔧 Configuration

### Environment Setup

The service reads the API URL from Angular environment files:

**src/environments/environment.ts** (Development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/auth'  // ← Change this to your backend URL
};
```

**src/environments/environment.prod.ts** (Production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com/api/auth'  // ← Change this to your production URL
};
```

## 📋 Available Methods

### 1. Signup
```typescript
signup(utilisateur: Utilisateur): Observable<{ [key: string]: string }>
```
- **Type**: POST
- **Endpoint**: `/api/auth/signup`
- **Returns**: Map with "message" or "error" key

### 2. Login
```typescript
login(utilisateur: Utilisateur): Observable<{ [key: string]: string }>
```
- **Type**: POST
- **Endpoint**: `/api/auth/login`
- **Returns**: Map with "jwtToken" or "error" key
- **Note**: Automatically stores JWT token on successful login

### 3. Reset Password
```typescript
resetPassword(emailRequest: EmailRequest): Observable<{ [key: string]: string }>
```
- **Type**: POST
- **Endpoint**: `/api/auth/resetPassword`
- **Returns**: Map with "message" or "error" key

### 4. Redirect to Reset Password Page
```typescript
redirectToResetPasswordPage(token: string): Observable<any>
```
- **Type**: GET
- **Endpoint**: `/api/auth/redirectToResetPasswordPage?token={token}`
- **Returns**: Redirect response

### 5. Save Password
```typescript
savePassword(passwordDto: PasswordDto): Observable<{ [key: string]: string }>
```
- **Type**: POST
- **Endpoint**: `/api/auth/savePassword`
- **Returns**: Map with "message" or "error" key

## 🛠️ Utility Methods

For easier usage, the service provides simplified methods:

```typescript
// Simplified login
loginWithCredentials(nom: string, motdepasse: string)

// Simplified signup
signupWithCredentials(nom: string, email: string, motdepasse: string)

// Simplified password reset request
requestPasswordReset(email: string)

// Simplified password update
updatePassword(token: string, newPassword: string)
```

## 💡 Usage Examples

### Basic Login
```typescript
import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({...})
export class LoginComponent {
  private authService = inject(AuthService);

  login() {
    this.authService.loginWithCredentials('username', 'password').subscribe({
      next: (response) => {
        if (response.jwtToken) {
          console.log('Login successful!');
          // Navigate to dashboard or home page
        } else if (response.error) {
          console.error('Login failed:', response.error);
        }
      },
      error: (error) => {
        console.error('HTTP Error:', error);
      }
    });
  }
}
```

### User State Monitoring
```typescript
export class AppComponent {
  private authService = inject(AuthService);

  ngOnInit() {
    // Subscribe to user state changes
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        console.log('User logged in:', user);
      } else {
        console.log('User logged out');
      }
    });
  }
}
```

### Password Reset Flow
```typescript
// Step 1: Request password reset
requestReset() {
  this.authService.requestPasswordReset('user@example.com').subscribe({
    next: (response) => {
      if (response.message) {
        console.log('Reset email sent:', response.message);
      }
    }
  });
}

// Step 2: Save new password (after user clicks email link)
saveNewPassword(token: string, newPassword: string) {
  this.authService.updatePassword(token, newPassword).subscribe({
    next: (response) => {
      if (response.message) {
        console.log('Password updated:', response.message);
      }
    }
  });
}
```

## 🔐 Authentication State Management

The service provides several methods to check and manage authentication state:

```typescript
// Check if user is authenticated
const isLoggedIn = this.authService.isAuthenticated();

// Get current user
const currentUser = this.authService.getCurrentUser();

// Get JWT token
const token = this.authService.getToken();

// Logout user
this.authService.logout();
```

## 🎯 TypeScript Interfaces

The service uses strongly-typed interfaces that match your backend models:

```typescript
interface Utilisateur {
  nom?: string;
  email?: string;
  motdepasse?: string;
}

interface EmailRequest {
  email: string;
}

interface PasswordDto {
  token: string;
  newPassword: string;
}
```

## 🚨 Error Handling

All methods include comprehensive error handling:

- **HTTP Errors**: Caught and logged with user-friendly messages
- **Network Issues**: Handled gracefully with fallback responses
- **Token Expiry**: Automatic cleanup of invalid tokens
- **Validation Errors**: Proper error propagation from backend

## 🔄 Integration Steps

1. **Update Environment URLs**: Change the `apiUrl` in both environment files to match your backend
2. **Import HttpClient**: Already configured in `app.config.ts`
3. **Use in Components**: Inject the service and use the methods as shown in examples
4. **Handle Responses**: Always check for both success and error responses
5. **Monitor State**: Subscribe to `currentUser$` for reactive authentication state

## 📝 Notes

- The service automatically stores JWT tokens in localStorage upon successful login
- User state is managed with RxJS BehaviorSubject for reactive programming
- All HTTP requests include proper headers and error handling
- The service is provided at root level, making it available throughout your app
- Token validation and user session management are handled automatically

## 🔧 Customization

You can easily extend the service by:
- Adding new methods for additional endpoints
- Modifying the User interface to match your user model
- Adding interceptors for automatic token attachment
- Implementing refresh token logic
- Adding role-based authentication methods

This auth service provides a complete, production-ready solution for integrating with your backend authentication system.