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
	barChart: BarChart = {
		duration: 10000,
		minValue: 0,
		maxValue: 200,
		bars: [
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 50, y: 0 },
					{ x: 100, y: 4 },
					{ x: 120, y: 8 },
				],
			},
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 100, y: 0 },
					{ x: 150, y: 4 },
					{ x: 200, y: 8 },
				],
			},
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 0, y: 0 },
					{ x: 100, y: 4 },
					{ x: 150, y: 8 },
				],
			},
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 0, y: 0 },
					{ x: 100, y: 4 },
					{ x: 200, y: 8 },
				],
			},

			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 0, y: 0 },
					{ x: 100, y: 4 },
					{ x: 200, y: 8 },
				],
			},
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 0, y: 0 },
					{ x: 100, y: 4 },
					{ x: 200, y: 8 },
				],
			},
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 0, y: 0 },
					{ x: 100, y: 4 },
					{ x: 200, y: 8 },
				],
			},
			{
				label: 'test',
				isPercentValue: false,
				dataset: [
					{ x: 0, y: 0 },
					{ x: 100, y: 4 },
					{ x: 200, y: 8 },
				],
			},
		],
	};

	constructor(private _xlsService: XlsService) {}

	ngOnInit(): void {
		this._xlsService.chartData$.then((chartData) => (this.barChart = chartData));
	}
}
