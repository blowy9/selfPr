import { importProvidersFrom, Injectable } from '@angular/core';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Article {
  constructor(title, text, images, category) {
    this.title = title;
    this.text = text;
    this.pictures = images;
    this.category = category;
  }

  id: number;
  title: string;
  text: string;
  pictures: File[];
  category: string;
  createdAt: Date;
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
  async getArticles() {}

  postUrl = 'http://localhost:3000/posts'
  getAll(): Observable<any> {
    return this.http.get(this.postUrl);
  }


  async getById(id){
    return this.http.get(this.postUrl + "/" + id)
  }

  arr = ["gg wp", "gl hf", "something else"]
  async post(article: Article) {
    return this.http.post('http://localhost:3000/posts', {
      "title": article.title,
      "text": article.text,
      "category": article.category,
      "pictures": article.pictures
    } ).subscribe();
  }
}
