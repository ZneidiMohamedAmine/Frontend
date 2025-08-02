import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { AdminDashboard } from './app/pages/admin/admin-dashboard';
import { AdminUsers } from './app/pages/admin/users/admin-users';
import { AdminProjects } from './app/pages/admin/projects/admin-projects';
import { AdminTransactions } from './app/pages/admin/transactions/admin-transactions';
import { AdminDevis } from './app/pages/admin/devis/admin-devis';
import { AdminKPIs } from './app/pages/admin/kpis/admin-kpis';
import { AdminReports } from './app/pages/admin/reports/admin-reports';
import { TestAdmin } from './app/pages/test-admin/test-admin';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Services } from './app/pages/services/services';
import { Portfolio } from './app/pages/portfolio/portfolio';
import { About } from './app/pages/about/about';
import { Calculator } from './app/pages/calculator/calculator';
import { Notfound } from './app/pages/notfound/notfound';
import { AdminGuard } from './app/guards/admin.guard';
import { UserProfileComponent } from './app/user-profile/user-profile.component';

export const appRoutes: Routes = [
    {
        path: 'admin',
        component: AppLayout,
        canActivate: [AdminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboard },
            { path: 'users', component: AdminUsers },
            { path: 'projects', component: AdminProjects },
            { path: 'transactions', component: AdminTransactions },
            { path: 'devis', component: AdminDevis },
            { path: 'kpis', component: AdminKPIs },
            { path: 'reports', component: AdminReports },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: '', component: Landing },
    { path: 'services', component: Services },
    { path: 'portfolio', component: Portfolio },
    { path: 'about', component: About },
    { path: 'calculator', component: Calculator },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'test-admin', component: TestAdmin },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];