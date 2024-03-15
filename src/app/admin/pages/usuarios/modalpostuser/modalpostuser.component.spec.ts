import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpostuserComponent } from './modalpostuser.component';

describe('ModalpostuserComponent', () => {
  let component: ModalpostuserComponent;
  let fixture: ComponentFixture<ModalpostuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalpostuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalpostuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
