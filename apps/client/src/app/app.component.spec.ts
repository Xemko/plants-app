import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { getTranslocoTestingModule } from './common/transloco/transloco-testing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj('Storage', [ 'create' ]);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: Storage, useValue: storageSpy },
        getTranslocoTestingModule(),
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    // THEN
    expect(component).toBeTruthy();
  });

  it('should create the storage on init', () => {
    // GIVEN
    storageSpy.create.and.returnValue(Promise.resolve(storageSpy));

    // THEN
    expect(storageSpy.create).toHaveBeenCalledTimes(1);
  });

});
