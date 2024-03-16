import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../../../api/api-service.service';
import { AuthServiceService } from '../../../auth/auth-service.service';
import { PlaceholderComponent } from '../../components/placeholder/placeholder.component';
import { ModalpostuserComponent } from './modalpostuser/modalpostuser.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [PlaceholderComponent, ModalpostuserComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: any = [];

  constructor(private apiService: ApiServiceService, private cookieService: CookieService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    // Verifica si el token ha expirado antes de realizar la consulta a la API
    if (this.authService.decodeToken() !== null) {
      // Llamada a la función para consultar la API cuando el componente se inicializa
      this.consultarAPI();
    }
    else {
      window.location.href = '/login';
    }
  }

  // Método para realizar la consulta a la API cuando sea necesario
  public consultarAPI(): void {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Puedes añadir más encabezados si es necesario
    });
    const url = import.meta.env.NG_APP_API + '/usuarios'; // URL de la API
    this.apiService.consultarAPI(headers, url).subscribe(
      (response) => {
        this.usuarios = response;
        console.log(response); // Manejar la respuesta de la API según sea necesario
      },
      (error) => {
        console.log(error); // Manejar el error si la consulta falla
      }
    );
  }
  modalpost: boolean = false;

  postForm(show: boolean) {
    this.modalpost = show;
  }

  
}
