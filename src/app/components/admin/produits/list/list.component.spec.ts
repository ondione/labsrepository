import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitWsComponent } from './list.component';

describe('ListProduitWsComponent', () => {
  let component: ListProduitWsComponent;
  let fixture: ComponentFixture<ListProduitWsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProduitWsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
