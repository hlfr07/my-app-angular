import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../../../../api/api-service.service';
import { AuthServiceService } from '../../../../auth/auth-service.service';


@Component({
  selector: 'app-modalpostuser',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modalpostuser.component.html',
  styleUrl: './modalpostuser.component.css'
})
export class ModalpostuserComponent {
  imageUrl: string | ArrayBuffer | null = null;
  showPassword: boolean = false;
  perfiles: any = [];
  //initialize para consultar api perfiles
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
    const url = import.meta.env.NG_APP_API + '/perfiles'; // URL de la API
    this.apiService.consultarAPI(headers, url).subscribe(
      (response) => {
        this.perfiles = response;
        console.log(response); // Manejar la respuesta de la API según sea necesario
      },
      (error) => {
        console.log(error); // Manejar el error si la consulta falla
      }
    );
  }

  //-------------------------------------------------------------------------------------

  @Output() addshowModalEvent = new EventEmitter<boolean>();

  //creamos un metodo para output
  showmodalclose() {
    this.addshowModalEvent.emit();
  }
  //-------------------------------------------------------------------------------------
  formulario: FormGroup;

  constructor(private apiService: ApiServiceService,
    private cookieService: CookieService, private authService: AuthServiceService) {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      password2: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
    });
  }
  //------------------------------------------------------
  getErrorMessage(controlName: string): string {
    const control = this.formulario.get(controlName);
    if (control?.hasError('minlength')) {
      return `Debe tener al menos 4 caracteres.`;
    }
    if (control?.hasError('maxlength')) {
      return `Debe tener al menos 16 caracteres.`;
    }
    return '';
  }
  //----------------------------------------------------------------
  errorEnSolicitud: string = '';
  errorEnSolicitud2: string = '';
  errorEnSolicitud3: string = '';

  onSubmitlogin(e: any) {
    const formData = new FormData(e.target);
    const imagen = formData.get("imagen");
    const idperfil = formData.get("idperfil");
    const password = this.formulario?.get('password')?.value;
    const password1 = this.formulario?.get('password2')?.value;
    this.errorEnSolicitud = "";
    this.errorEnSolicitud2 = "";
    this.errorEnSolicitud3 = "";
    if (idperfil !== "") {
      if (imagen instanceof File && imagen.size > 0) {
        if (password === password1) {
          if (this.authService.decodeToken() !== null) {
            if (this.formulario.valid) {
              const token = this.cookieService.get('token');
              const headers = new HttpHeaders({
                Authorization: `Bearer ${token}`, // Puedes añadir más encabezados si es necesario
              });
              const url = import.meta.env.NG_APP_API + '/usuarios';
              this.apiService.enviarDatos(headers, url, formData).subscribe(
                (response) => {
                  console.log(response); // Manejar la respuesta de la API según sea necesario
                  window.location.reload();
                },
                (error) => {
                  console.log(error);
                  if (error.statusCode === 400) {
                    console.log(error.message[0]);
                  } else if (error.statusCode === 401) {
                    console.log(error.message);
                  } else {
                    console.log('Error en el servidor');
                  } // Manejar el error si la consulta falla
                }
              );
            } else {
              console.log('Formulario inválido');
              // Puedes agregar manejo de errores o mensajes de validación aquí
            }
          }
          else {
            window.location.href = '/login';
          }
        }
        else {
          this.errorEnSolicitud3 = "No hay coicidencia en password"
        }

      }
      else {
        this.errorEnSolicitud = "Suba una imagen!"
      }
    } else {
      this.errorEnSolicitud2 = "Elija un perfil!"
    }
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // Asignamos la URL de la imagen al atributo imageUrl
      };
      reader.readAsDataURL(file); // Convertimos el archivo a una URL de datos
    }
  }

  verpassword() {
    this.showPassword = !this.showPassword;
  }
}
