import { Injectable } from '@angular/core';
import Docxtemplater from 'docxtemplater';
import * as fs from 'file-saver';
import PizZip from 'pizzip';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  generateWord(data: any, srcplantilla: string): void {
    const templatePath = srcplantilla; // Ruta a tu plantilla Word

    // Leer el contenido de la plantilla
    const xhr = new XMLHttpRequest();
    xhr.open('GET', templatePath);
    xhr.responseType = 'arraybuffer'; // Establecer el tipo de respuesta como arraybuffer

    xhr.onload = () => {
      const templateData = new Uint8Array(xhr.response);
      const zip = new PizZip(templateData);
      const doc = new Docxtemplater();
      doc.loadZip(zip);

      // Asignar los datos al documento
      doc.setData(data);

      try {
        // Renderizar el documento
        doc.render();
      } catch (error) {
        console.error('Error al renderizar el documento:', error);
      }

      // Generar el archivo
      const generatedDoc = doc.getZip().generate({ type: 'blob' });

      // Descargar el archivo
      fs.saveAs(generatedDoc, 'documento.docx');
    };

    xhr.onerror = () => {
      console.error('Error al cargar la plantilla');
    };

    xhr.send();
  }
}
