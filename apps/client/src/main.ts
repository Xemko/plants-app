import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideTransloco } from '@ngneat/transloco';
import { AppComponent } from './app/app.component';

import { routes } from './app/app.routes';
import { authHttpInterceptor } from './app/auth/auth-http-interceptor.service';
import { ENVIRONMENT } from './app/common/models/environment.model';
import { translocoProviderOptions } from './app/common/transloco/transloco.config';
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
    provideRouter(routes),
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
