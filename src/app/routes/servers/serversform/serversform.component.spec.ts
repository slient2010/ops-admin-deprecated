import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersformComponent } from './serversform.component';

describe('ServersformComponent', () => {
  let component: ServersformComponent;
  let fixture: ComponentFixture<ServersformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
