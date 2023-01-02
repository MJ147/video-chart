import { Component, OnInit } from '@angular/core';
import { Keyframe, LabelType } from './chart-bar/chart-bar.component';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
	LabelType: typeof LabelType = LabelType;

	chartBarKeyframes: Keyframe[] = [
		{ time: 0, value: 0 },
		{ time: 100, value: 100 },
	];
	constructor() {}

	ngOnInit(): void {}
}
