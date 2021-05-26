import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowTrackPage } from './show-track.page';

const routes: Routes = [
  {
    path: '',
    component: ShowTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowTrackPageRoutingModule {}
