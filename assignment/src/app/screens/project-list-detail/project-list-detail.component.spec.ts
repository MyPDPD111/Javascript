import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListDetailComponent } from './project-list-detail.component';

describe('ProjectListDetailComponent', () => {
  let component: ProjectListDetailComponent;
  let fixture: ComponentFixture<ProjectListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
