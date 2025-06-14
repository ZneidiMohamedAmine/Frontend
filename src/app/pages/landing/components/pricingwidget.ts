import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'pricing-widget',
    standalone: true,
    imports: [ButtonModule, InputTextModule, InputTextModule, DropdownModule, RippleModule, FormsModule],
    template: `
        <div id="quote" class="py-6 px-6 lg:px-20 my-2 md:my-6">
            <div class="text-center mb-12">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Demandez Votre Devis</div>
                <span class="text-muted-color text-2xl">Obtenez une estimation gratuite pour votre projet électrique</span>
            </div>

            <div class="grid grid-cols-12 gap-8 mt-20 md:mt-0">
                <!-- Quote Form -->
                <div class="col-span-12 lg:col-span-8">
                    <div class="p-8 bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-600" style="border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1)">
                        <h3 class="text-2xl font-semibold text-surface-900 dark:text-surface-0 mb-6">Informations du Projet</h3>
                        
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Nom complet *</label>
                                <input pInputText type="text" [(ngModel)]="quoteForm.fullName" placeholder="Votre nom complet" 
                                       class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg" />
                            </div>
                            
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Email *</label>
                                <input pInputText type="email" [(ngModel)]="quoteForm.email" placeholder="votre@email.com" 
                                       class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg" />
                            </div>
                            
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Téléphone *</label>
                                <input pInputText type="tel" [(ngModel)]="quoteForm.phone" placeholder="+33 1 23 45 67 89" 
                                       class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg" />
                            </div>
                            
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Type de service *</label>
                                <p-dropdown [options]="serviceTypes" [(ngModel)]="quoteForm.serviceType" 
                                           placeholder="Sélectionnez un service" optionLabel="label" optionValue="value"
                                           class="w-full" />
                            </div>
                            
                            <div class="col-span-12">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Adresse du projet *</label>
                                <input pInputText type="text" [(ngModel)]="quoteForm.address" placeholder="Adresse complète du projet" 
                                       class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg" />
                            </div>
                            
                            <div class="col-span-12">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Description du projet *</label>
                                <textarea pInputTextarea [(ngModel)]="quoteForm.description" rows="4" 
                                         placeholder="Décrivez votre projet en détail (surface, type d'installation, contraintes particulières...)"
                                         class="w-full p-3 border border-surface-300 dark:border-surface-600 rounded-lg resize-none"></textarea>
                            </div>
                            
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Budget estimé</label>
                                <p-dropdown [options]="budgetRanges" [(ngModel)]="quoteForm.budget" 
                                           placeholder="Sélectionnez votre budget" optionLabel="label" optionValue="value"
                                           class="w-full" />
                            </div>
                            
                            <div class="col-span-12 md:col-span-6">
                                <label class="block text-surface-900 dark:text-surface-0 font-medium mb-2">Délai souhaité</label>
                                <p-dropdown [options]="timeframes" [(ngModel)]="quoteForm.timeframe" 
                                           placeholder="Quand souhaitez-vous commencer ?" optionLabel="label" optionValue="value"
                                           class="w-full" />
                            </div>
                            
                            <div class="col-span-12 mt-6">
                                <button pButton pRipple type="button" label="Envoyer ma demande de devis" 
                                        class="w-full md:w-auto !text-lg !px-8 !py-3 bg-blue-600 hover:bg-blue-700 border-blue-600"
                                        (click)="submitQuote()"></button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Contact Info -->
                <div class="col-span-12 lg:col-span-4">
                    <div class="p-8 bg-gradient-to-br from-blue-600 to-green-600 text-white" style="border-radius: 20px">
                        <h3 class="text-2xl font-semibold mb-6">Contactez-nous directement</h3>
                        
                        <div class="space-y-6">
                            <div class="flex items-start">
                                <i class="pi pi-phone text-2xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-semibold">Téléphone</div>
                                    <div class="opacity-90">+33 1 23 45 67 89</div>
                                    <div class="text-sm opacity-75">Lun-Ven: 8h-18h</div>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <i class="pi pi-envelope text-2xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-semibold">Email</div>
                                    <div class="opacity-90">contact&#64;electhanafi.fr</div>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <i class="pi pi-map-marker text-2xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-semibold">Adresse</div>
                                    <div class="opacity-90">123 Avenue de l'Électricité<br>75001 Paris, France</div>
                                </div>
                            </div>
                            
                            <div class="flex items-start">
                                <i class="pi pi-clock text-2xl mr-4 mt-1"></i>
                                <div>
                                    <div class="font-semibold">Urgences 24/7</div>
                                    <div class="opacity-90">+33 6 12 34 56 78</div>
                                    <div class="text-sm opacity-75">Service d'urgence</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="mt-8 p-4 bg-white/10 rounded-lg">
                            <div class="text-sm font-semibold mb-2">Réponse garantie</div>
                            <div class="text-sm opacity-90">Nous vous répondons sous 24h et nous déplaçons gratuitement pour établir votre devis.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class PricingWidget {
    quoteForm = {
        fullName: '',
        email: '',
        phone: '',
        serviceType: '',
        address: '',
        description: '',
        budget: '',
        timeframe: ''
    };

    serviceTypes = [
        { label: 'Installation résidentielle', value: 'residential' },
        { label: 'Électricité industrielle', value: 'industrial' },
        { label: 'Maintenance et dépannage', value: 'maintenance' },
        { label: 'Énergie renouvelable', value: 'renewable' },
        { label: 'Mise aux normes', value: 'compliance' },
        { label: 'Domotique et sécurité', value: 'smart_home' },
        { label: 'Autre', value: 'other' }
    ];

    budgetRanges = [
        { label: 'Moins de 1 000€', value: 'under_1k' },
        { label: '1 000€ - 5 000€', value: '1k_5k' },
        { label: '5 000€ - 15 000€', value: '5k_15k' },
        { label: '15 000€ - 50 000€', value: '15k_50k' },
        { label: 'Plus de 50 000€', value: 'over_50k' }
    ];

    timeframes = [
        { label: 'Dès que possible', value: 'asap' },
        { label: 'Dans le mois', value: 'within_month' },
        { label: 'Dans les 3 mois', value: 'within_3months' },
        { label: 'Dans les 6 mois', value: 'within_6months' },
        { label: 'Pas pressé', value: 'flexible' }
    ];

    submitQuote() {
        console.log('Quote form submitted:', this.quoteForm);
        // Here you would typically send the form data to your backend
        alert('Votre demande de devis a été envoyée avec succès ! Nous vous contacterons sous 24h.');
    }
}