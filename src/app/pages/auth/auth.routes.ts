import { Routes } from '@angular/router';
import { Access } from './access';
import { Login } from './login';
import { Register } from './register';
import { ForgotPassword } from './forgot-password';
import { ChangePassword } from './change-password';
import { EmailVerification } from './email-verification';
import { Error } from './error';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'change-password', component: ChangePassword },
    { path: 'verify-email', component: EmailVerification },
    { path: 'verify-email/:token', component: EmailVerification },
    { path: 'email-verification', component: EmailVerification }
] as Routes;
