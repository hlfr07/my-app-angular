import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../../auth/auth-service.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showSidebar: boolean = false; // Puedes inicializarlo como true o false según tus necesidades
  constructor(private elementRef: ElementRef, private cookieService: CookieService, private authService: AuthServiceService) {
    this.checkScreenSize(); // Llamar al método para establecer el estado inicial de showSidebar
  }
  ngOnInit(): void {
    // Llamada a la función para consultar la API cuando el componente se inicializa
    if (this.authService.decodeToken() !== null) {
      // Llamada a la función para consultar la API cuando el componente se inicializa
      this.showSidebar = !this.showSidebar
      this.addshowSidebarEvent.emit(this.showSidebar);
      this.checkScreenSize();

      if (this.cookieService.get('color') !== null) {
        this.color = this.cookieService.get('color');
      }
    }
    else {
      window.location.href = '/login';
    }
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
      if (this.settings === false) {
        this.showSettings();
        this.opensettingscolor();
      }

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

  color: string = "bg-white";

  //se declara para enviar iformacion al padre, se tiene que indicar que tipo de variable le vamos a pasar
  @Output() addshowColorEvent = new EventEmitter<string>();

  //creamos un metodo para output
  showcolor(color: string): void {
    this.cookieService.set('color', color);
    this.color = color;
    alert("color: " + this.color);
    this.showSidebar = !this.showSidebar
    this.addshowColorEvent.emit(color);
  }

  menucolor: boolean = true;

  opensettingscolor() {
    this.menucolor = !this.menucolor;
  }
}
