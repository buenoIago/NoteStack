import { HttpInterceptorFn } from '@angular/common/http';
import { obterAccessToken } from './auth.tokens';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = obterAccessToken();

  if (!accessToken) {
    return next(req);
  }

  const requisicaoAutenticada = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(requisicaoAutenticada);
};