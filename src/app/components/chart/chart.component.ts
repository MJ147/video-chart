import { Component, OnInit } from '@angular/core';
import { TimeKeyframe, LabelType } from './chart-bar/chart-bar.component';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
	LabelType: typeof LabelType = LabelType;

	chartBarKeyframes: TimeKeyframe[] = [
		{ time: 0, value: 0 },
		{ time: 80, value: 100 },
		{ time: 100, value: 200 },
	];
	constructor() {}

	ngOnInit(): void {}
}
