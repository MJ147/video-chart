import { Component, OnInit } from '@angular/core';
import { BarChart } from 'src/app/interfaces/chart-bar.interface';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
	barChart: BarChart = {
		chartBarGroups: [
			{
				groupId: 1,
				chartBars: [
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
				],
			},
			{
				groupId: 2,
				chartBars: [
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
					{
						label: 'test',
						isPercentValue: false,
						keyframes: [
							{ time: 0, value: 0 },
							{ time: 5000, value: 100 },
							{ time: 8000, value: 200 },
						],
					},
				],
			},
		],
	};
	constructor() {}

	ngOnInit(): void {}
}
