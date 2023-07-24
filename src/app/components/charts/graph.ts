import {Component} from '@angular/core';
import {ChartTemplate } from './chartTemplate';
@Component({
    selector: 'my-app',
    template: `
    <div class="form-group">
        <chartTemplate   
            (itemSelect)="itemSelected($event)"
            (itemDeselect)="itemDeselected($event)"
            [chartData]="line_ChartData"
            [chartOptions]= "line_ChartOptions" 
            [chartType]="lineChartType" 
            [chartTitle] ="chartTitle"
            [chartId] ="chartId"
        >
        </chartTemplate>
        <div  class="col-sm-6">
            <h2>  Line Chart</h2>
            <div id="line_chart" 
                (itemSelect)="itemSelected($event)"
                (itemDeselect)="itemDeselected($event)"
                [chartData]="line_ChartData"
                [chartOptions]= "line_ChartOptions" 
                chartType="LineChart" 
                GoogleChart
            >
            </div>
        </div>
        <div  class="col-sm-5">
            <h2>  Pie Chart</h2>
            <div id="pie_chart"
                (itemSelect)="itemSelected($event)" 
                (itemDeselect)="itemDeselected($event)" 
                [chartData]="pie_ChartData" 
                [chartOptions] = "pie_ChartOptions"
                chartType="PieChart" 
                GoogleChart 
            >
            </div>
        </div>
    </div> 

    <div class="form-group">
        <div  class="col-sm-6">
            <h2>  Bar Chart</h2>
            <div id="bar_chart"
                (itemSelect)="itemSelected($event)"
                (itemDeselect)="itemDeselected($event)" 
                [chartData]="bar_ChartData"
                [chartOptions] = "bar_ChartOptions"
                chartType="BarChart" 
                GoogleChart
            >
            </div>
        </div> 
        <div  class="col-sm-5"></div> 
    </div>`
})
export class GraphComponent {
    
    public line_ChartData = [
        ['Year', 'Sales', 'Expenses'],
        ['2004', 1000, 400],
        ['2005', 1170, 460],
        ['2006', 660, 1120],
        ['2007', 1030, 540]
    ];
    
    public pie_ChartData = [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
    ];
    public bar_ChartData = [
        ['City', '2010 Population', '2000 Population'],
        ['New York City, NY', 8175000, 8008000],
        ['Los Angeles, CA', 3792000, 3694000],
        ['Chicago, IL', 2695000, 2896000],
        ['Houston, TX', 2099000, 1953000],
        ['Philadelphia, PA', 1526000, 1517000]
    ];

    lineChartType =  "Line Chart";
    chartTitle = "Line Chart";
    chartId = 'line_chart';
   
    public line_ChartOptions = {
        title: 'Company Performance',
        curveType: 'function',
        legend: {
            position: 'bottom'
        }
    };
   
    public bar_ChartOptions = {
        title: 'Population of Largest U.S. Cities',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Total Population',
            minValue: 0,
            textStyle: {
                bold: true,
                fontSize: 12,
                color: '#4d4d4d'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 18,
                color: '#4d4d4d'
            }
        },
        vAxis: {
            title: 'City',
            textStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            },
            titleTextStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            }
        }
    };
    public pie_ChartOptions = {
        title: 'My Daily Activities',
        width: 900,
        height: 500
    };
   

    itemSelected(event) {
        alert(JSON.stringify(event));
    }

    itemDeselected(event) {
        alert(" DESELECTED "+event);
    }
}