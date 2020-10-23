import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormUpdateShopPage } from './form-update-shop.page';

describe('FormUpdateShopPage', () => {
  let component: FormUpdateShopPage;
  let fixture: ComponentFixture<FormUpdateShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUpdateShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormUpdateShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
