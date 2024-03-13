import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../../../api/api-service.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: any = [];

  constructor(private apiService: ApiServiceService, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Llamada a la función para consultar la API cuando el componente se inicializa
    this.consultarAPI();
  }

  // Método para realizar la consulta a la API cuando sea necesario
  public consultarAPI(): void {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Puedes añadir más encabezados si es necesario
    });
    const url = import.meta.env.NG_APP_API + '/productos'; // URL de la API
    this.apiService.consultarAPI(headers, url).subscribe(
      (response) => {
        this.productos = response;
        console.log(response); // Manejar la respuesta de la API según sea necesario
      },
      (error) => {
        console.log(error); // Manejar el error si la consulta falla
      }
    );
  }
}
