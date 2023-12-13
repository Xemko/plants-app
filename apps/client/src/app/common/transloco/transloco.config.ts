import { isDevMode } from '@angular/core';
import { TranslocoOptions } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

export const translocoProviderOptions: TranslocoOptions = {
  config: {
    availableLangs: [ 'en' ],
    defaultLang: 'en',
    prodMode: !isDevMode(),
  },
  loader: TranslocoHttpLoader
};
