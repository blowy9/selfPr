import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogPageComponent} from "./blog-page/blog-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {ArticleComponent} from "./article/article.component";

const routes: Routes = [
  {path: '', redirectTo: "articles", pathMatch: "full"},
  {path: 'articles', component: BlogPageComponent, children: [
      {path: '', component: CategoryPageComponent},
      {path: ':category', component: CategoryPageComponent}
    ]},
  {path: 'article/:id', component: ArticleComponent},
  {path: 'creation', component: CreatePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
