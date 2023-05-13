import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public article: ArticleService) { }

  ngOnInit(): void {
  }

}
