import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AuthService, User } from '../../../services/auth.service';
import { Role } from '../../../models/auth.models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, CommonModule, AvatarModule, BadgeModule],
    template: `<a class="flex items-center justify-center" href="#">
            <img src="picture/logo.svg" alt="Logo" class="h-12 mr-2">
            <span class="text-white font-medium text-2xl leading-normal mr-20">Elect Général Hanafi</span>
        </a>

        <a pButton [text]="true" severity="secondary" [rounded]="true" pRipple class="lg:!hidden" pStyleClass="@next" enterClass="hidden" leaveToClass="hidden" [hideOnOutsideClick]="true">
            <i class="pi pi-bars !text-2xl"></i>
        </a>

        <div class="items-center bg-transparent grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border">
            <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                <li>
                    <a (click)="router.navigate(['/'])" pRipple class="px-0 py-4 text-white font-medium text-xl cursor-pointer">
                        <span>Accueil</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/services'])" pRipple class="px-0 py-4 text-white font-medium text-xl cursor-pointer">
                        <span>Services</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/portfolio'])" pRipple class="px-0 py-4 text-white font-medium text-xl cursor-pointer">
                        <span>Réalisations</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/about'])" pRipple class="px-0 py-4 text-white font-medium text-xl cursor-pointer">
                        <span>À Propos</span>
                    </a>
                </li>
                <li>
                    <a (click)="router.navigate(['/calculator'])" pRipple class="px-0 py-4 text-white font-medium text-xl cursor-pointer">
                        <span>Calculateur</span>
                    </a>
                </li>
            </ul>
            <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
                <!-- Not authenticated -->
                <ng-container *ngIf="!currentUser">
                    <button pButton pRipple label="Connexion" routerLink="/auth/login" [rounded]="true" [text]="true" class="!text-white hover:!bg-white/10"></button>
                    <button pButton pRipple label="Inscription" routerLink="/auth/register" [rounded]="true" class="!bg-yellow-500 hover:!bg-yellow-600 !text-black !font-semibold"></button>
                </ng-container>
                
                <!-- Authenticated -->
                <ng-container *ngIf="currentUser">
                    <div class="flex items-center gap-3 relative">
                        <span class="text-white text-sm">Bonjour, <span class="font-semibold">{{ getUserDisplayName() }}</span>!</span>
                        
                        <div class="relative">
                            <div (click)="toggleUserMenu($event)" class="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 cursor-pointer">
                                <p-avatar [label]="getUserInitials()" styleClass="!bg-white !text-blue-600 !font-semibold" size="normal" shape="circle"></p-avatar>
                                <i class="pi pi-chevron-down text-white text-xs" [class.rotate-180]="showUserMenu"></i>
                            </div>
                            
                            <div *ngIf="showUserMenu" class="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                                <div class="px-4 py-3 border-b">
                                    <div class="flex items-center gap-3">
                                        <p-avatar [label]="getUserInitials()" styleClass="!bg-blue-100 !text-blue-600" size="large" shape="circle"></p-avatar>
                                        <div>
                                            <p class="font-semibold text-gray-900">{{ getUserDisplayName() }}</p>
                                            <p class="text-sm text-gray-500">{{ currentUser.email }}</p>
                                            <p *ngIf="currentUser.role" class="text-xs text-blue-600">{{ getRoleDisplayName() }}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="py-1">
                                    <div (click)="navigateToProfile()" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <i class="pi pi-user text-gray-400"></i>
                                        <span>Mon Profil</span>
                                    </div>
                                    
                                    <div (click)="navigateToDashboard()" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <i class="pi pi-chart-line text-gray-400"></i>
                                        <span>Tableau de bord</span>
                                    </div>
                                    
                                    <div *ngIf="isAdmin()" (click)="navigateToAdmin()" class="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                                        <i class="pi pi-cog text-orange-500"></i>
                                        <span class="flex items-center gap-2">
                                            Administration
                                            <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Admin</span>
                                        </span>
                                    </div>
                                    
                                    <hr class="my-1">
                                    
                                    <div (click)="logout()" class="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer">
                                        <i class="pi pi-sign-out text-red-500"></i>
                                        <span>Déconnexion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>
        </div> `,
    styles: [`
        .rotate-180 {
            transform: rotate(180deg);
        }
        .z-50 {
            z-index: 50;
        }
    `]
})
export class TopbarWidget implements OnInit, OnDestroy {
    currentUser: User | null = null;
    showUserMenu = false;
    private userSubscription: Subscription = new Subscription();

    constructor(
        public router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.userSubscription = this.authService.currentUser$.subscribe(
            user => this.currentUser = user
        );

        document.addEventListener('click', this.closeUserMenu.bind(this));
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        document.removeEventListener('click', this.closeUserMenu.bind(this));
    }

    toggleUserMenu(event: Event) {
        event.stopPropagation();
        this.showUserMenu = !this.showUserMenu;
    }

    closeUserMenu() {
        this.showUserMenu = false;
    }

    getUserDisplayName(): string {
        if (!this.currentUser) return '';
        return this.currentUser.fullName || 'Utilisateur';
    }

    getUserInitials(): string {
        if (!this.currentUser?.fullName) return 'U';
        
        const names = this.currentUser.fullName.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    }

    getRoleDisplayName(): string {
        if (!this.currentUser?.role) return '';
        
        switch (this.currentUser.role) {
            case Role.Admin: return 'Administrateur';
            case Role.Client: return 'Client';
            case Role.Visiteur: return 'Visiteur';
            default: return this.currentUser.role;
        }
    }

    isAdmin(): boolean {
        return this.currentUser?.role === Role.Admin;
    }

    navigateToProfile() {
        this.closeUserMenu();
        this.router.navigate(['/user-profile']);
    }

    navigateToDashboard() {
        this.closeUserMenu();
        this.router.navigate(['/dashboard']);
    }

    navigateToAdmin() {
        this.closeUserMenu();
        this.router.navigate(['/admin']);
    }

    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    logout() {
        this.closeUserMenu();
        this.authService.logout();
        this.router.navigate(['/']);
    }
}