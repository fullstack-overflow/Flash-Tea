import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreregisterPage } from './storeregister.page';

describe('StoreregisterPage', () => {
  let component: StoreregisterPage;
  let fixture: ComponentFixture<StoreregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreregisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
