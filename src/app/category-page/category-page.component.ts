import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Article, ArticleService} from "../services/article.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass']
})
export class CategoryPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private article: ArticleService) { }

  category
  articles: Article[]

  sizeOptions = [5, 10 ,20]



  OnPageChange (event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if(endIndex > this.articles.length){
      endIndex = this.articles.length
    }
    this.articlesSlice = this.articles.slice(startIndex,endIndex)
  }

  articlesSlice

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category']
      console.log(this.category)
      this.articles = this.article.getArticles()
      this.articlesSlice = this.articles.slice(0, 5)
    });
  }



}
