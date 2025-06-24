import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-email-verification',
    standalone: true,
    imports: [CommonModule, ButtonModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
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
                                        <i class="pi pi-envelope text-3xl text-white"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                                Vérification Email
                            </h1>
                            <p class="text-gray-600 font-medium text-center leading-relaxed">
                                Vérification de votre adresse email en cours...
                            </p>
                        </div>

                        <!-- Verification Status -->
                        <div *ngIf="isVerifying" class="text-center mb-8">
                            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                            <p class="text-gray-600">Vérification en cours...</p>
                        </div>

                        <!-- Success Message -->
                        <div *ngIf="verificationSuccess && !isVerifying" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div class="flex items-center">
                                <i class="pi pi-check-circle text-green-500 text-xl mr-3"></i>
                                <div>
                                    <h3 class="text-green-800 font-semibold">Email vérifié !</h3>
                                    <p class="text-green-700 text-sm mt-1">
                                        Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Error Message -->
                        <div *ngIf="!verificationSuccess && !isVerifying && errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <div class="flex items-center">
                                <i class="pi pi-exclamation-triangle text-red-500 text-xl mr-3"></i>
                                <div>
                                    <h3 class="text-red-800 font-semibold">Information</h3>
                                    <p class="text-red-700 text-sm mt-1">
                                        {{ errorMessage }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Email Sent Message -->
                        <div *ngIf="!verificationSuccess && !isVerifying && errorMessage && errorMessage.includes('email de vérification a été envoyé')" class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <div class="flex items-center">
                                <i class="pi pi-info-circle text-blue-500 text-xl mr-3"></i>
                                <div>
                                    <h3 class="text-blue-800 font-semibold">Email envoyé</h3>
                                    <p class="text-blue-700 text-sm mt-1">
                                        Vérifiez votre boîte mail et cliquez sur le lien de vérification. Le lien peut prendre quelques minutes à arriver.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="space-y-4">
                            <div *ngIf="verificationSuccess && !isVerifying">
                                <div class="relative">
                                    <p-button label="🚀 Se connecter maintenant" 
                                             routerLink="/auth/login"
                                             styleClass="w-full !py-4 !text-lg !font-bold !bg-gradient-to-r !from-green-400 !to-green-600 hover:!from-green-500 hover:!to-green-700 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300">
                                    </p-button>
                                </div>
                            </div>
                            
                            <div *ngIf="!verificationSuccess && !isVerifying">
                                <div class="space-y-3">
                                    <p-button *ngIf="email" 
                                             label="📧 Renvoyer l'email de vérification" 
                                             (onClick)="resendVerification()"
                                             styleClass="w-full !py-3 !text-base !font-semibold !bg-gradient-to-r !from-yellow-400 !to-blue-500 hover:!from-yellow-500 hover:!to-blue-600 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300"
                                             [loading]="isResending">
                                    </p-button>
                                    
                                    <p-button label="🔙 Retour à l'inscription" 
                                             routerLink="/auth/register"
                                             styleClass="w-full !py-3 !text-base !font-semibold !bg-gray-100 hover:!bg-gray-200 !border-2 !border-gray-300 !rounded-xl !text-gray-700 !transition-all !duration-300">
                                    </p-button>
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
    `
})
export class EmailVerification implements OnInit {
    token: string = '';
    email: string = '';
    isVerifying: boolean = true;
    verificationSuccess: boolean = false;
    isResending: boolean = false;
    errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // Get token or email from URL parameters
        this.route.queryParams.subscribe(params => {
            this.token = params['token'];
            this.email = params['email'];
            
            if (this.token) {
                // If we have a token, verify it
                this.verifyEmail();
            } else if (this.email) {
                // If we only have email, send verification email first
                this.sendVerificationEmail();
            } else {
                this.isVerifying = false;
                this.verificationSuccess = false;
                this.errorMessage = 'Aucun token ou email fourni pour la vérification.';
            }
        });
    }

    sendVerificationEmail() {
        // Use reset password function temporarily for email verification
        this.authService.requestPasswordReset(this.email).subscribe({
            next: (response) => {
                this.isVerifying = false;
                if (response['message']) {
                    // Email sent successfully, show message to check email
                    this.errorMessage = 'Un email de vérification a été envoyé. Veuillez vérifier votre boîte mail et cliquer sur le lien.';
                } else if (response['error']) {
                    this.errorMessage = response['error'];
                }
            },
            error: (error) => {
                this.isVerifying = false;
                this.errorMessage = 'Erreur lors de l\'envoi de l\'email de vérification.';
                console.error('Send verification email error:', error);
            }
        });
    }

    verifyEmail() {
        // Use the redirectToResetPasswordPage function temporarily for token verification
        this.authService.redirectToResetPasswordPage(this.token).subscribe({
            next: (response) => {
                this.isVerifying = false;
                // If the token is valid, consider verification successful
                this.verificationSuccess = true;
                console.log('Email verification result:', this.verificationSuccess);
            },
            error: (error) => {
                this.isVerifying = false;
                this.verificationSuccess = false;
                this.errorMessage = 'Le token de vérification est invalide ou a expiré.';
                console.error('Email verification error:', error);
            }
        });
    }

    resendVerification() {
        if (!this.email) {
            alert('Adresse email non disponible pour le renvoi.');
            return;
        }

        this.isResending = true;
        
        // Use reset password function to resend verification email
        this.authService.requestPasswordReset(this.email).subscribe({
            next: (response) => {
                this.isResending = false;
                if (response['message']) {
                    alert('Un nouvel email de vérification a été envoyé !');
                } else if (response['error']) {
                    alert('Erreur: ' + response['error']);
                }
            },
            error: (error) => {
                this.isResending = false;
                alert('Erreur lors du renvoi de l\'email de vérification.');
                console.error('Resend verification error:', error);
            }
        });
    }
}