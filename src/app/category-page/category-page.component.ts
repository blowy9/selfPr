import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Article, ArticleService } from '../services/article.service';
import {BehaviorSubject} from 'rxjs';
import {PageEvent} from "@angular/material/paginator";
import {animate, style, transition, trigger} from "@angular/animations";
import {SidebarService} from "../side-bar/sidebar.service";


@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.sass'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ width: 0 }),
            animate('0.5s ease-out',
              style({ width: 400 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ width: 400 }),
            animate('0.5s ease-in',
              style({ width: 0} ))
          ]
        )
      ]
    )
  ]
})
export class CategoryPageComponent implements OnInit, OnDestroy{

  private parameters$ = new BehaviorSubject<string>("");

  private parametersObservable: any;

  length$ = new BehaviorSubject<number>(5);

  page = 1
  pageLimit = 5

  constructor(private route: ActivatedRoute, private articleService: ArticleService, public sidebar: SidebarService) {
  }

  getPar(params){
    if(this.category){
      this.parameters$.next(`postCat=` + this.category + "&" + params)
    }else this.parameters$.next(params)
    this.getArticles()
  }

  options = []

  getArticles(){
    this.articleService.get(this.parameters$.getValue(), this.page, this.pageLimit).subscribe(returned => {
      this.articles = []
      this.articles.push(...returned.result)
      this.options = [...returned.titles]
      this.length$.next(returned.listLength)
      if (this.length$.getValue() < this.pageNumber*this.pageLimit){
        this.pageNumber = Math.floor(this.length$.getValue()/this.pageLimit)
        console.log(this.pageNumber)
      }
    })
  }

  category;
  articles: Article[] = [];

  sizeOptions = [5, 10, 20];



  ngOnInit() {
    this.parametersObservable = this.route.params.subscribe(params => {
      if(params['category']){
        this.category = params['category'].replace(/\b\S/g, t => t.toUpperCase());
        this.parameters$.next(`postCat=` + this.category)
      }
      this.getArticles()
    })
  }

  pageNumber

//Don't forget to unsubscribe from the Observable
  ngOnDestroy() {
    if(this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }

  OnPageChange (event: PageEvent){
    this.page = event.pageIndex + 1
    this.pageLimit = event.pageSize
    this.pageNumber = event.pageIndex
    this.getArticles()
  }
}
