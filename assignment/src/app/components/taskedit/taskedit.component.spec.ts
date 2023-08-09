import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskeditComponent } from './taskedit.component';

describe('TaskeditComponent', () => {
  let component: TaskeditComponent;
  let fixture: ComponentFixture<TaskeditComponent>;

  beforeEach(async () => {                    // được sử dụng để cấu hình test case
    await TestBed.configureTestingModule({
      declarations: [ TaskeditComponent ]     // khai báo cấu hình của testbed
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskeditComponent);      // tạo ra một intance của taskedit
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
