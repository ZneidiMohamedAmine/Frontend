import { Component } from '@angular/core';

@Component({
    selector: 'highlights-widget',
    template: `
        <div id="highlights" class="py-6 px-6 lg:px-20 mx-0 my-12 lg:mx-20">
            <div class="text-center">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Pourquoi Nous Choisir</div>
                <span class="text-muted-color text-2xl">Excellence, fiabilité et innovation dans chaque projet</span>
            </div>

            <!-- Key Performance Indicators -->
            <div class="grid grid-cols-12 gap-6 mt-16 mb-20">
                <div class="col-span-12 md:col-span-3 text-center">
                    <div class="bg-blue-100 dark:bg-blue-900 p-6 rounded-xl">
                        <div class="text-4xl font-bold text-blue-600 mb-2">98%</div>
                        <div class="text-surface-700 dark:text-surface-300">Taux de Satisfaction Client</div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-3 text-center">
                    <div class="bg-green-100 dark:bg-green-900 p-6 rounded-xl">
                        <div class="text-4xl font-bold text-green-600 mb-2">500+</div>
                        <div class="text-surface-700 dark:text-surface-300">Projets Réalisés</div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-3 text-center">
                    <div class="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-xl">
                        <div class="text-4xl font-bold text-yellow-600 mb-2">24h</div>
                        <div class="text-surface-700 dark:text-surface-300">Temps de Réponse Moyen</div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-3 text-center">
                    <div class="bg-purple-100 dark:bg-purple-900 p-6 rounded-xl">
                        <div class="text-4xl font-bold text-purple-600 mb-2">15+</div>
                        <div class="text-surface-700 dark:text-surface-300">Années d'Expérience</div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-4 mt-20 pb-2 md:pb-20">
                <div class="flex justify-center col-span-12 lg:col-span-6 bg-blue-50 dark:bg-blue-900/20 p-8 order-1 lg:order-none" style="border-radius: 20px">
                    <div class="text-center">
                        <div class="mb-6">
                            <i class="pi pi-shield text-6xl text-blue-600"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-surface-900 dark:text-surface-0 mb-4">Certifications & Garanties</h3>
                        <div class="space-y-3 text-surface-700 dark:text-surface-300">
                            <div class="flex items-center justify-center">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Certification Qualibat</span>
                            </div>
                            <div class="flex items-center justify-center">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Norme NF C 15-100</span>
                            </div>
                            <div class="flex items-center justify-center">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Assurance décennale</span>
                            </div>
                            <div class="flex items-center justify-center">
                                <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Garantie 10 ans</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-12 lg:col-span-6 my-auto flex flex-col lg:items-end text-center lg:text-right gap-4">
                    <div class="flex items-center justify-center bg-blue-200 self-center lg:self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                        <i class="pi pi-fw pi-verified !text-4xl text-blue-700"></i>
                    </div>
                    <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Qualité Certifiée</div>
                    <span class="text-surface-700 dark:text-surface-100 text-2xl leading-normal ml-0 md:ml-2" style="max-width: 650px">
                        Nos électriciens certifiés respectent les normes les plus strictes. Chaque installation est contrôlée et garantie pour votre sécurité et votre tranquillité d'esprit.
                    </span>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-4 my-20 pt-2 md:pt-20">
                <div class="col-span-12 lg:col-span-6 my-auto flex flex-col text-center lg:text-left lg:items-start gap-4">
                    <div class="flex items-center justify-center bg-green-200 self-center lg:self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                        <i class="pi pi-fw pi-clock !text-3xl text-green-700"></i>
                    </div>
                    <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Service 24/7</div>
                    <span class="text-surface-700 dark:text-surface-100 text-2xl leading-normal mr-0 md:mr-2" style="max-width: 650px">
                        Urgence électrique ? Notre équipe d'intervention est disponible 24h/24 et 7j/7 pour résoudre vos problèmes électriques en urgence. Intervention rapide garantie.
                    </span>
                </div>

                <div class="flex justify-end order-1 sm:order-2 col-span-12 lg:col-span-6 bg-green-50 dark:bg-green-900/20 p-8" style="border-radius: 20px">
                    <div class="text-center">
                        <div class="mb-6">
                            <i class="pi pi-phone text-6xl text-green-600"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-surface-900 dark:text-surface-0 mb-4">Urgences Électriques</h3>
                        <div class="text-3xl font-bold text-green-600 mb-2">+33 6 12 34 56 78</div>
                        <div class="text-surface-700 dark:text-surface-300 mb-4">Ligne d'urgence 24/7</div>
                        <div class="space-y-2 text-surface-700 dark:text-surface-300">
                            <div>• Panne électrique totale</div>
                            <div>• Court-circuit dangereux</div>
                            <div>• Problème de tableau électrique</div>
                            <div>• Odeur de brûlé</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Process Steps -->
            <div class="mt-20">
                <div class="text-center mb-12">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-3xl">Notre Processus</div>
                    <span class="text-muted-color text-xl">De la demande de devis à la réalisation</span>
                </div>
                
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-12 md:col-span-3 text-center">
                        <div class="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                        <h4 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">Demande de Devis</h4>
                        <p class="text-surface-700 dark:text-surface-300">Contactez-nous pour une estimation gratuite de votre projet</p>
                    </div>
                    <div class="col-span-12 md:col-span-3 text-center">
                        <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                        <h4 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">Visite Technique</h4>
                        <p class="text-surface-700 dark:text-surface-300">Déplacement gratuit pour évaluer vos besoins sur site</p>
                    </div>
                    <div class="col-span-12 md:col-span-3 text-center">
                        <div class="bg-yellow-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                        <h4 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">Devis Détaillé</h4>
                        <p class="text-surface-700 dark:text-surface-300">Proposition détaillée avec prix transparent et délais</p>
                    </div>
                    <div class="col-span-12 md:col-span-3 text-center">
                        <div class="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                        <h4 class="text-xl font-semibold text-surface-900 dark:text-surface-0 mb-2">Réalisation</h4>
                        <p class="text-surface-700 dark:text-surface-300">Exécution professionnelle avec suivi et garantie</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HighlightsWidget {}