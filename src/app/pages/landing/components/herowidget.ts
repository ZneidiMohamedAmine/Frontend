import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'hero-widget',
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="hero"
            class="flex flex-col lg:flex-row items-center pt-24 px-6 lg:px-20 overflow-hidden min-h-[700px] relative"
            style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('picture/panneaux-solaires-photovoltaiques.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
        >
            <div class="flex-1 mx-6 md:mx-20 mt-0 md:mt-6">
                <div class="flex items-center mb-4">
                    <i class="pi pi-bolt text-4xl text-yellow-500 mr-3"></i>
                    <span class="text-xl font-semibold text-white">Elect Général Hanafi</span>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                    <span class="text-yellow-400">Solutions Électriques</span>
                    <span class="font-light block">Professionnelles</span>
                </h1>
                <p class="font-normal text-xl leading-relaxed md:mt-4 text-gray-100 mb-8">
                    Installations électriques, maintenance industrielle et solutions énergétiques sur mesure. 
                    Votre partenaire de confiance pour tous vos projets électriques.
                </p>
                
                <div class="flex justify-center sm:justify-start mb-8">
                    <div class="relative">
                        <!-- Glowing background effect -->
                        <div class="absolute inset-0 bg-yellow-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
                        <!-- Main button -->
                        <button pButton pRipple [rounded]="true" type="button" label="⚡ Demander un Devis Gratuit ⚡" 
                                class="relative !text-2xl !px-16 !py-6 !font-black shadow-2xl transform hover:scale-110 transition-all duration-500 ease-out hover:shadow-yellow-500/50 border-2 border-yellow-400 bg-yellow-500 hover:bg-yellow-600 text-black uppercase tracking-wide"></button>
                        <!-- Animated border -->
                        <div class="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping opacity-20"></div>
                    </div>
                </div>
                
                <!-- Secondary CTA -->
                <div class="flex justify-center sm:justify-start mb-6">
                    <p class="text-yellow-300 text-lg font-semibold animate-bounce">
                        📞 Devis en 24h • Intervention Rapide • Garantie 5 ans
                    </p>
                </div>
                
                <!-- Key Stats -->
                <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-300">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-blue-400">500+</div>
                        <div class="text-sm text-gray-200">Projets Réalisés</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-green-400">15+</div>
                        <div class="text-sm text-gray-200">Années d'Expérience</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-yellow-400">24/7</div>
                        <div class="text-sm text-gray-200">Support Technique</div>
                    </div>
                </div>
            </div>
            
            <div class="flex-1 flex justify-center lg:justify-center mt-8 lg:mt-0">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full blur-3xl opacity-20 scale-110"></div>
                    <!-- Border container -->
                    <div class="relative w-96 h-96 md:w-[450px] md:h-[450px] rounded-full border-4 border-white/50 shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
                        <img src="picture/photooo-modified.png" 
                             alt="Électricien professionnel travaillant sur une installation électrique moderne" 
                             class="w-full h-full object-cover object-center rounded-full" />
                    </div>
                    <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-500/10 to-yellow-600/10 hover:from-yellow-500/20 hover:to-yellow-600/20 transition-all duration-300"></div>
                    
                    <!-- Floating Icons -->
                    <div class="absolute -top-4 -right-4 bg-yellow-500 text-black p-3 rounded-full shadow-lg animate-bounce">
                        <i class="pi pi-bolt text-xl"></i>
                    </div>
                    <div class="absolute -bottom-4 -left-4 bg-yellow-600 text-black p-3 rounded-full shadow-lg animate-pulse">
                        <i class="pi pi-cog text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HeroWidget {}