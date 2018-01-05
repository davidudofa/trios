import { NgModule } from '@angular/core';

import { TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
    imports: [

     ],
    declarations: [
         TimeAgoPipe
    ],
    exports: [
        TimeAgoPipe
    ]
})

export class SharedModule {}
