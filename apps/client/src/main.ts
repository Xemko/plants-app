import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideTransloco } from '@ngneat/transloco';
import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';
import { authHttpInterceptor } from '@plants-app/auth';
import { ENVIRONMENT } from '@plants-app/shared';
import { translocoProviderOptions } from './app/transloco/transloco.config';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ENVIRONMENT, useValue: environment },

    provideIonicAngular(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([ authHttpInterceptor ]),
    ),
    provideTransloco(translocoProviderOptions),

    importProvidersFrom(IonicStorageModule.forRoot({
      name: '__plantsApp',
      storeName: '_plantsApp',
    })),
  ],
});
