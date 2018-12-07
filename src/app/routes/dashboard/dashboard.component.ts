import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  antChart: any;
  paddingStyle = {'padding-left': '12px', 'padding-right': '12px', width: '25%', float: 'left', '-webkit-box-flex': 0};
  iconColor1 = {color: 'rgb(100, 234, 145)'};
  iconColor2 = {color: 'rgb(143, 201, 251)'};
  iconColor3 = {color: 'rgb(216, 151, 235)'};
  iconColor4 = {color: 'rgb(246, 152, 153)'};

  constructor(private _elem: ElementRef) {
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['6月', '7月', '8月', '9月', '10月'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  ngOnInit() {
  }
}
