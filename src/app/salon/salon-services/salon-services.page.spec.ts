import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalonServicesPage } from './salon-services.page';

describe('SalonServicesPage', () => {
  let component: SalonServicesPage;
  let fixture: ComponentFixture<SalonServicesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalonServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
