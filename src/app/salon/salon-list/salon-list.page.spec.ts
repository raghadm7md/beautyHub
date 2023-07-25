import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalonListPage } from './salon-list.page';

describe('SalonListPage', () => {
  let component: SalonListPage;
  let fixture: ComponentFixture<SalonListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalonListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
