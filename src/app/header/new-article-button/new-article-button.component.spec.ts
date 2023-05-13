import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticleButtonComponent } from './new-article-button.component';

describe('NewArticleButtonComponent', () => {
  let component: NewArticleButtonComponent;
  let fixture: ComponentFixture<NewArticleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArticleButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArticleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
