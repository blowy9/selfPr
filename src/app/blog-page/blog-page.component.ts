import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Article} from "../services/article.service";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.sass']
})
export class BlogPageComponent implements OnInit {

  constructor() { }
  number

  ngOnInit(): void {
  }

  onScrollDown() {
    console.log("scrolled down!!");
  }

  onScrollUp() {
    console.log("scrolled up!!");
  }

}
