import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Article, ArticleService } from '../services/article.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {TitleCasePipe} from "@angular/common";


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass'],
})
export class CategoryPageComponent implements OnInit, OnDestroy{
  private parameters$ = new BehaviorSubject<string>(""); // true is your initial value

  private parametersObservable: any;
  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) {
  }

  category;
  articles: Observable<[Article]>;

  sizeOptions = [5, 10, 20];

  ngOnInit() {
    this.parametersObservable = this.route.params.subscribe(params => {
      if(params['category']){
        this.category = params['category'].replace(/\b\S/g, t => t.toUpperCase());
        this.parameters$.next(`?postCat=` + this.category)
      }
      this.articles = this.articleService.get(this.parameters$.getValue())
    });

  }

//Don't forget to unsubscribe from the Observable
  ngOnDestroy() {
    if(this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }

  // OnPageChange (event: PageEvent){
  //   const startIndex = event.pageIndex * event.pageSize
  //   let endIndex = startIndex + event.pageSize
  //   if(endIndex > this.articles.length){
  //     endIndex = this.articles.length
  //   }
  //   this.articlesSlice = this.articles.slice(startIndex,endIndex)
}
