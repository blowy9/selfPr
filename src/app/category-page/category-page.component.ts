import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Article, ArticleService } from '../services/article.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {TitleCasePipe} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass'],
})
export class CategoryPageComponent implements OnInit, OnDestroy{
  private parameters$ = new BehaviorSubject<string>("");

  private parametersObservable: any;

  length$ = new BehaviorSubject<number>(10);

  private lengthObservable: any;

  page = 1
  pageLimit = 10

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) {
  }

  getPar(params){
    console.log(params)
    if(this.category){
      this.parameters$.next(`postCat=` + this.category + "&" + params)
    }else this.parameters$.next(params)
    this.articleService.get(this.parameters$.getValue(), this.page, this.pageLimit).subscribe(returned => {
      this.articles = []
      this.articles.push(...returned.result)
      this.length$.next(returned.listLength)
    })
  }

  category;
  articles: Article[] = [];

  sizeOptions = [10, 20, 50];



  ngOnInit() {
    this.parametersObservable = this.route.params.subscribe(params => {
      if(params['category']){
        this.category = params['category'].replace(/\b\S/g, t => t.toUpperCase());
        this.parameters$.next(`postCat=` + this.category)
      }
      this.articleService.get(this.parameters$.getValue(), this.page, this.pageLimit).subscribe(returned => {
        this.articles = []
        this.articles.push(...returned.result)
        this.length$.next(returned.listLength)
      })
    })
  }

//Don't forget to unsubscribe from the Observable
  ngOnDestroy() {
    if(this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }

  OnPageChange (event: PageEvent){
    this.page = event.pageIndex + 1
    this.pageLimit = event.pageSize
    console.log(event.pageSize)
    this.articleService.get(this.parameters$.getValue(), this.page, this.pageLimit).subscribe(returned => {
      this.articles = []
      this.articles.push(...returned.result)
      this.length$.next(returned.listLength)
    })
  }
}
