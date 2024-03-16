import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showSidebar: boolean = false; // Puedes inicializarlo como true o false según tus necesidades
  constructor(private elementRef: ElementRef, private cookieService: CookieService) {
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

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // Llamar a la función showSettings() cuando se hace clic fuera del elemento
      if (this.settings === false) { this.showSettings(); }

    }
  }

  settings: boolean = true;

  showSettings() {
    this.settings = !this.settings;
  }

  cerrarsesion() {
    this.cookieService.deleteAll();
    window.location.reload();
  }

}
