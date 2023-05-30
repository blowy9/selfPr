import {Component, Input, OnInit} from '@angular/core';
import {Article, ArticleService} from "../../services/article.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.sass']
})
export class ArticleCardComponent implements OnInit {

 @Input() article?: Article
  date = new Date
  constructor(public articleService: ArticleService){ }

  stringifyDate(date){
   let stringDate = new Date(date.toLocaleString())
    return stringDate.toLocaleDateString()
  }

  images = []
  pictures


  ngOnInit(): void {
   this.pictures = this.articleService.getPhotos(this.article._id) as Observable<String>
    this.date = new Date(this.article.date.toString())
    this.pictures.subscribe(x => this.images.push(...x))
  }

}
