import { NgModule  } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { 
    NgbModule, 
    NgbRatingModule, 
    NgbAlertModule, 
    NgbCarouselModule  
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        NgbModule, 
        NgbRatingModule, 
        NgbAlertModule, 
        NgbCarouselModule
    ],
    exports:[
        NgbModule, 
        NgbRatingModule, 
        NgbAlertModule, 
        NgbCarouselModule
    ]
})
  export class BootstrapModule {}