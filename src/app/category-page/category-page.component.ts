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

  sidebarOpen = false
  private parameters$ = new BehaviorSubject<string>("");

  private parametersObservable: any;

  length$ = new BehaviorSubject<number>(5);

  private lengthObservable: any;

  page = 1
  pageLimit = 5

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router) {
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
    onmousemove = function(e){
      let sidebar = document.getElementById("sideBar")
      if(e.clientX > window.innerWidth - 400){
        sidebar.style.width = "400px"
      }else{
        sidebar.style.width = "0"
      }
    }
    if(document.getElementById("sideBar").style.width == "0"){
      this.sidebarOpen = false
    }else{
      this.sidebarOpen = true
    }
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
