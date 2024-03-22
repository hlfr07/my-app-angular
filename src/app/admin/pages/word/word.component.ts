import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WordService } from './word.service';

@Component({
  selector: 'app-word',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './word.component.html',
  styleUrl: './word.component.css'
})
export class WordComponent {

  formularioword: FormGroup;

  constructor(private wordService: WordService) {
    this.formularioword = new FormGroup({
    });
  }

  async onSubmit(e: any) {
    const formData = new FormData(e.target);
    const data = { nombre: formData.get("Nombres"), apellido: formData.get("Apellidos"), correo: formData.get("Correo") };
    const srcplantilla = 'assets/plantilla.docx'; // Aquí debes tener la ruta correcta del archivo de plantilla

    this.wordService.generateWord(data, srcplantilla);

  }

}
