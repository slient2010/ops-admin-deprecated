import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappformComponent } from './createappform.component';

describe('CreateappformComponent', () => {
  let component: CreateappformComponent;
  let fixture: ComponentFixture<CreateappformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateappformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateappformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
