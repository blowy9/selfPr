import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleService } from '../services/article.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import {read} from "fs";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
})
export class EditorComponent implements OnInit {
  @Input() article?: Article;

  cats = ['Travel', 'Work', 'Pets', 'Nature'];
  constructor(private articleService: ArticleService, private http: HttpClient) {}

  files = []
  id = 0;


  onUpload(file: File) {
    let image: string
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (events: any) => {
        image =  JSON.stringify(reader.result)
      };
      return image
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onCreate(title, text, category) {
    let newArr = []
    let x = new Article(title, text, category);
    this.http.post('http://localhost:3000/posts', {
      "title": x.title,
      "text": x.text,
      "category": x.category,
    }).subscribe( res => {
      newArr.push(res)
      this.files.map(x => {
        let formdata = new FormData()
        formdata.append("images", x)
        formdata.append("articleId", newArr[0]._id)
        formdata.append("name", x.name)
        this.http.post('http://localhost:3000/posts/images', formdata).subscribe()
      })
    });

  }

  ngOnInit(): void {
    this.articleService.getPhotos(this.article._id).subscribe(x => {
      x.map(async img => {
        let blob = await fetch(this.articleService.getPhoto(img)).then(r => r.blob())
        this.files.push(blob)
      }
      )
    })
    console.log("files: " + this.files)
  }
}
