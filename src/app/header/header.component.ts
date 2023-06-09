import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {SidebarService} from "../side-bar/sidebar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public article: ArticleService, public sidebar: SidebarService) { }

  ngOnInit(): void {
  }

}
