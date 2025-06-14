import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'portfolio-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="portfolio"
            class="flex flex-col items-center py-20 px-6 lg:px-20 bg-gray-50 dark:bg-surface-800"
        >
            <div class="max-w-6xl w-full">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Nos <span class="text-yellow-500">Réalisations</span>
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Découvrez quelques-uns de nos projets récents et notre expertise en action
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <!-- Projet 1 -->
                    <div class="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                            <i class="pi pi-building text-6xl text-white opacity-80"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Centre Commercial Moderne</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Installation électrique complète d'un centre commercial de 5000m² avec éclairage LED et système de sécurité.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">Installation</span>
                                <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">LED</span>
                                <span class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">Sécurité</span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                <i class="pi pi-calendar mr-2"></i>Terminé en Mars 2024
                            </div>
                        </div>
                    </div>

                    <!-- Projet 2 -->
                    <div class="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                            <i class="pi pi-sun text-6xl text-white opacity-80"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Installation Solaire Résidentielle</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Système photovoltaïque 9kWc avec stockage batterie pour une maison familiale autonome.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">Solaire</span>
                                <span class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">Batterie</span>
                                <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">Autonomie</span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                <i class="pi pi-calendar mr-2"></i>Terminé en Février 2024
                            </div>
                        </div>
                    </div>

                    <!-- Projet 3 -->
                    <div class="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                            <i class="pi pi-cog text-6xl text-white opacity-80"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Usine Agroalimentaire</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Maintenance et modernisation du système électrique d'une usine avec automatisation.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">Industriel</span>
                                <span class="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm">Automatisation</span>
                                <span class="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm">Maintenance</span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                <i class="pi pi-calendar mr-2"></i>Terminé en Janvier 2024
                            </div>
                        </div>
                    </div>

                    <!-- Projet 4 -->
                    <div class="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                            <i class="pi pi-home text-6xl text-white opacity-80"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Maison Connectée</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Installation domotique complète avec contrôle intelligent de l'éclairage et des volets.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-3 py-1 rounded-full text-sm">Domotique</span>
                                <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">Connecté</span>
                                <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">Économie</span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                <i class="pi pi-calendar mr-2"></i>Terminé en Décembre 2023
                            </div>
                        </div>
                    </div>

                    <!-- Projet 5 -->
                    <div class="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                            <i class="pi pi-wrench text-6xl text-white opacity-80"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Dépannage d'Urgence</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Intervention rapide pour rétablir l'électricité dans un hôpital suite à une panne majeure.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm">Urgence</span>
                                <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">24/7</span>
                                <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">Critique</span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                <i class="pi pi-calendar mr-2"></i>Terminé en Novembre 2023
                            </div>
                        </div>
                    </div>

                    <!-- Projet 6 -->
                    <div class="bg-white dark:bg-surface-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                            <i class="pi pi-verified text-6xl text-white opacity-80"></i>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Mise aux Normes</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-4">
                                Rénovation électrique complète d'un immeuble de bureaux avec certification Consuel.
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">Normes</span>
                                <span class="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">Consuel</span>
                                <span class="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm">Rénovation</span>
                            </div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                <i class="pi pi-calendar mr-2"></i>Terminé en Octobre 2023
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Section -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div class="text-center">
                        <div class="text-4xl font-bold text-yellow-500 mb-2">500+</div>
                        <div class="text-gray-600 dark:text-gray-300">Projets Réalisés</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-blue-500 mb-2">15+</div>
                        <div class="text-gray-600 dark:text-gray-300">Années d'Expérience</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-green-500 mb-2">100%</div>
                        <div class="text-gray-600 dark:text-gray-300">Clients Satisfaits</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-purple-500 mb-2">24/7</div>
                        <div class="text-gray-600 dark:text-gray-300">Support Disponible</div>
                    </div>
                </div>

                <div class="text-center">
                    <button pButton pRipple [rounded]="true" type="button" label="Voir Plus de Projets" 
                            class="!text-lg !px-10 !py-4 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 !font-bold shadow-lg transform hover:scale-105 transition-all duration-300"></button>
                </div>
            </div>
        </div>
    `
})
export class PortfolioWidget {}