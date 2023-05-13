import { Injectable } from '@angular/core';

export class Article{
    constructor(title, text, images, category, id) {
      this.id =id
      this.title = title
      this.text = text
      this.pictures = images
      this.category = category
  }

  id: number; title: string; text: string; pictures: File[]; category: string
}


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleList: Article[] =[]

  constructor() {
  }


  getCats(){
    return ['travel', 'pets', 'work', 'nature']
  }
  getArticles(){
    return this.articleList
  }

  createArticle(article){
    this.articleList.push(article)
  }

  updateArticle(article){
    this.articleList.map(x => {
      if(x.id == article.id){
        x = article
      }
      return x
    })
  }
  saveArticle(id: number, article: Article){
    this.articleList.find(x => x.id == id)
  }
}
