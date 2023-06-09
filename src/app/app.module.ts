import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import { NewArticleButtonComponent } from './Header/new-article-button/new-article-button.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatToolbarModule} from "@angular/material/toolbar";
import { ArticleCardComponent } from './blog-page/article-card/article-card.component';
import { EditorComponent } from './editor/editor.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatCardModule} from "@angular/material/card";
import { CategoryPageComponent } from './category-page/category-page.component';
import { ArticleComponent } from './article/article.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewArticleButtonComponent,
    BlogPageComponent,
    ArticleCardComponent,
    EditorComponent,
    CreatePageComponent,
    SearchBarComponent,
    CategoryPageComponent,
    ArticleComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSliderModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatChipsModule,
        MatButtonModule,
        MatButtonToggleModule,
        FormsModule,
        NgxDropzoneModule,
        MatCardModule,
        InfiniteScrollModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
