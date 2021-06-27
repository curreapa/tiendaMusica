import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  userSesion = "";
  productosPorPagar:any [] = [];
  datosDeEnvio:any [] = [];
}

