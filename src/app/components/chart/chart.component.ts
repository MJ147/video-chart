import { Component, OnInit } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';
import { BarChart } from 'src/app/models/chart-bar.interface';
import { XlsService } from 'src/app/services/xls/xls.service';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
	barChart: BarChart | null = null;
	// 	chartBars: [
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},

	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 		{
	// 			label: 'test',
	// 			isPercentValue: false,
	// 			keyframes: [
	// 				{ time: 0, value: 0 },
	// 				{ time: 5000, value: 100 },
	// 				{ time: 8000, value: 200 },
	// 			],
	// 		},
	// 	],
	// };

	constructor(private _xlsService: XlsService) {}

	ngOnInit(): void {
		this._xlsService.chartData$.then((chartData) => (this.barChart = chartData));
		setTimeout(() => {
			console.log(this.barChart);
		}, 1000);
	}
}
