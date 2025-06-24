import { Component, OnInit, OnDestroy } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'topbar-widget',
    imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, CommonModule],
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
                    <div class="flex items-center gap-3">
                        <span class="text-white text-sm">Bonjour, {{ currentUser.fullName.split(' ')[0] }}!</span>
                        <button pButton pRipple label="Tableau de bord" routerLink="/dashboard" [rounded]="true" [text]="true" class="!text-white hover:!bg-white/10"></button>
                        <button pButton pRipple label="Déconnexion" (click)="logout()" [rounded]="true" class="!bg-red-500 hover:!bg-red-600 !text-white !font-semibold"></button>
                    </div>
                </ng-container>
            </div>
        </div> `
})
export class TopbarWidget implements OnInit, OnDestroy {
    currentUser: User | null = null;
    private userSubscription: Subscription = new Subscription();

    constructor(
        public router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.userSubscription = this.authService.currentUser$.subscribe(
            user => this.currentUser = user
        );
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
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
        this.authService.logout();
        this.router.navigate(['/']);
    }
}