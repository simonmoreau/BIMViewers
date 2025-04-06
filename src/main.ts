import themes from 'devextreme/ui/themes';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import config from 'devextreme/core/config'; 
import { licenseKey } from './devextreme-license'; 

themes.initialized(() => {
  config({ licenseKey });
  platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
    .catch(err => console.error(err));
});
