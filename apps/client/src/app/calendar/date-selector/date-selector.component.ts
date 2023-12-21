import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonTitle } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { getDaysOfWeekTitles, getWeekDays } from '../services/date-time.utils';

@Component({
  selector: 'app-date-selector',
  templateUrl: 'date-selector.component.html',
  styleUrls: [ 'date-selector.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ TranslocoPipe, DatePipe, IonTitle, NgClass ]
})
export class DateSelectorComponent implements OnChanges {
  @Input({ required: true }) public currentDate: Date = new Date();
  
  public daysOfWeekTitles: string[] = getDaysOfWeekTitles();
  public daysList: { value: number; }[] = [];

  ngOnChanges(changes:SimpleChanges): void {
    if ('currentDate' in changes) {
      this.daysList = getWeekDays(this.currentDate);
    }
  }

}
