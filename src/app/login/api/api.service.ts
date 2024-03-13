import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async loginUser(formulario: any): Promise<any> {
    try {
      const response = await this.http
        .post<any>(
          import.meta.env.NG_APP_API + '/auth/login',
          formulario
        )
        .toPromise();
      
      return response; // Devuelve la respuesta correctamente
    } catch (error: any) {
      throw error.error; // Lanza el error para que sea manejado en el componente
    }
  }
}
