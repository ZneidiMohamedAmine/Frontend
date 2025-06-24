import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, ButtonModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="min-h-screen flex items-center justify-center relative overflow-hidden"
             style="background: linear-gradient(135deg, rgba(95, 153, 255, 0.9) 0%, rgba(255, 219, 63, 0.9) 100%), url('picture/panneaux-solaires-photovoltaiques.jpg'); background-size: cover; background-position: center;">
            
            <!-- Animated background elements -->
            <div class="absolute inset-0 overflow-hidden">
                <div class="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div class="absolute top-1/4 -right-20 w-60 h-60 bg-blue-500 rounded-full opacity-15 animate-bounce"></div>
                <div class="absolute -bottom-20 left-1/3 w-80 h-80 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>
            </div>

            <div class="relative z-10 w-full max-w-md mx-4">
                <!-- Glowing container -->
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-3xl blur-xl opacity-30"></div>
                    <div class="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                        
                        <!-- Header -->
                        <div class="text-center mb-8">
                            <!-- Logo -->
                            <div class="flex justify-center mb-6">
                                <div class="relative">
                                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full blur-lg opacity-50"></div>
                                    <div class="relative bg-gradient-to-r from-yellow-400 to-blue-500 p-4 rounded-full">
                                        <i class="pi pi-shield text-3xl text-white"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                                Nouveau mot de passe
                            </h1>
                            <p class="text-gray-600 font-medium text-center leading-relaxed">
                                Créez un nouveau mot de passe sécurisé pour votre compte
                            </p>
                        </div>

                        <!-- Token Validation Status -->
                        <div *ngIf="!isValidToken" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div class="flex items-center">
                                <i class="pi pi-exclamation-triangle text-red-500 text-xl mr-3"></i>
                                <div>
                                    <h3 class="text-red-800 font-semibold">Lien invalide ou expiré</h3>
                                    <p class="text-red-700 text-sm mt-1">
                                        Ce lien de réinitialisation n'est plus valide. Veuillez demander un nouveau lien.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Success Message -->
                        <div *ngIf="passwordChanged" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div class="flex items-center">
                                <i class="pi pi-check-circle text-green-500 text-xl mr-3"></i>
                                <div>
                                    <h3 class="text-green-800 font-semibold">Mot de passe modifié !</h3>
                                    <p class="text-green-700 text-sm mt-1">
                                        Votre mot de passe a été mis à jour avec succès. Vous pouvez maintenant vous connecter.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Form -->
                        <form *ngIf="isValidToken && !passwordChanged" class="space-y-6" (ngSubmit)="changePassword()">
                            <!-- New Password -->
                            <div>
                                <label for="newPassword" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-lock mr-2 text-blue-500"></i>Nouveau mot de passe
                                </label>
                                <p-password id="newPassword" 
                                           [(ngModel)]="newPassword" 
                                           name="newPassword"
                                           placeholder="Votre nouveau mot de passe" 
                                           [toggleMask]="true" 
                                           [fluid]="true"
                                           [feedback]="true"
                                           styleClass="custom-password"
                                           required>
                                </p-password>
                            </div>

                            <!-- Confirm New Password -->
                            <div>
                                <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-lock mr-2 text-blue-500"></i>Confirmer le mot de passe
                                </label>
                                <p-password id="confirmPassword" 
                                           [(ngModel)]="confirmPassword" 
                                           name="confirmPassword"
                                           placeholder="Confirmez votre nouveau mot de passe" 
                                           [toggleMask]="true" 
                                           [fluid]="true"
                                           [feedback]="false"
                                           styleClass="custom-password"
                                           required>
                                </p-password>
                            </div>

                            <!-- Password Requirements -->
                            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <h4 class="text-blue-800 font-semibold mb-2 flex items-center">
                                    <i class="pi pi-info-circle mr-2"></i>
                                    Exigences du mot de passe
                                </h4>
                                <ul class="text-blue-700 text-sm space-y-1">
                                    <li class="flex items-center">
                                        <i class="pi pi-check text-green-500 mr-2 text-xs" 
                                           [class.pi-check]="hasMinLength" 
                                           [class.pi-times]="!hasMinLength"
                                           [class.text-green-500]="hasMinLength"
                                           [class.text-red-500]="!hasMinLength"></i>
                                        Au moins 8 caractères
                                    </li>
                                    <li class="flex items-center">
                                        <i class="pi pi-check text-green-500 mr-2 text-xs"
                                           [class.pi-check]="hasUpperCase" 
                                           [class.pi-times]="!hasUpperCase"
                                           [class.text-green-500]="hasUpperCase"
                                           [class.text-red-500]="!hasUpperCase"></i>
                                        Une lettre majuscule
                                    </li>
                                    <li class="flex items-center">
                                        <i class="pi pi-check text-green-500 mr-2 text-xs"
                                           [class.pi-check]="hasLowerCase" 
                                           [class.pi-times]="!hasLowerCase"
                                           [class.text-green-500]="hasLowerCase"
                                           [class.text-red-500]="!hasLowerCase"></i>
                                        Une lettre minuscule
                                    </li>
                                    <li class="flex items-center">
                                        <i class="pi pi-check text-green-500 mr-2 text-xs"
                                           [class.pi-check]="hasNumber" 
                                           [class.pi-times]="!hasNumber"
                                           [class.text-green-500]="hasNumber"
                                           [class.text-red-500]="!hasNumber"></i>
                                        Un chiffre
                                    </li>
                                </ul>
                            </div>

                            <!-- Change Password Button -->
                            <div class="pt-4">
                                <div class="relative">
                                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl blur opacity-50"></div>
                                    <p-button label="🔒 Modifier le mot de passe" 
                                             type="submit"
                                             styleClass="w-full !py-4 !text-lg !font-bold !bg-gradient-to-r !from-yellow-400 !to-blue-500 hover:!from-yellow-500 hover:!to-blue-600 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!scale-105"
                                             [loading]="isLoading"
                                             [disabled]="!isPasswordValid">
                                    </p-button>
                                </div>
                            </div>
                        </form>

                        <!-- Navigation Links -->
                        <div class="space-y-3 text-center mt-6">
                            <div *ngIf="passwordChanged">
                                <div class="relative">
                                    <p-button label="🚀 Se connecter maintenant" 
                                             routerLink="/auth/login"
                                             styleClass="w-full !py-3 !text-base !font-semibold !bg-gradient-to-r !from-green-400 !to-green-600 hover:!from-green-500 hover:!to-green-700 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300">
                                    </p-button>
                                </div>
                            </div>
                            
                            <div *ngIf="!isValidToken">
                                <div class="space-y-3">
                                    <p-button label="📧 Demander un nouveau lien" 
                                             routerLink="/auth/forgot-password"
                                             styleClass="w-full !py-3 !text-base !font-semibold !bg-gradient-to-r !from-yellow-400 !to-blue-500 hover:!from-yellow-500 hover:!to-blue-600 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300">
                                    </p-button>
                                    
                                    <a routerLink="/auth/login" 
                                       class="block text-blue-600 hover:text-yellow-600 font-semibold transition-colors duration-300">
                                        Retour à la connexion
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Back to Home -->
                        <div class="text-center mt-6 pt-4 border-t border-gray-200">
                            <a routerLink="/" 
                               class="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-300">
                                <i class="pi pi-arrow-left mr-2"></i>
                                Retour à l'accueil
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            :host ::ng-deep .custom-password .p-password-input {
                border: 2px solid #e5e7eb !important;
                border-radius: 0.75rem !important;
                padding: 0.75rem 1rem !important;
                transition: all 0.3s ease !important;
            }
            
            :host ::ng-deep .custom-password .p-password-input:focus {
                border-color: #fbbf24 !important;
                box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1) !important;
            }
        </style>
    `
})
export class ChangePassword implements OnInit {
    newPassword: string = '';
    confirmPassword: string = '';
    token: string = '';
    isValidToken: boolean = true;
    passwordChanged: boolean = false;
    isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // Get token from URL parameters
        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
            if (!this.token) {
                this.isValidToken = false;
            } else {
                // Validate token (simulate API call)
                this.validateToken();
            }
        });
    }

    validateToken() {
        // Simulate token validation
        // In a real app, you would call your API to validate the token
        setTimeout(() => {
            // For demo purposes, consider token valid if it's not empty
            this.isValidToken = !!(this.token && this.token.length > 10);
        }, 1000);
    }

    get hasMinLength(): boolean {
        return this.newPassword.length >= 8;
    }

    get hasUpperCase(): boolean {
        return /[A-Z]/.test(this.newPassword);
    }

    get hasLowerCase(): boolean {
        return /[a-z]/.test(this.newPassword);
    }

    get hasNumber(): boolean {
        return /\d/.test(this.newPassword);
    }

    get isPasswordValid(): boolean {
        return this.hasMinLength && 
               this.hasUpperCase && 
               this.hasLowerCase && 
               this.hasNumber && 
               this.newPassword === this.confirmPassword;
    }

    changePassword() {
        if (!this.isPasswordValid) {
            alert('Veuillez respecter toutes les exigences du mot de passe');
            return;
        }

        if (this.newPassword !== this.confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        this.isLoading = true;
        
        // Use the new AuthService savePassword method
        this.authService.updatePassword(this.token, this.newPassword).subscribe({
            next: (response) => {
                this.isLoading = false;
                
                if (response['message']) {
                    this.passwordChanged = true;
                    console.log('Password changed successfully:', response['message']);
                } else if (response['error']) {
                    alert('Erreur: ' + response['error']);
                }
            },
            error: (error) => {
                this.isLoading = false;
                alert('Une erreur est survenue lors de la modification du mot de passe');
                console.error('Change password error:', error);
            }
        });
    }
}