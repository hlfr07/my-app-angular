import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showSidebar: boolean = false; // Puedes inicializarlo como true o false según tus necesidades
  constructor() {
    this.checkScreenSize(); // Llamar al método para establecer el estado inicial de showSidebar
  }
  ngOnInit(): void {
    // Llamada a la función para consultar la API cuando el componente se inicializa
    this.showSidebar = !this.showSidebar
    this.addshowSidebarEvent.emit(this.showSidebar);
    this.checkScreenSize();
  }
  //se declara para enviar iformacion al padre, se tiene que indicar que tipo de variable le vamos a pasar
  @Output() addshowSidebarEvent = new EventEmitter<boolean>();

  //creamos un metodo para output
  show() {
    this.showSidebar = !this.showSidebar
    this.addshowSidebarEvent.emit(this.showSidebar);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize(); // Llamar al método cuando cambie el tamaño de la pantalla
  }

  private checkScreenSize() {
    if (window.innerWidth >= 640) {
      this.show()
    }
  }
}
