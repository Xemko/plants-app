import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignOutService, UserService } from '@plants-app/auth';
import { getTranslocoTestingModule } from '@plants-app/shared';
import { of } from 'rxjs';

import { DefaultLayoutComponent } from './default-layout.component';

describe('DefaultLayoutComponent', () => {
  let component: DefaultLayoutComponent;
  let fixture: ComponentFixture<DefaultLayoutComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        getTranslocoTestingModule(),
        {
          provide: SignOutService,
          useValue: {
            signOut: () => Promise.resolve()
          }
        },
        {
          provide: UserService,
          useValue: {
            getUser: () => of({})
          }
        },
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
