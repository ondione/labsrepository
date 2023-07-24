import { Component, Input , Output, EventEmitter } from '@angular/core';


@Component({
    selector : 'chartTemplate',
    template :`<div  class="col-sm-6">
    <h2> {{ chartTitle }}</h2>
    <div id="{{chartId}}" 
        (itemSelect)="itemSelected($event)"
        (itemDeselect)="itemDeselected($event)"
        [chartData]="line_ChartData"
        [chartOptions]= "line_ChartOptions" 
        [chartType]="lineChartType" 
        [chartTitle] ="chartTitle"
        [chartId] ="chartId"
    
    GoogleChart 
    
    > </div>
</div>`
})

export class ChartTemplate {

    @Input() chartTitle;
    @Input() chartId;

    @Output() itemSelect;
    @Output() itemDeselect;
    @Input() chartData;
    @Input() chartOptions ;
    @Input() chartType;
}