import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
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
                                        <i class="pi pi-bolt text-3xl text-white"></i>
                                    </div>
                                </div>
                            </div>
                            
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                                Rejoignez-nous
                            </h1>
                            <p class="text-gray-600 font-medium">Créez votre compte Elect Général Hanafi</p>
                        </div>

                        <!-- Form -->
                        <form class="space-y-6">
                            <!-- Full Name -->
                            <div>
                                <label for="fullName" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-user mr-2 text-blue-500"></i>Nom complet
                                </label>
                                <input pInputText 
                                       id="fullName" 
                                       type="text" 
                                       placeholder="Votre nom complet" 
                                       class="w-full !border-2 !border-gray-200 focus:!border-yellow-400 !rounded-xl !py-3 !px-4 transition-all duration-300" 
                                       [(ngModel)]="fullName" 
                                       name="fullName" />
                            </div>

                            <!-- Email -->
                            <div>
                                <label for="email" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-envelope mr-2 text-blue-500"></i>Email
                                </label>
                                <input pInputText 
                                       id="email" 
                                       type="email" 
                                       placeholder="votre@email.com" 
                                       class="w-full !border-2 !border-gray-200 focus:!border-yellow-400 !rounded-xl !py-3 !px-4 transition-all duration-300" 
                                       [(ngModel)]="email" 
                                       name="email" />
                            </div>

                            <!-- Phone -->
                            <div>
                                <label for="phone" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-phone mr-2 text-blue-500"></i>Téléphone
                                </label>
                                <input pInputText 
                                       id="phone" 
                                       type="tel" 
                                       placeholder="+33 6 12 34 56 78" 
                                       class="w-full !border-2 !border-gray-200 focus:!border-yellow-400 !rounded-xl !py-3 !px-4 transition-all duration-300" 
                                       [(ngModel)]="phone" 
                                       name="phone" />
                            </div>

                            <!-- Password -->
                            <div>
                                <label for="password" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-lock mr-2 text-blue-500"></i>Mot de passe
                                </label>
                                <p-password id="password" 
                                           [(ngModel)]="password" 
                                           name="password"
                                           placeholder="Mot de passe sécurisé" 
                                           [toggleMask]="true" 
                                           [fluid]="true"
                                           [feedback]="true"
                                           styleClass="custom-password">
                                </p-password>
                            </div>

                            <!-- Confirm Password -->
                            <div>
                                <label for="confirmPassword" class="block text-gray-700 font-semibold mb-2">
                                    <i class="pi pi-lock mr-2 text-blue-500"></i>Confirmer le mot de passe
                                </label>
                                <p-password id="confirmPassword" 
                                           [(ngModel)]="confirmPassword" 
                                           name="confirmPassword"
                                           placeholder="Confirmez votre mot de passe" 
                                           [toggleMask]="true" 
                                           [fluid]="true"
                                           [feedback]="false"
                                           styleClass="custom-password">
                                </p-password>
                            </div>

                            <!-- Terms and Conditions -->
                            <div class="flex items-start space-x-3">
                                <p-checkbox [(ngModel)]="acceptTerms" 
                                           name="acceptTerms"
                                           id="terms" 
                                           binary 
                                           class="mt-1"></p-checkbox>
                                <label for="terms" class="text-sm text-gray-600 leading-relaxed">
                                    J'accepte les <a href="#" class="text-blue-600 hover:text-yellow-600 font-semibold">conditions d'utilisation</a> 
                                    et la <a href="#" class="text-blue-600 hover:text-yellow-600 font-semibold">politique de confidentialité</a>
                                </label>
                            </div>

                            <!-- Register Button -->
                            <div class="pt-4">
                                <div class="relative">
                                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-xl blur opacity-50"></div>
                                    <p-button label="⚡ Créer mon compte ⚡" 
                                             styleClass="w-full !py-4 !text-lg !font-bold !bg-gradient-to-r !from-yellow-400 !to-blue-500 hover:!from-yellow-500 hover:!to-blue-600 !border-0 !rounded-xl !text-white !shadow-lg hover:!shadow-xl !transition-all !duration-300 !transform hover:!scale-105"
                                             (onClick)="register()"
                                             [loading]="isLoading">
                                    </p-button>
                                </div>
                            </div>
                        </form>

                        <!-- Divider -->
                        <div class="flex items-center my-6">
                            <div class="flex-1 border-t border-gray-300"></div>
                            <span class="px-4 text-gray-500 text-sm">ou</span>
                            <div class="flex-1 border-t border-gray-300"></div>
                        </div>

                        <!-- Login Link -->
                        <div class="text-center">
                            <p class="text-gray-600">
                                Déjà un compte ? 
                                <a routerLink="/auth/login" 
                                   class="text-blue-600 hover:text-yellow-600 font-semibold transition-colors duration-300">
                                    Se connecter
                                </a>
                            </p>
                        </div>

                        <!-- Back to Home -->
                        <div class="text-center mt-4">
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
            
            :host ::ng-deep .p-checkbox .p-checkbox-box {
                border: 2px solid #e5e7eb !important;
                border-radius: 0.375rem !important;
            }
            
            :host ::ng-deep .p-checkbox .p-checkbox-box.p-highlight {
                background: linear-gradient(135deg, #fbbf24, #3b82f6) !important;
                border-color: #fbbf24 !important;
            }
        </style>
    `
})
export class Register {
    fullName: string = '';
    email: string = '';
    phone: string = '';
    password: string = '';
    confirmPassword: string = '';
    acceptTerms: boolean = false;
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    register() {
        if (!this.acceptTerms) {
            alert('Veuillez accepter les conditions d\'utilisation');
            return;
        }
        
        if (this.password !== this.confirmPassword) {
            alert('Les mots de passe ne correspondent pas');
            return;
        }

        if (!this.fullName || !this.email || !this.phone || !this.password) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        this.isLoading = true;

        // Use the new AuthService signup method
        this.authService.signupWithCredentials(this.fullName, this.email, this.password).subscribe({
            next: (response) => {
                this.isLoading = false;
                
                if (response['message']) {
                    alert(response['message']);
                    // Navigate to email verification page
                    this.router.navigate(['/auth/verify-email'], { 
                        queryParams: { email: this.email } 
                    });
                } else if (response['error']) {
                    alert('Erreur lors de l\'inscription: ' + response['error']);
                }
            },
            error: (error) => {
                this.isLoading = false;
                alert('Une erreur est survenue lors de l\'inscription');
                console.error('Registration error:', error);
            }
        });
    }
}