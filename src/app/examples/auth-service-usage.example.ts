import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Utilisateur, EmailRequest, PasswordDto } from '../models/auth.models';

/**
 * Example component showing how to use the AuthService
 * This demonstrates all the available methods that match your backend AuthController
 */
@Component({
  selector: 'app-auth-example',
  template: `
    <div class="auth-examples">
      <h2>Auth Service Usage Examples</h2>
      
      <!-- Signup Example -->
      <div class="example-section">
        <h3>1. Signup</h3>
        <button (click)="exampleSignup()">Test Signup</button>
      </div>
      
      <!-- Login Example -->
      <div class="example-section">
        <h3>2. Login</h3>
        <button (click)="exampleLogin()">Test Login</button>
      </div>
      
      <!-- Reset Password Example -->
      <div class="example-section">
        <h3>3. Reset Password</h3>
        <button (click)="exampleResetPassword()">Test Reset Password</button>
      </div>
      
      <!-- Redirect to Reset Password Page Example -->
      <div class="example-section">
        <h3>4. Redirect to Reset Password Page</h3>
        <button (click)="exampleRedirectToResetPasswordPage()">Test Redirect</button>
      </div>
      
      <!-- Save Password Example -->
      <div class="example-section">
        <h3>5. Save Password</h3>
        <button (click)="exampleSavePassword()">Test Save Password</button>
      </div>
      
      <!-- Utility Methods Examples -->
      <div class="example-section">
        <h3>6. Utility Methods</h3>
        <button (click)="exampleUtilityMethods()">Test Utility Methods</button>
      </div>
    </div>
  `,
  styles: [`
    .auth-examples {
      padding: 20px;
    }
    .example-section {
      margin: 20px 0;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    button {
      padding: 10px 15px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class AuthExampleComponent {
  private authService = inject(AuthService);

  /**
   * Example 1: Signup
   * POST request to /api/auth/signup
   */
  exampleSignup() {
    const utilisateur: Utilisateur = {
      nom: 'john_doe',
      email: 'john.doe@example.com',
      motdepasse: 'securePassword123'
    };

    this.authService.signup(utilisateur).subscribe({
      next: (response) => {
        if (response.message) {
          console.log('Signup successful:', response.message);
        } else if (response.error) {
          console.error('Signup error:', response.error);
        }
      },
      error: (error) => {
        console.error('HTTP Error:', error);
      }
    });
  }

  /**
   * Example 2: Login
   * POST request to /api/auth/login
   */
  exampleLogin() {
    const utilisateur: Utilisateur = {
      nom: 'john_doe',
      motdepasse: 'securePassword123'
    };

    this.authService.login(utilisateur).subscribe({
      next: (response) => {
        if (response.jwtToken) {
          console.log('Login successful, token:', response.jwtToken);
          // Token is automatically stored in localStorage
        } else if (response.error) {
          console.error('Login error:', response.error);
        }
      },
      error: (error) => {
        console.error('HTTP Error:', error);
      }
    });
  }

  /**
   * Example 3: Reset Password
   * POST request to /api/auth/resetPassword
   */
  exampleResetPassword() {
    const emailRequest: EmailRequest = {
      email: 'john.doe@example.com'
    };

    this.authService.resetPassword(emailRequest).subscribe({
      next: (response) => {
        if (response.message) {
          console.log('Reset password email sent:', response.message);
        } else if (response.error) {
          console.error('Reset password error:', response.error);
        }
      },
      error: (error) => {
        console.error('HTTP Error:', error);
      }
    });
  }

  /**
   * Example 4: Redirect to Reset Password Page
   * GET request to /api/auth/redirectToResetPasswordPage?token=...
   */
  exampleRedirectToResetPasswordPage() {
    const token = 'sample-reset-token-123';

    this.authService.redirectToResetPasswordPage(token).subscribe({
      next: (response) => {
        console.log('Redirect response:', response);
        // Handle the redirect response
      },
      error: (error) => {
        console.error('Redirect error:', error);
      }
    });
  }

  /**
   * Example 5: Save Password
   * POST request to /api/auth/savePassword
   */
  exampleSavePassword() {
    const passwordDto: PasswordDto = {
      token: 'sample-reset-token-123',
      newPassword: 'newSecurePassword456'
    };

    this.authService.savePassword(passwordDto).subscribe({
      next: (response) => {
        if (response.message) {
          console.log('Password saved successfully:', response.message);
        } else if (response.error) {
          console.error('Save password error:', response.error);
        }
      },
      error: (error) => {
        console.error('HTTP Error:', error);
      }
    });
  }

  /**
   * Example 6: Utility Methods
   * Simplified methods for easier usage
   */
  exampleUtilityMethods() {
    // Simplified login
    this.authService.loginWithCredentials('john_doe', 'password123').subscribe({
      next: (response) => console.log('Utility login:', response)
    });

    // Simplified signup
    this.authService.signupWithCredentials('jane_doe', 'jane@example.com', 'password123').subscribe({
      next: (response) => console.log('Utility signup:', response)
    });

    // Simplified password reset request
    this.authService.requestPasswordReset('user@example.com').subscribe({
      next: (response) => console.log('Utility reset request:', response)
    });

    // Simplified password update
    this.authService.updatePassword('token123', 'newPassword456').subscribe({
      next: (response) => console.log('Utility password update:', response)
    });

    // Check authentication status
    console.log('Is authenticated:', this.authService.isAuthenticated());
    console.log('Current user:', this.authService.getCurrentUser());
    console.log('Current token:', this.authService.getToken());
  }
}

/**
 * USAGE IN YOUR COMPONENTS:
 * 
 * 1. Import the AuthService:
 *    import { AuthService } from '../services/auth.service';
 * 
 * 2. Inject it in your component:
 *    private authService = inject(AuthService);
 *    // or in constructor: constructor(private authService: AuthService) {}
 * 
 * 3. Use the methods as shown in the examples above
 * 
 * 4. Subscribe to currentUser$ to react to authentication state changes:
 *    this.authService.currentUser$.subscribe(user => {
 *      if (user) {
 *        console.log('User logged in:', user);
 *      } else {
 *        console.log('User logged out');
 *      }
 *    });
 */