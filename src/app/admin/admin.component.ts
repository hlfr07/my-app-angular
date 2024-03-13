import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  showSidebar: boolean = true; // Puedes inicializarlo como true o false según tus necesidades

  constructor() {
    this.checkScreenSize(); // Llamar al método para establecer el estado inicial de showSidebar
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(); // Llamar al método cuando cambie el tamaño de la pantalla
  }

  private checkScreenSize() {
    this.showSidebar = window.innerWidth >= 640; // Cambiar a true si el ancho es mayor o igual a 640px
  }
}
