import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'services-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="services"
            class="flex flex-col items-center py-20 px-6 lg:px-20 bg-surface-0 dark:bg-surface-900"
        >
            <div class="max-w-6xl w-full">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Nos <span class="text-yellow-500">Services</span>
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Solutions électriques complètes pour particuliers et professionnels
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Installation Électrique -->
                    <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-700">
                        <div class="flex items-center mb-6">
                            <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-bolt text-2xl text-yellow-600"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Installation Électrique</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            Installation complète de systèmes électriques résidentiels et commerciaux selon les normes en vigueur.
                        </p>
                        <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>• Tableaux électriques</li>
                            <li>• Prises et interrupteurs</li>
                            <li>• Éclairage LED</li>
                            <li>• Mise aux normes</li>
                        </ul>
                    </div>

                    <!-- Maintenance Industrielle -->
                    <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-700">
                        <div class="flex items-center mb-6">
                            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-cog text-2xl text-blue-600"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Maintenance Industrielle</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            Maintenance préventive et corrective d'équipements électriques industriels.
                        </p>
                        <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>• Moteurs électriques</li>
                            <li>• Armoires de commande</li>
                            <li>• Systèmes automatisés</li>
                            <li>• Dépannage 24/7</li>
                        </ul>
                    </div>

                    <!-- Panneaux Solaires -->
                    <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-700">
                        <div class="flex items-center mb-6">
                            <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-sun text-2xl text-green-600"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Panneaux Solaires</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            Installation et maintenance de systèmes photovoltaïques pour l'autonomie énergétique.
                        </p>
                        <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>• Étude de faisabilité</li>
                            <li>• Installation complète</li>
                            <li>• Raccordement réseau</li>
                            <li>• Suivi de production</li>
                        </ul>
                    </div>

                    <!-- Domotique -->
                    <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-700">
                        <div class="flex items-center mb-6">
                            <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-home text-2xl text-purple-600"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Domotique</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            Solutions intelligentes pour automatiser et contrôler votre habitat.
                        </p>
                        <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>• Éclairage intelligent</li>
                            <li>• Contrôle à distance</li>
                            <li>• Sécurité connectée</li>
                            <li>• Économies d'énergie</li>
                        </ul>
                    </div>

                    <!-- Dépannage -->
                    <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-700">
                        <div class="flex items-center mb-6">
                            <div class="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-wrench text-2xl text-red-600"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Dépannage Urgent</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            Intervention rapide pour tous vos problèmes électriques, 24h/24 et 7j/7.
                        </p>
                        <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>• Panne électrique</li>
                            <li>• Court-circuit</li>
                            <li>• Disjoncteur défaillant</li>
                            <li>• Urgence 24/7</li>
                        </ul>
                    </div>

                    <!-- Certification -->
                    <div class="bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-surface-700">
                        <div class="flex items-center mb-6">
                            <div class="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-verified text-2xl text-orange-600"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Certification</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6">
                            Contrôles et certifications électriques pour la conformité de vos installations.
                        </p>
                        <ul class="text-sm text-gray-500 dark:text-gray-400 space-y-2">
                            <li>• Consuel</li>
                            <li>• Diagnostic électrique</li>
                            <li>• Mise en conformité</li>
                            <li>• Attestations</li>
                        </ul>
                    </div>
                </div>

                <div class="text-center mt-16">
                    <button pButton pRipple [rounded]="true" type="button" label="Demander un Devis Gratuit" 
                            class="!text-lg !px-10 !py-4 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 !font-bold shadow-lg transform hover:scale-105 transition-all duration-300"></button>
                </div>
            </div>
        </div>
    `
})
export class ServicesWidget {}