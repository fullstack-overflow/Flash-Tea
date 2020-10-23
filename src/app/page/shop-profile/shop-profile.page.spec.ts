import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShopProfilePage } from './shop-profile.page';

describe('ShopProfilePage', () => {
  let component: ShopProfilePage;
  let fixture: ComponentFixture<ShopProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShopProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
