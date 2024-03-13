import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomedashComponent } from './components/homedash/homedash.component';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, HomedashComponent, NavComponent, AsideComponent, FooterComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  showSidebar: boolean = false; // Puedes inicializarlo como true o false según tus necesidades

  getshow(show: boolean){
    this.showSidebar=show;
  }
}
