import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import * as mammoth from 'mammoth';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgIf],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent {
  modal = false;
  
  itemtimeline: string = "3";

  mostrarmodal() {
    this.modal = !this.modal;
  }
  
}
