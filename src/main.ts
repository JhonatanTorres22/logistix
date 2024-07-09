import { enableProdMode, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }

  return Promise.resolve()
}

if (environment.production) {
  enableProdMode();
}

prepareApp().then( () => {
  platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
})
