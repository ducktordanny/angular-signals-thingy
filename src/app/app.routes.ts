import { Routes } from '@angular/router';

import { RxjsComponent } from './pages/rjxs.page';
import { SignalsComponent } from './pages/signals.page';
import { SignalsGoodToKnowComponent } from './pages/signals-good-to-know';

export const routes: Routes = [
  { path: 'rxjs', component: RxjsComponent },
  { path: 'signals', component: SignalsComponent },
  { path: 'signals-good-to-know', component: SignalsGoodToKnowComponent },
];
