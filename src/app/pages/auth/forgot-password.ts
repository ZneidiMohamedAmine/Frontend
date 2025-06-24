import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, ButtonModule, InputTextModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
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
                                        <i class="pi pi-key text-3xl text-white"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                                Mot de passe oublié ?
                            </h1>
                            <p class="text-gray-600 font-medium text-center leading-relaxed">
                                Pas de souci ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                            </p>
                        </div>

                        <!-- Success Message -->
                        <div *ngIf="emailSent" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div class="flex items-center">
                                <i class="pi pi-check-circle text-green-500 text-xl mr-3"></i>
                                <div>
                                    <h3 class="text-green-800 font-semibold">Email envoyé !</h3>
                                    <p class="text-green-700 text-sm mt-1">
                                        Vérifiez votre boîte mail et suivez les instructions pour réinitialiser votre mot de passe.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Form -->
                        <form *ngIf="!emailSent" class="space-y-6" (ngSubmit)="sendResetEmail()">
                            <!-- Email -->
                            <div>
                                <label for="email" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-envelope mr-2 text-blue-500"></i>Adresse email
                                </label>
                                <input pInputText 
                                       id="email" 
                                       type="email" 
                                       placeholder="votre@email.com" 
                                       class="w-full !border-2 !border-gray-200 focus:!border-yellow-400 !rounded-xl !py-3 !px-4 transition-all duration-300" 
                                       [(ngModel)]="email" 
                                       name="email"
                                       required />
                            </div>

                            <!-- Send Reset Email Button -->
                            <div class="pt-4">
                                <div class="relative">
                                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl blur opacity-50"></div>
                                    <p-button label="🔑 Envoyer le lien de réinitialisation" 
                                             type="submit"
                                             styleClass="w-full !py-4 !text-lg !font-bold !bg-gradient-to-r !from-yellow-400 !to-blue-500 hover:!from-yellow-500 hover:!to-blue-600 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!scale-105"
                                             [loading]="isLoading">
                                    </p-button>
                                </div>
                            </div>
                        </form>

                        <!-- Back to Login -->
                        <div *ngIf="emailSent" class="pt-6">
                            <div class="relative">
                                <p-button label="✉️ Renvoyer l'email" 
                                         styleClass="w-full !py-3 !text-base !font-semibold !bg-gray-100 hover:!bg-gray-200 !border-2 !border-gray-300 !rounded-xl !text-gray-700 !transition-all !duration-300"
                                         (onClick)="resendEmail()">
                                </p-button>
                            </div>
                        </div>

                        <!-- Divider -->
                        <div class="flex items-center my-6">
                            <div class="flex-1 border-t border-gray-300"></div>
                            <span class="px-4 text-gray-500 text-sm">ou</span>
                            <div class="flex-1 border-t border-gray-300"></div>
                        </div>

                        <!-- Navigation Links -->
                        <div class="space-y-3 text-center">
                            <div>
                                <a routerLink="/auth/login" 
                                   class="inline-flex items-center text-blue-600 hover:text-yellow-600 font-semibold transition-colors duration-300">
                                    <i class="pi pi-sign-in mr-2"></i>
                                    Retour à la connexion
                                </a>
                            </div>
                            
                            <div>
                                <span class="text-gray-600">Pas encore de compte ? </span>
                                <a routerLink="/auth/register" 
                                   class="text-blue-600 hover:text-yellow-600 font-semibold transition-colors duration-300">
                                    S'inscrire
                                </a>
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
            :host ::ng-deep .p-inputtext {
                transition: all 0.3s ease !important;
            }
            
            :host ::ng-deep .p-inputtext:focus {
                box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1) !important;
            }
        </style>
    `
})
export class ForgotPassword {
    email: string = '';
    emailSent: boolean = false;
    isLoading: boolean = false;

    constructor(private authService: AuthService) {}

    sendResetEmail() {
        if (!this.email) {
            alert('Veuillez entrer votre adresse email');
            return;
        }

        this.isLoading = true;
        
        // Use the new AuthService resetPassword method
        this.authService.requestPasswordReset(this.email).subscribe({
            next: (response) => {
                this.isLoading = false;
                
                if (response['message']) {
                    this.emailSent = true;
                    console.log('Password reset email sent:', response['message']);
                } else if (response['error']) {
                    alert('Erreur: ' + response['error']);
                }
            },
            error: (error) => {
                this.isLoading = false;
                alert('Une erreur est survenue lors de l\'envoi de l\'email');
                console.error('Reset password error:', error);
            }
        });
    }

    resendEmail() {
        this.emailSent = false;
        this.sendResetEmail();
    }
}