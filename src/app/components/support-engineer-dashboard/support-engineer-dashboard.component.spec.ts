import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportEngineerDashboardComponent } from './support-engineer-dashboard.component';

describe('SupportEngineerDashboardComponent', () => {
  let component: SupportEngineerDashboardComponent;
  let fixture: ComponentFixture<SupportEngineerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportEngineerDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportEngineerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
