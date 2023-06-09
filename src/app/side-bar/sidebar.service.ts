import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  sidebarOpen = false

  sidebarToggle(){
    this.sidebarOpen = !this.sidebarOpen
  }

}
