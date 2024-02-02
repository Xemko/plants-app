import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '@plants-app/shared';

import { DateSelectorComponent } from './date-selector.component';

describe('DateSelectorComponent', () => {
  let component: DateSelectorComponent;
  let fixture: ComponentFixture<DateSelectorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        getTranslocoTestingModule(),
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
