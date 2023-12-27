import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslocoHttpLoader } from './transloco-loader';

describe('TranslocoHttpLoader', () => {
  let service: TranslocoHttpLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [ TranslocoHttpLoader ]
    });

    service = TestBed.inject(TranslocoHttpLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
