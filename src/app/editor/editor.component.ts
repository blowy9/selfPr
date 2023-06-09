import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleService } from '../services/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
})


export class EditorComponent implements OnInit {
  @Input() article?: Article;

  cats = ['Travel', 'Work', 'Pets', 'Nature'];
  constructor(private articleService: ArticleService) {}

  files = []
  id = 0;

  onChange(title, text, category) {
    this.articleService.patch(this.article._id,title,text,category)
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onCreate(title, text, category) {
    this.articleService.post(title,text,category, this.files)
  }

  ngOnInit(): void {
    this.articleService.getPhotos(this.article._id).subscribe(x => {
      x.map(async img => {
        let blob = { bl: [await fetch(this.articleService.getPhoto(img)).then(r => r.blob())], name:{
          "name" : img
        }}
        this.files.push(blob)
      }
      )
    })
    console.log("files: " + this.files)
  }
}
