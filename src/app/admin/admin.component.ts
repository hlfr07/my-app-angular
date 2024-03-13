import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AsideComponent } from './components/aside/aside.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { HomedashComponent } from './pages/homedash/homedash.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgClass, HomedashComponent, NavComponent, AsideComponent, FooterComponent, PerfilesComponent, UsuariosComponent, ProductosComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  showSidebar: boolean = false; // Puedes inicializarlo como true o false según tus necesidades
  Itemselector: string = "Dashboard";

  getshow(show: boolean) {
    this.showSidebar = show;
  }

  getItem(Item: string) {
    //alert("actual: " + this.Itemselector + " cambia a: " + Item);
    this.Itemselector = Item;
  }
}
