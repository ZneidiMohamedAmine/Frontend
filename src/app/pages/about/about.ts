import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarWidget } from '../landing/components/topbarwidget.component';
import { AboutWidget } from '../landing/components/aboutwidget';
import { FooterWidget } from '../landing/components/footerwidget';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [RouterModule, TopbarWidget, AboutWidget, FooterWidget],
    template: `
        <div class="bg-surface-0 dark:bg-surface-900">
            <div class="landing-wrapper overflow-hidden relative">
                <topbar-widget class="py-6 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between absolute top-0 left-0 right-0 z-10 bg-gray-900 shadow-lg" />
                <div class="pt-24">
                    <about-widget />
                </div>
                <footer-widget />
            </div>
        </div>
    `
})
export class About {}