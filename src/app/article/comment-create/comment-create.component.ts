import {Component, Input} from '@angular/core';
import {ArticleService} from "../../services/article.service";

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

