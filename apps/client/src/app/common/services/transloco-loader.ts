import { inject, Injectable, isDevMode } from "@angular/core";
import { Translation, TranslocoLoader } from "@ngneat/transloco";
import { HttpClient } from "@angular/common/http";
import { TranslocoOptions } from '@ngneat/transloco/lib/transloco.providers';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${ lang }.json`);
  }
}

export const translocoProviderOptions: TranslocoOptions = {
  config: {
    availableLangs: [ 'en' ],
    defaultLang: 'en',
    prodMode: !isDevMode(),
  },
  loader: TranslocoHttpLoader
};
