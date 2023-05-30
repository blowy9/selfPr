import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Observable} from "rxjs";
import {considerSettingUpAutocompletion} from "@angular/cli/src/utilities/completion";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent {

  constructor(private articleService: ArticleService) {
  }

  @Input() pictures : string[]

  images: []


  currentIndex : number = 0

  rotate(plus){
    if (plus){
      this.currentIndex++
      if (this.currentIndex > this.pictures.length -1){
        this.currentIndex = 0
      }
    }else{
      this.currentIndex--
      if (this.currentIndex < 0){
        this.currentIndex = this.pictures.length - 1
      }
    }
  }


  getCurrentSlideUrl(): string{
    let url = this.articleService.getPhoto(this.pictures[this.currentIndex])
    return `url('${url}')`
  }

}
