import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  Utilisateur, 
  EmailRequest, 
  PasswordDto, 
  AuthResponse, 
  LoginRequest, 
  SignupRequest, 
  Role
} from '../models/auth.models';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  isEmailVerified: boolean;
  role?: Role;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.tokenKey);
    const userStr = localStorage.getItem(this.userKey);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private getAuthHeaders() {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  /**
   * Signup function - POST request
   * @param utilisateur - Utilisateur object
   * @returns Observable<Map<String, String>> with "message" or "error" key
   */
  signup(utilisateur: Utilisateur): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(
      `${this.apiUrl}/signup`, 
      utilisateur, 
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Signup error:', error);
        return of({ error: 'Une erreur est survenue lors de l\'inscription' });
      })
    );
  }

  /**
   * Login function - POST request
   * @param utilisateur - Utilisateur object with nom and motdepasse
   * @returns Observable<Map<String, String>> with "jwtToken" or "error" key
   */
  login(utilisateur: Utilisateur): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(
      `${this.apiUrl}/login`, 
      utilisateur, 
      this.getHttpOptions()
    ).pipe(
      map(response => {
        // If login successful and token received, store it
        if (response['jwtToken']) {
          localStorage.setItem(this.tokenKey, response['jwtToken']);
          // You might want to decode the JWT to get user info
          // For now, creating a basic user object
          const user: User = {
            id: 'user_' + Date.now(),
            email: utilisateur.email || '',
            fullName: utilisateur.nom || '',
            isEmailVerified: true
          };
          localStorage.setItem(this.userKey, JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of({ error: 'Une erreur est survenue lors de la connexion' });
      })
    );
  }

  /**
   * Reset Password function - POST request
   * @param emailRequest - EmailRequest object containing email
   * @returns Observable<Map<String, String>> with "message" or "error" key
   */
  resetPassword(emailRequest: EmailRequest): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(
      `${this.apiUrl}/resetPassword`, 
      emailRequest, 
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Reset password error:', error);
        return of({ error: 'Une erreur est survenue lors de la réinitialisation du mot de passe' });
      })
    );
  }

  /**
   * Redirect to Reset Password Page - GET request
   * @param token - String token as request parameter
   * @returns Observable<any> - This will handle the redirect
   */
  redirectToResetPasswordPage(token: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/redirectToResetPasswordPage?token=${token}`,
      { responseType: 'text' }
    ).pipe(
      catchError(error => {
        console.error('Redirect error:', error);
        return of('Error occurred during redirect');
      })
    );
  }

  /**
   * Save Password function - POST request
   * @param passwordDto - PasswordDto object containing token and newPassword
   * @returns Observable<Map<String, String>> with "message" or "error" key
   */
  savePassword(passwordDto: PasswordDto): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(
      `${this.apiUrl}/savePassword`, 
      passwordDto, 
      this.getHttpOptions()
    ).pipe(
      catchError(error => {
        console.error('Save password error:', error);
        return of({ error: 'Une erreur est survenue lors de la sauvegarde du mot de passe' });
      })
    );
  }

  // Utility methods for easier usage

  /**
   * Simplified login method
   * @param nom - Username
   * @param motdepasse - Password
   */
  loginWithCredentials(nom: string, motdepasse: string): Observable<{ [key: string]: string }> {
    const utilisateur: Utilisateur = { nom, motdepasse };
    return this.login(utilisateur);
  }

  /**
   * Simplified signup method
   * @param nom - Username
   * @param email - Email
   * @param motdepasse - Password
   */
  signupWithCredentials(nom: string, email: string, motdepasse: string): Observable<{ [key: string]: string }> {
    const utilisateur: Utilisateur = { nom, email, motdepasse };
    return this.signup(utilisateur);
  }

  /**
   * Simplified reset password method
   * @param email - Email address
   */
  requestPasswordReset(email: string): Observable<{ [key: string]: string }> {
    const emailRequest: EmailRequest = { email };
    return this.resetPassword(emailRequest);
  }

  /**
   * Simplified save password method
   * @param token - Reset token
   * @param newPassword - New password
   */
  updatePassword(token: string, newPassword: string): Observable<{ [key: string]: string }> {
    const passwordDto: PasswordDto = { token, newPassword };
    return this.savePassword(passwordDto);
  }

  // Logout user
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null && this.getToken() !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  // GET user role
  getRole(): Role | null {
  const user = this.getCurrentUser();
  return user && user.role !== undefined ? user.role : null;
  }
}