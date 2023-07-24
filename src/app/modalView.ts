import { Component ,  ChangeDetectionStrategy, Input }  from '@angular/core';

@Component({
    selector: 'modal-view',
    template:
    `<ng-template confirm>
    <confirm-modal-component></confirm-modal-component>
</ng-template>`,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class modalView{
    @Input() css_style;
    @Input() message;
    @Input() title;
}

