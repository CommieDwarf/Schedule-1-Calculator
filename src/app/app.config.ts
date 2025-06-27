import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { INGREDIENTS_MAP_PROVIDER } from '@core/constants/ingredients.constant';
import { BASE_PRODUCT_MAP_PROVIDER } from '@core/constants/product.constant';
import { EFFECT_MAP_PROVIDER } from '@core/constants/effects.constant';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    INGREDIENTS_MAP_PROVIDER,
    BASE_PRODUCT_MAP_PROVIDER,
    EFFECT_MAP_PROVIDER,
  ],
};
