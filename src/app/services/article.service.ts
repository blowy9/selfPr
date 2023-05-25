import { importProvidersFrom, Injectable } from '@angular/core';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

export class Article {
  constructor(title, text, category) {
    this.title = title;
    this.text = text;
    this.category = category;
  }

  _id: string;
  title: string;
  text: string;
  pictures: Observable<any>;
  category: string;
  date: Date;
}

export class Picture {

  data: ArrayBuffer
  name : string
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articleList: Article[];
  constructor(private http: HttpClient) {}

  getCats() {
    return ['travel', 'pets', 'work', 'nature'];
  }

  getByCat(category){
    return this.http.get(this.postUrl.concat("/getByCat/" + category)) as Observable<[Article]>
  }

  getPhoto(name){
    return "http://localhost:3000/posts/images/getByName/" + name
  }
  async getArticles() {}

  postUrl = 'http://localhost:3000/posts'
  getAll(): Observable<[Article]> {
    return this.http.get(this.postUrl) as Observable<[Article]>;
  }

  get(params){
    return this.http.get(this.postUrl.concat(params)) as Observable<[Article]>;
  }


  getById(id): Observable<Article>{
    return this.http.get(this.postUrl.concat("/getById/" + id)) as Observable<Article>
  }

  getPhotos(articleId): Observable<any> {
    return this.http.get(this.postUrl.concat("/images/" + articleId))
  }
  async post(article: Article, images) {
    return
  }
}
