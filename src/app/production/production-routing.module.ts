import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ProductionComponent } from './production.component';

const routes: Routes = [
  {
    path: '',
    component: ProductionComponent,
    data: {
      title: 'Production'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule {}
