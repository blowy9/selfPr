import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {inputNames} from "@angular/material/schematics/ng-update/data";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.sass']
})
export class CommentCreateComponent {

  @Input() articleId : string


  constructor(private articleService : ArticleService) {
  }

  onPost(text){
    console.log(this.articleId)
    this.articleService.postComment(text, this.articleId)
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }
}

