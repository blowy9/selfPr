import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.sass']
})
export class CommentSectionComponent implements OnInit{
  @Input() articleId : string

  constructor(private articleService: ArticleService) {
  }

  comments = []
  ngOnInit(): void {
    this.articleService.getComments(this.articleId).subscribe(comm => comm.map(x => this.comments.push(x)))
    console.log(this.comments)
  }


}
