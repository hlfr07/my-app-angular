import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WordService } from './word.service';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { AuthServiceService } from '../../../auth/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from '../../../api/api-service.service';


@Component({
  selector: 'app-word',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css'
})
export class WordComponent {
  //variables para el pdf
  nombre: string = '';
  apellidos: string = '';
  gmail: string = '';
  formularioword: FormGroup;
  perfiles: any = [];

  constructor(private wordService: WordService, private authService: AuthServiceService, private cookieService: CookieService, private apiService: ApiServiceService) {
    this.formularioword = new FormGroup({
    });
  }

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

  async onSubmit(e: any) {
    const formData = new FormData(e.target);
    this.nombre = formData.get("Nombres") as string;
    this.apellidos = formData.get("Apellidos") as string;
    this.gmail = formData.get("Correo") as string;
    const data = { nombre: formData.get("Nombres"), apellido: formData.get("Apellidos"), correo: formData.get("Correo") };
    const srcplantilla = 'assets/plantilla.docx'; // Aquí debes tener la ruta correcta del archivo de plantilla


    this.wordService.generateWord(data, srcplantilla);
    console.log(this.perfiles);

  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('contentToConvert');
    const doc = new jsPDF.jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    if (DATA) {
      html2canvas.default(DATA, options).then((canvas) => {

        const img = canvas.toDataURL('../../../../assets/imgplanti.png');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, 'FAST');
        return doc;
      }).then((docResult) => {
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
      this.estadopdf = !this.estadopdf;
    }
    else {
      console.error('No se encontró ningún elemento con el ID "htmlData"');
    }
  }

  estadopdf: boolean = false;
  verpdf: boolean = false;

  verplantilla() {
    this.estadopdf = !this.estadopdf;
    setTimeout(() => {
      this.downloadPDF();
    }, 500);
  }

  visualizarpdf() {
    this.verpdf =!this.verpdf;
  }

  
}