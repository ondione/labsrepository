import { NgModule , CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { ConfirmService, ConfirmState, ConfirmTemplateDirective, ConfirmModalComponent  }  from './testModal';

@NgModule({
    imports:[FormsModule, CommonModule],
    declarations:[ ConfirmTemplateDirective, ConfirmModalComponent ],
    exports:[ConfirmTemplateDirective, ConfirmModalComponent],
    providers:[ ConfirmService, ConfirmState],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ModalModule{}