import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkginfoComponent } from './pkginfo.component';

describe('PkginfoComponent', () => {
  let component: PkginfoComponent;
  let fixture: ComponentFixture<PkginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
