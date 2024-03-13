import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

  @Input() showSidebar = false;
 // Puedes inicializarlo como true o false según tus necesidades
}
