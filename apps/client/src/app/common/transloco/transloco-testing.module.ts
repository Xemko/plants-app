import { importProvidersFrom } from '@angular/core';
import { TranslocoTestingModule, TranslocoTestingOptions } from '@ngneat/transloco';

export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}) {
  return importProvidersFrom(TranslocoTestingModule.forRoot({
    translocoConfig: {
      availableLangs: [ 'en' ],
      defaultLang: 'en',
    },
    ...options
  }));
}