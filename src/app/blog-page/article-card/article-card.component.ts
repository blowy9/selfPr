import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../services/article.service";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.sass']
})
export class ArticleCardComponent implements OnInit {

 @Input() article?: Article
  constructor() { }

  ngOnInit(): void {
  }

}
