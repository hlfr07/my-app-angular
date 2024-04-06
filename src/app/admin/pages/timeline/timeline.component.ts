import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgIf],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  mostrarSegundoDiv = false;
  seHizoClic = false;
  itemtimeline: string = "2";

  onMouseEnter() {
    this.mostrarSegundoDiv = true;
  }

  onMouseLeave() {
    if (!this.seHizoClic) {
      this.mostrarSegundoDiv = false;
    }
  }

  toggleMostrarSegundoDiv() {
    if (this.seHizoClic == false) {
      this.seHizoClic = true;
      this.mostrarSegundoDiv = true;
    }
    else {
      this.seHizoClic = false;
      this.mostrarSegundoDiv = !this.mostrarSegundoDiv;
    }
    console.log(this.seHizoClic);
  }

}
