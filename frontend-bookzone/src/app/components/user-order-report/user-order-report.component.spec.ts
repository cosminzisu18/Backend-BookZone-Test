import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderReportComponent } from './user-order-report.component';

describe('UserOrderReportComponent', () => {
  let component: UserOrderReportComponent;
  let fixture: ComponentFixture<UserOrderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOrderReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
