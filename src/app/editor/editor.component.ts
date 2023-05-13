import {Component, Input, OnInit} from '@angular/core';
import {Article, ArticleService} from "../services/article.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit{
  @Input() article?: Article

  cats = ["Travel", "Work", "Pets", "Nature"]
  constructor(private articles: ArticleService) {
  }

  files = [];
  id = 0

  onSelect(event){
    if (event.target.files && event.target.files.length < 3){
      for(let i=0;i<=File.length;i++){
        if (!event.target.files[i]) continue;
        let reader = new FileReader()
        reader.readAsDataURL(event.target.files[i])
        reader.onload=(events: any) => {
          this.files.push(events.target.result)
        }
      }
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onCreate(title, text, images, category){
    let x = new Article(title, text, images, category, this.id)
    this.articles.createArticle(x)
    console.log(this.articles.getArticles())
    this.id++
  }
  onSave(title, text, images, category, article: Article){
    let x = new Article(title, text, images, category, article.id)
    this.articles.updateArticle(x)
  }

  ngOnInit(): void {
    if(this.article) this.files = this.article.pictures
  }
}
