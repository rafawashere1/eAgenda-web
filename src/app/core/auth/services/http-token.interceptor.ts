import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { localStorageService } from "./local-storage.service";

export const httpTokenInterception: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const token = inject(localStorageService).obterDadosLocaisSalvos()?.chave;

  const requestModificada = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(requestModificada);
}