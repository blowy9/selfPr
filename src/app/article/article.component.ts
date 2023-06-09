import {Component, OnInit} from '@angular/core';
import {Article, ArticleService} from "../services/article.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Observable} from "rxjs";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {
  constructor(private route: ActivatedRoute, public articleService: ArticleService, private location: Location) { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

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
