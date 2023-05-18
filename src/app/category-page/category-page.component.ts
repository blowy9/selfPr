import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleService } from '../services/article.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass'],
})
export class CategoryPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private article: ArticleService) {}

  category;
  articles: Observable<any>;

  sizeOptions = [5, 10, 20];

  // OnPageChange (event: PageEvent){
  //   const startIndex = event.pageIndex * event.pageSize
  //   let endIndex = startIndex + event.pageSize
  //   if(endIndex > this.articles.length){
  //     endIndex = this.articles.length
  //   }
  //   this.articlesSlice = this.articles.slice(startIndex,endIndex)
  // }

  text;

  ngOnInit() {
    // this.articles = await this.article.getArticles()
    this.articles = this.article.getAll();
  }
}
