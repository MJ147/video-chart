import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

export enum LabelType {
	Percent,
	Value,
	Text,
}

export interface TimeKeyframe {
	time: number;
	value: number;
}

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
	@Input() labelType: LabelType = LabelType.Value;
	@Input() label: string = '';
	@Input() group: number = 1;
	@Input() keyframes: TimeKeyframe[] = [];

	percentValue: string = '';

	constructor() {}

	@ViewChild('chartBar') chartBar: ElementRef | null = null;

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		const newspaperSpinning: Keyframe[] = this.mapKeyframes(this.keyframes);

		const newspaperTiming = {
			duration: 4000,
			iterations: 1,
		};
		console.log(this.chartBar?.nativeElement);

		this.chartBar?.nativeElement?.animate(newspaperSpinning, newspaperTiming);
	}

	getCssColorClass(): string {
		switch (this.group) {
			case 1:
			default:
				return 'background-primary';
			case 2:
				return 'background-secondary';
		}
	}

	createPercentValue(value: number, minValue: number, maxValue: number): string {
		const barLength = maxValue - minValue;
		const percentValue = (value / barLength) * 100;

		return `${percentValue}%`;
	}

	mapKeyframes(keyframes: TimeKeyframe[]): Keyframe[] {
		const animationTime = Math.max(...keyframes.map(({ time }) => time));
		const maxValue = Math.max(...keyframes.map(({ value }) => value));

		return keyframes.map((keyframe) => ({ offset: keyframe.time / animationTime, width: `${(keyframe.value / maxValue) * 100}%` }));
	}

	// getBarLabel(): string {
	// 	switch (this.labelType) {
	// 		case LabelType.Text:
	// 		default:
	// 			return this.label;

	// 		case LabelType.Value:
	// 			return `${this.value}`;

	// 		case LabelType.Percent:
	// 			return `${this.percentValue}`;
	// 	}
	// }
}
