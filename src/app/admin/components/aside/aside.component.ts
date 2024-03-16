import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from '../../../auth/auth-service.service';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [NgClass],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  constructor(private cookieService: CookieService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    // Verifica si el token ha expirado antes de realizar la consulta a la API
    if (this.authService.decodeToken() !== null) {
      // Llamada a la función para consultar la API cuando el componente se inicializa
      if (this.cookieService.get('anside') !== null) {
        this.selectedItem = this.cookieService.get('anside');
      }
      if (this.cookieService.get('color') !== null) {
        this.color = this.cookieService.get('color');
      }
    }
    else {
      window.location.href = '/login';
    }
  }

  @Input() showSidebar = false;
  @Input() color: string = "bg-white";
  // Puedes inicializarlo como true o false según tus necesidades
  selectedItem: string | null = null;

  @Output() addFavoriteEvent = new EventEmitter<string>();

  selectItem(item: string) {
    this.cookieService.set('anside', item);
    this.selectedItem = item;
    this.addFavoriteEvent.emit(item);
  }
}
