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

export class returnedPagination {
  result: Article[]
  listLength:  number
  titles: string[];
}
export class Comment {
  Date: Date
  text : string
}

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  postUrl = 'http://localhost:3000/posts'
  commentUrl = 'http://localhost:3000/comments'

  articleList: Article[];
  constructor(private http: HttpClient) {}

  patch(articleId,title,text,category){
    let x = new Article(title, text, category);
    this.http.patch(`http://localhost:3000/posts/${articleId}`, {
      "title": x.title,
      "text": x.text,
      "category": x.category,
    }).subscribe();
  }
  post(title, text, category, files){
    let newArr = []
    let x = new Article(title, text, category);
    this.http.post('http://localhost:3000/posts', {
      "title": x.title,
      "text": x.text,
      "category": x.category,
    }).subscribe(res => {
      alert("created" + res)
      newArr.push(res)
      files.map(x => {
        let formdata = new FormData()
        formdata.append("images", x)
        formdata.append("articleId", newArr[0]._id)
        formdata.append("name", x.name)
        this.http.post('http://localhost:3000/posts/images', formdata).subscribe()
      })
    });
  }

  postComment(text, articleId){
    this.http.post('http://localhost:3000/comments', {
      "text": text,
      "articleId": articleId
    }).subscribe(res => console.log(res))
  }

  getComments(articleId){
    return this.http.get(this.commentUrl + "/" + articleId) as Observable<Comment[]>
  }

  getCats() {
    return ['travel', 'pets', 'work', 'nature'];
  }

  getPhoto(name){
    if (name) return "http://localhost:3000/posts/images/getByName/" + name
    else return ""
  }

  get(params, page, limit){
    console.log(this.postUrl.concat(params))
    return this.http.get(this.postUrl.concat("?").concat(params).concat(`&page=${page}&limit=${limit}`)) as Observable<returnedPagination>;
  }


  getById(id): Observable<Article>{
    return this.http.get(this.postUrl.concat("/getById/" + id)) as Observable<Article>
  }

  getPhotos(articleId): Observable<any> {
    return this.http.get(this.postUrl.concat("/images/" + articleId))
  }
}
