import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { authInterceptor } from './Auth/auth.interceptor';

const routes: Routes = [
  {
    path: '',
      loadComponent: () => import('./home/home').then((c) => c.Home),
  },

  {
    path: 'login',
    loadComponent: () => import('./Auth/login/login').then((c) => c.Login),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./Auth/login/login').then((c) => c.Login),
  }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};