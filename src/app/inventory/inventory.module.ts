import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import {CommonModule} from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';

@Pipe({
    name: 'searchFilter'
})
export class SearchFilter implements PipeTransform {
    transform(items: any[], criteria: any): any {

        return items.filter(item =>{
           for (let key in item ) {
             if((""+item[key]).toLowerCase().includes(criteria.toLowerCase())){
                return true;
             }
           }
           return false;
        });
    }
}

@NgModule({
  imports: [
    InventoryRoutingModule,
    ChartsModule,
    BsDropdownModule,
    TabsModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
  ],
  declarations: [ InventoryComponent, SearchFilter, TimeAgoPipe ]
})
export class InventoryModule { }
