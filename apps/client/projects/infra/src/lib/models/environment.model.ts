import { InjectionToken } from '@angular/core';

export interface Environment {
  production: boolean;
  appName: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('environment');
