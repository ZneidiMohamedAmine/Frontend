import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Example component showing how to handle the redirectToResetPasswordPage functionality
 * This component would be used when users click on password reset links in their email
 */
@Component({
  selector: 'app-password-reset-redirect',
  template: `
    <div class="password-reset-redirect">
      <h2>Password Reset Redirect Handler</h2>
      
      <div *ngIf="isProcessing" class="processing">
        <p>Processing password reset link...</p>
        <div class="spinner"></div>
      </div>
      
      <div *ngIf="!isProcessing && redirectSuccess" class="success">
        <h3>✅ Redirect Successful</h3>
        <p>You will be redirected to the password reset page shortly.</p>
      </div>
      
      <div *ngIf="!isProcessing && !redirectSuccess" class="error">
        <h3>❌ Invalid or Expired Link</h3>
        <p>This password reset link is invalid or has expired.</p>
        <button (click)="requestNewLink()">Request New Link</button>
      </div>
    </div>
  `,
  styles: [`
    .password-reset-redirect {
      padding: 20px;
      text-align: center;
    }
    .processing, .success, .error {
      margin: 20px 0;
      padding: 20px;
      border-radius: 8px;
    }
    .processing {
      background-color: #f0f8ff;
      border: 1px solid #007bff;
    }
    .success {
      background-color: #f0fff0;
      border: 1px solid #28a745;
    }
    .error {
      background-color: #fff5f5;
      border: 1px solid #dc3545;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 2s linear infinite;
      margin: 20px auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    button {
      padding: 10px 20px;
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
export class PasswordResetRedirectComponent implements OnInit {
  isProcessing = true;
  redirectSuccess = false;
  token = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get token from URL parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      if (this.token) {
        this.handlePasswordResetRedirect();
      } else {
        this.isProcessing = false;
        this.redirectSuccess = false;
      }
    });
  }

  /**
   * Example of using the redirectToResetPasswordPage method
   * This method would typically be called when a user clicks a password reset link
   */
  handlePasswordResetRedirect() {
    this.authService.redirectToResetPasswordPage(this.token).subscribe({
      next: (response) => {
        this.isProcessing = false;
        
        // Check if the response indicates success
        if (response && !response.includes('Error')) {
          this.redirectSuccess = true;
          
          // Redirect to the change password page after a short delay
          setTimeout(() => {
            this.router.navigate(['/auth/change-password'], {
              queryParams: { token: this.token }
            });
          }, 2000);
        } else {
          this.redirectSuccess = false;
        }
      },
      error: (error) => {
        this.isProcessing = false;
        this.redirectSuccess = false;
        console.error('Redirect error:', error);
      }
    });
  }

  requestNewLink() {
    // Navigate to forgot password page
    this.router.navigate(['/auth/forgot-password']);
  }
}

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. Add this component to your routing:
 *    {
 *      path: 'auth/reset-redirect',
 *      component: PasswordResetRedirectComponent
 *    }
 * 
 * 2. Your backend should send emails with links like:
 *    https://yourapp.com/auth/reset-redirect?token=RESET_TOKEN_HERE
 * 
 * 3. When users click the email link, they'll land on this component
 *    which will:
 *    - Call the redirectToResetPasswordPage API
 *    - Handle the response
 *    - Redirect to the change password page if successful
 * 
 * 4. Alternative direct usage of the redirect method:
 */

// Example of direct usage in any component:
export class DirectUsageExample {
  constructor(private authService: AuthService) {}

  handleEmailLinkClick(token: string) {
    this.authService.redirectToResetPasswordPage(token).subscribe({
      next: (response) => {
        console.log('Redirect response:', response);
        // Handle the response based on your backend implementation
      },
      error: (error) => {
        console.error('Redirect failed:', error);
      }
    });
  }
}