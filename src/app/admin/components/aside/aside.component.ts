import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [NgClass],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {

  @Input() showSidebar = false;
  // Puedes inicializarlo como true o false según tus necesidades
  selectedItem: string | null = null;
  
  @Output() addFavoriteEvent = new EventEmitter<string>();

  selectItem(item: string) {
    this.selectedItem = item;
    this.addFavoriteEvent.emit(item);
  }

}
