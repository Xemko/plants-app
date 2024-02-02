import { DatePipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { IonTitle } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { getDaysOfWeekTitles } from '@plants-app/shared';
import { CalendarDay } from '../models/calendar.interface';
import { getWeekDays } from '../services/date-time.utils';

@Component({
  selector: 'app-date-selector',
  templateUrl: 'date-selector.component.html',
  styleUrls: [ 'date-selector.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ TranslocoPipe, DatePipe, IonTitle, NgClass ]
})
export class DateSelectorComponent implements OnChanges {
  @Input({ required: true }) public data: {currentDate: Date; events: any[]; } | null = null;
  @Output() public daySelected = new EventEmitter<CalendarDay | null>();

  public selectedDate: CalendarDay | null = null;
  public daysOfWeekTitles: string[] = getDaysOfWeekTitles();
  public daysList: CalendarDay[] = [];

  ngOnChanges(changes:SimpleChanges): void {
    this.daysList = [];
    if ('data' in changes && this.data) {
      this.daysList = getWeekDays(this.data.currentDate, this.data.events);
    }
  }

  selectDay(day: CalendarDay): void {
    this.selectedDate = this.isDaySelected(day) ? null : day;
    this.daySelected.emit(this.selectedDate);
  }

  isDaySelected(day: CalendarDay): boolean {
    return this.selectedDate?.date.getDate() === day.date.getDate();
  }

}
