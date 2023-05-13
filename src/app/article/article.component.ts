import {Component, Input, OnInit} from '@angular/core';
import {Article, ArticleService} from "../services/article.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  constructor(private route: ActivatedRoute, private articles: ArticleService, private location: Location) { }

  article: Article
  editOpen = false
  toggleEdit(){
    this.editOpen = !this.editOpen
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.article = this.articles.getArticles().find(x=> x.id == params['id'])
    });
  }

  back(): void {
    this.location.back()
  }

}
