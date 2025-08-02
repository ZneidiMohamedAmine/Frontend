import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'user-profile', loadComponent: () => import('../user-profile/user-profile.component').then(m => m.UserProfileComponent) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
