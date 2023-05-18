import { Component, Input, OnInit } from '@angular/core';
import { Article, ArticleService } from '../services/article.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
})
export class EditorComponent implements OnInit {
  @Input() article?: Article;

  cats = ['Travel', 'Work', 'Pets', 'Nature'];
  constructor(private articles: ArticleService, private http: HttpClient) {}

  files = [];
  id = 0;

  dataURLtoFile(dataurl, filename) {
    if (typeof dataurl == 'string') {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    } else return dataurl;
  }
  onUpload(array: File[]) {
    let images = [];
    for (let i = 0; i <= array.length; i++) {
      if (!array[i]) continue;
      let reader = new FileReader();
      reader.readAsDataURL(array[i]);
      reader.onload = (events: any) => {
        images.push(reader.result);
      };
    }
    return images;
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onCreate(title, text, category) {
    let x = new Article(title, text, this.files, category);
    this.articles.post(x).then(r => console.log(x ,r))
  }

  ngOnInit(): void {
    if (this.article) this.files = this.article.pictures;
  }
}
