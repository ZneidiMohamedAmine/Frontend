import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'about-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="about"
            class="flex flex-col items-center py-20 px-6 lg:px-20 bg-surface-0 dark:bg-surface-900"
        >
            <div class="max-w-6xl w-full">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        À <span class="text-yellow-500">Propos</span> de Nous
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Elect Général Hanafi, votre partenaire de confiance depuis plus de 15 ans
                    </p>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                    <!-- Notre Histoire -->
                    <div>
                        <div class="flex items-center mb-6">
                            <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-clock text-2xl text-yellow-600"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Notre Histoire</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Fondée en 2009, Elect Général Hanafi est née de la passion de son fondateur pour l'excellence 
                            dans le domaine électrique. Depuis nos débuts, nous avons grandi pour devenir une référence 
                            dans la région, tout en conservant nos valeurs familiales et notre approche personnalisée.
                        </p>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Notre équipe s'est étoffée au fil des années, rassemblant des experts qualifiés et passionnés, 
                            tous unis par la même vision : offrir des solutions électriques de qualité supérieure.
                        </p>
                    </div>

                    <!-- Notre Mission -->
                    <div>
                        <div class="flex items-center mb-6">
                            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mr-4">
                                <i class="pi pi-flag text-2xl text-blue-600"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Notre Mission</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Notre mission est de fournir des solutions électriques innovantes, sûres et durables, 
                            adaptées aux besoins spécifiques de chaque client. Nous nous engageons à respecter 
                            les plus hauts standards de qualité et de sécurité.
                        </p>
                        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Nous croyons en l'importance de la transition énergétique et accompagnons nos clients 
                            vers des solutions plus écologiques et économiques.
                        </p>
                    </div>
                </div>

                <!-- Nos Valeurs -->
                <div class="mb-16">
                    <h3 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Nos Valeurs</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="bg-yellow-100 dark:bg-yellow-900/30 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <i class="pi pi-shield text-3xl text-yellow-600"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Sécurité</h4>
                            <p class="text-gray-600 dark:text-gray-300">
                                La sécurité est notre priorité absolue dans chaque intervention.
                            </p>
                        </div>

                        <div class="text-center">
                            <div class="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <i class="pi pi-star text-3xl text-blue-600"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Excellence</h4>
                            <p class="text-gray-600 dark:text-gray-300">
                                Nous visons l'excellence dans chaque projet, grand ou petit.
                            </p>
                        </div>

                        <div class="text-center">
                            <div class="bg-green-100 dark:bg-green-900/30 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <i class="pi pi-heart text-3xl text-green-600"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Confiance</h4>
                            <p class="text-gray-600 dark:text-gray-300">
                                Nous construisons des relations durables basées sur la confiance.
                            </p>
                        </div>

                        <div class="text-center">
                            <div class="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                <i class="pi pi-lightbulb text-3xl text-purple-600"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h4>
                            <p class="text-gray-600 dark:text-gray-300">
                                Nous adoptons les dernières technologies pour vous servir.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Notre Équipe -->
                <div class="mb-16">
                    <h3 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Notre Équipe</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="bg-gradient-to-br from-yellow-400 to-orange-500 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <i class="pi pi-user text-5xl text-white"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">M. Hanafi</h4>
                            <p class="text-yellow-600 font-semibold mb-3">Fondateur & Directeur</p>
                            <p class="text-gray-600 dark:text-gray-300">
                                15+ années d'expérience, expert en installations industrielles et résidentielles.
                            </p>
                        </div>

                        <div class="text-center">
                            <div class="bg-gradient-to-br from-blue-400 to-blue-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <i class="pi pi-user text-5xl text-white"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Équipe Technique</h4>
                            <p class="text-blue-600 font-semibold mb-3">Électriciens Qualifiés</p>
                            <p class="text-gray-600 dark:text-gray-300">
                                Une équipe de professionnels certifiés, formés aux dernières normes.
                            </p>
                        </div>

                        <div class="text-center">
                            <div class="bg-gradient-to-br from-green-400 to-green-600 w-32 h-32 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <i class="pi pi-phone text-5xl text-white"></i>
                            </div>
                            <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Support Client</h4>
                            <p class="text-green-600 font-semibold mb-3">Service 24/7</p>
                            <p class="text-gray-600 dark:text-gray-300">
                                Une équipe dédiée pour répondre à vos urgences et questions.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Certifications -->
                <div class="bg-gray-50 dark:bg-surface-800 rounded-2xl p-8 mb-16">
                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Nos Certifications</h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div class="text-center">
                            <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mb-3">
                                <i class="pi pi-verified text-2xl text-yellow-600"></i>
                            </div>
                            <p class="font-semibold text-gray-900 dark:text-white">Qualibat</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg mb-3">
                                <i class="pi pi-shield text-2xl text-blue-600"></i>
                            </div>
                            <p class="font-semibold text-gray-900 dark:text-white">RGE</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg mb-3">
                                <i class="pi pi-check-circle text-2xl text-green-600"></i>
                            </div>
                            <p class="font-semibold text-gray-900 dark:text-white">Consuel</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg mb-3">
                                <i class="pi pi-cog text-2xl text-purple-600"></i>
                            </div>
                            <p class="font-semibold text-gray-900 dark:text-white">ISO 9001</p>
                        </div>
                    </div>
                </div>

                <div class="text-center">
                    <button pButton pRipple [rounded]="true" type="button" label="Nous Contacter" 
                            class="!text-lg !px-10 !py-4 bg-yellow-500 hover:bg-yellow-600 border-yellow-500 !font-bold shadow-lg transform hover:scale-105 transition-all duration-300"></button>
                </div>
            </div>
        </div>
    `
})
export class AboutWidget {}