import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { provideTransloco } from '@ngneat/transloco';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { ENVIRONMENT } from './app/common/models/environment.model';
import { environment } from './environments/environment';
import { translocoProviderOptions } from './app/common/services/transloco-loader';

if (environment.production) {
  enableProdMode();
}

defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ENVIRONMENT, useValue: environment },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    provideTransloco(translocoProviderOptions),
  ],
});
