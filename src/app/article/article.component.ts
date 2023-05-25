import {Component, Input, OnInit} from '@angular/core';
import {Article, ArticleService} from "../services/article.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  constructor(private route: ActivatedRoute, public articleService: ArticleService, private location: Location) { }

  article$: Observable<Article>
  editOpen = false
  toggleEdit(){
    this.editOpen = !this.editOpen
  }
  pictures =[]
  ngOnInit(): void {
    this.route.params.subscribe(async params => {
     this.article$ = this.articleService.getById(params['id']) as Observable<Article>
      this.article$.subscribe(x=> this.articleService.getPhotos(x._id).subscribe(x => x.map(img => this.pictures.push(img))))
    });
    console.log(this.pictures)
  }

  back(): void {
    this.location.back()
  }

}
