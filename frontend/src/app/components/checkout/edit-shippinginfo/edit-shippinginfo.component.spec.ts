import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShippinginfoComponent } from './edit-shippinginfo.component';

describe('EditShippinginfoComponent', () => {
  let component: EditShippinginfoComponent;
  let fixture: ComponentFixture<EditShippinginfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShippinginfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShippinginfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
