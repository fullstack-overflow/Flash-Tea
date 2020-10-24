import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserBillPage } from './user-bill.page';

describe('UserBillPage', () => {
  let component: UserBillPage;
  let fixture: ComponentFixture<UserBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
