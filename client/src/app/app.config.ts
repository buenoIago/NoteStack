import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { authInterceptor } from './interceptors/auth.interceptor.ts';

const routes: Routes = [
  {
    path: '',
      loadComponent: () => import('./home/home').then((c) => c.Home),
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login').then((c) => c.Login),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./login/login').then((c) => c.Login),
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