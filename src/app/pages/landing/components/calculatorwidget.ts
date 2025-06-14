import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'calculator-widget',
    imports: [ButtonModule, RippleModule, InputNumberModule, DropdownModule, FormsModule, CommonModule],
    template: `
        <div
            id="calculator"
            class="flex flex-col items-center py-20 px-6 lg:px-20 bg-gray-50 dark:bg-surface-800"
        >
            <div class="max-w-4xl w-full">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        <span class="text-yellow-500">Calculateur</span> de Devis
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Obtenez une estimation rapide pour vos travaux électriques
                    </p>
                </div>

                <div class="bg-white dark:bg-surface-900 rounded-2xl p-8 shadow-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <!-- Type de Projet -->
                        <div>
                            <label class="block text-sm font-bold text-gray-900 dark:text-white mb-3">Type de Projet</label>
                            <p-dropdown 
                                [options]="projectTypes" 
                                [(ngModel)]="selectedProjectType"
                                optionLabel="label" 
                                optionValue="value"
                                placeholder="Sélectionnez un type"
                                class="w-full"
                                (onChange)="calculateEstimate()">
                            </p-dropdown>
                        </div>

                        <!-- Surface -->
                        <div>
                            <label class="block text-sm font-bold text-gray-900 dark:text-white mb-3">Surface (m²)</label>
                            <p-inputNumber 
                                [(ngModel)]="surface" 
                                mode="decimal" 
                                [min]="1" 
                                [max]="10000"
                                placeholder="Ex: 100"
                                class="w-full"
                                (onInput)="calculateEstimate()">
                            </p-inputNumber>
                        </div>

                        <!-- Nombre de Pièces -->
                        <div>
                            <label class="block text-sm font-bold text-gray-900 dark:text-white mb-3">Nombre de Pièces</label>
                            <p-inputNumber 
                                [(ngModel)]="rooms" 
                                mode="decimal" 
                                [min]="1" 
                                [max]="50"
                                placeholder="Ex: 5"
                                class="w-full"
                                (onInput)="calculateEstimate()">
                            </p-inputNumber>
                        </div>

                        <!-- Type d'Installation -->
                        <div>
                            <label class="block text-sm font-bold text-gray-900 dark:text-white mb-3">Type d'Installation</label>
                            <p-dropdown 
                                [options]="installationTypes" 
                                [(ngModel)]="selectedInstallationType"
                                optionLabel="label" 
                                optionValue="value"
                                placeholder="Sélectionnez un type"
                                class="w-full"
                                (onChange)="calculateEstimate()">
                            </p-dropdown>
                        </div>
                    </div>

                    <!-- Options Supplémentaires -->
                    <div class="mb-8">
                        <label class="block text-sm font-bold text-gray-900 dark:text-white mb-4">Options Supplémentaires</label>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center">
                                <input type="checkbox" id="led" [(ngModel)]="options.led" (change)="calculateEstimate()" class="mr-3">
                                <label for="led" class="text-gray-700 dark:text-gray-300">Éclairage LED (+15%)</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="domotique" [(ngModel)]="options.domotique" (change)="calculateEstimate()" class="mr-3">
                                <label for="domotique" class="text-gray-700 dark:text-gray-300">Domotique (+25%)</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="urgence" [(ngModel)]="options.urgence" (change)="calculateEstimate()" class="mr-3">
                                <label for="urgence" class="text-gray-700 dark:text-gray-300">Intervention d'urgence (+30%)</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="weekend" [(ngModel)]="options.weekend" (change)="calculateEstimate()" class="mr-3">
                                <label for="weekend" class="text-gray-700 dark:text-gray-300">Weekend/Jours fériés (+20%)</label>
                            </div>
                        </div>
                    </div>

                    <!-- Résultat -->
                    <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8">
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Estimation du Devis</h3>
                            <div class="text-4xl font-bold text-yellow-600 mb-2">
                                {{ formatPrice(estimatedPrice) }}
                            </div>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                *Prix indicatif, devis détaillé sur demande
                            </p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div class="bg-white dark:bg-surface-800 rounded-lg p-3">
                                    <div class="font-semibold text-gray-900 dark:text-white">Prix de base</div>
                                    <div class="text-gray-600 dark:text-gray-300">{{ formatPrice(basePrice) }}</div>
                                </div>
                                <div class="bg-white dark:bg-surface-800 rounded-lg p-3">
                                    <div class="font-semibold text-gray-900 dark:text-white">Options</div>
                                    <div class="text-gray-600 dark:text-gray-300">+{{ formatPrice(optionsPrice) }}</div>
                                </div>
                                <div class="bg-white dark:bg-surface-800 rounded-lg p-3">
                                    <div class="font-semibold text-gray-900 dark:text-white">Total TTC</div>
                                    <div class="text-yellow-600 font-bold">{{ formatPrice(estimatedPrice) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Détails du Calcul -->
                    <div class="bg-gray-50 dark:bg-surface-800 rounded-xl p-6 mb-8">
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Détails du Calcul</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Type de projet:</span>
                                <span class="text-gray-900 dark:text-white">{{ getProjectTypeName() }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Surface:</span>
                                <span class="text-gray-900 dark:text-white">{{ surface || 0 }} m²</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Nombre de pièces:</span>
                                <span class="text-gray-900 dark:text-white">{{ rooms || 0 }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600 dark:text-gray-300">Type d'installation:</span>
                                <span class="text-gray-900 dark:text-white">{{ getInstallationTypeName() }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button pButton pRipple [rounded]="true" type="button" label="Demander un Devis Détaillé" 
                                class="!text-lg !px-10 !py-4 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 !font-bold shadow-lg transform hover:scale-105 transition-all duration-300 mr-4"></button>
                        <button pButton pRipple [rounded]="true" [outlined]="true" type="button" label="Réinitialiser" 
                                (click)="resetCalculator()"
                                class="!text-lg !px-8 !py-4 !text-yellow-600 !border-yellow-600 hover:!bg-yellow-50 dark:hover:!bg-yellow-900/20"></button>
                    </div>
                </div>

                <!-- Informations Complémentaires -->
                <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <i class="pi pi-clock text-2xl text-yellow-600"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Devis Rapide</h4>
                        <p class="text-gray-600 dark:text-gray-300">Estimation en quelques clics</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <i class="pi pi-shield text-2xl text-blue-600"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Sans Engagement</h4>
                        <p class="text-gray-600 dark:text-gray-300">Aucune obligation d'achat</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                            <i class="pi pi-phone text-2xl text-green-600"></i>
                        </div>
                        <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Conseil Gratuit</h4>
                        <p class="text-gray-600 dark:text-gray-300">Accompagnement personnalisé</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class CalculatorWidget {
    selectedProjectType: string = '';
    selectedInstallationType: string = '';
    surface: number = 0;
    rooms: number = 0;
    estimatedPrice: number = 0;
    basePrice: number = 0;
    optionsPrice: number = 0;

    options = {
        led: false,
        domotique: false,
        urgence: false,
        weekend: false
    };

    projectTypes = [
        { label: 'Installation complète', value: 'complete', baseRate: 80 },
        { label: 'Rénovation électrique', value: 'renovation', baseRate: 60 },
        { label: 'Dépannage', value: 'repair', baseRate: 120 },
        { label: 'Mise aux normes', value: 'compliance', baseRate: 70 },
        { label: 'Installation solaire', value: 'solar', baseRate: 150 },
        { label: 'Domotique', value: 'home_automation', baseRate: 100 }
    ];

    installationTypes = [
        { label: 'Standard', value: 'standard', multiplier: 1 },
        { label: 'Haut de gamme', value: 'premium', multiplier: 1.5 },
        { label: 'Industriel', value: 'industrial', multiplier: 2 }
    ];

    calculateEstimate() {
        if (!this.selectedProjectType || !this.surface || !this.rooms) {
            this.estimatedPrice = 0;
            this.basePrice = 0;
            this.optionsPrice = 0;
            return;
        }

        const projectType = this.projectTypes.find(p => p.value === this.selectedProjectType);
        const installationType = this.installationTypes.find(i => i.value === this.selectedInstallationType);

        if (!projectType) return;

        // Calcul de base
        this.basePrice = projectType.baseRate * this.surface;
        
        // Ajustement selon le type d'installation
        if (installationType) {
            this.basePrice *= installationType.multiplier;
        }

        // Ajustement selon le nombre de pièces
        this.basePrice += this.rooms * 150;

        // Calcul des options
        this.optionsPrice = 0;
        if (this.options.led) this.optionsPrice += this.basePrice * 0.15;
        if (this.options.domotique) this.optionsPrice += this.basePrice * 0.25;
        if (this.options.urgence) this.optionsPrice += this.basePrice * 0.30;
        if (this.options.weekend) this.optionsPrice += this.basePrice * 0.20;

        this.estimatedPrice = this.basePrice + this.optionsPrice;
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    getProjectTypeName(): string {
        const type = this.projectTypes.find(p => p.value === this.selectedProjectType);
        return type ? type.label : 'Non sélectionné';
    }

    getInstallationTypeName(): string {
        const type = this.installationTypes.find(i => i.value === this.selectedInstallationType);
        return type ? type.label : 'Non sélectionné';
    }

    resetCalculator() {
        this.selectedProjectType = '';
        this.selectedInstallationType = '';
        this.surface = 0;
        this.rooms = 0;
        this.estimatedPrice = 0;
        this.basePrice = 0;
        this.optionsPrice = 0;
        this.options = {
            led: false,
            domotique: false,
            urgence: false,
            weekend: false
        };
    }
}