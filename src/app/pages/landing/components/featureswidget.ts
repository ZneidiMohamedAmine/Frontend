import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'features-widget',
    standalone: true,
    imports: [CommonModule],
    template: ` <div id="services" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
        <div class="grid grid-cols-12 gap-4 justify-center">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Nos Services Électriques</div>
                <span class="text-muted-color text-2xl">Solutions complètes pour tous vos besoins électriques</span>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 180px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-blue-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-home !text-2xl text-blue-700"></i>
                        </div>
                        <h5 class="mb-2 text-surface-900 dark:text-surface-0">Installation Résidentielle</h5>
                        <span class="text-surface-600 dark:text-surface-200">Câblage, tableaux électriques, prises et éclairage pour votre domicile.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 180px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-yellow-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-building !text-2xl text-yellow-700"></i>
                        </div>
                        <h5 class="mb-2 text-surface-900 dark:text-surface-0">Électricité Industrielle</h5>
                        <span class="text-surface-600 dark:text-surface-200">Installations haute tension, automatisation et maintenance industrielle.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 180px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(16, 185, 129, 0.2), rgba(59, 130, 246, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-green-200" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-cog !text-2xl text-green-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Maintenance & Dépannage</div>
                        <span class="text-surface-600 dark:text-surface-200">Service 24/7 pour tous vos problèmes électriques urgents.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 180px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(139, 69, 19, 0.2), rgba(34, 197, 94, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-green-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-sun !text-2xl text-green-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Énergie Renouvelable</div>
                        <span class="text-surface-600 dark:text-surface-200">Installation de panneaux solaires et solutions écologiques.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 180px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-purple-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-shield !text-2xl text-purple-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Mise aux Normes</div>
                        <span class="text-surface-600 dark:text-surface-200">Conformité aux normes NF C 15-100 et certifications.</span>
                    </div>
                </div>
            </div>

            <div class="col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pb-8 mt-6 lg:mt-0">
                <div style="height: 180px; padding: 2px; border-radius: 10px; background: linear-gradient(90deg, rgba(245, 101, 101, 0.2), rgba(59, 130, 246, 0.2))">
                    <div class="p-4 bg-surface-0 dark:bg-surface-900 h-full" style="border-radius: 8px">
                        <div class="flex items-center justify-center bg-red-200 mb-4" style="width: 3.5rem; height: 3.5rem; border-radius: 10px">
                            <i class="pi pi-fw pi-eye !text-2xl text-red-700"></i>
                        </div>
                        <div class="mt-6 mb-1 text-surface-900 dark:text-surface-0 text-xl font-semibold">Domotique & Sécurité</div>
                        <span class="text-surface-600 dark:text-surface-200">Systèmes intelligents, alarmes et vidéosurveillance.</span>
                    </div>
                </div>
            </div>

            <div
                class="col-span-12 mt-20 mb-20 p-2 md:p-20"
                style="border-radius: 20px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))"
            >
                <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                    <div class="text-gray-900 mb-2 text-3xl font-semibold">Ahmed Benali</div>
                    <span class="text-gray-600 text-2xl">Directeur Technique - Industrie Moderne SA</span>
                    <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">
                        "Elect Général Hanafi a réalisé l'installation électrique complète de notre nouvelle usine. Travail professionnel, respect des délais et excellent suivi. Je recommande vivement leurs services."
                    </p>
                    <div class="flex items-center mt-6">
                        <i class="pi pi-star-fill text-yellow-500 text-xl mr-1"></i>
                        <i class="pi pi-star-fill text-yellow-500 text-xl mr-1"></i>
                        <i class="pi pi-star-fill text-yellow-500 text-xl mr-1"></i>
                        <i class="pi pi-star-fill text-yellow-500 text-xl mr-1"></i>
                        <i class="pi pi-star-fill text-yellow-500 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class FeaturesWidget {}