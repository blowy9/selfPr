import {Component, Input} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {inputNames} from "@angular/material/schematics/ng-update/data";

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
  }
}

