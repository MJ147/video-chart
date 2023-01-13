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

	animationTime: number | null = null;
	maxValue: number | null = null;

	constructor() {}

	@ViewChild('chartBar') chartBar: ElementRef | null = null;

	ngOnInit(): void {
		this.animationTime = Math.max(...this.keyframes.map(({ time }) => time));
		this.maxValue = Math.max(...this.keyframes.map(({ value }) => value));
	}

	ngAfterViewInit(): void {
		const mappedKeyframes: Keyframe[] = this.mapKeyframes(this.keyframes);

		const animationTiming = {
			duration: 4000,
			iterations: 1,
			fill: 'forwards',
		};

		this.chartBar?.nativeElement?.animate(mappedKeyframes, animationTiming);
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

	private mapKeyframes(keyframes: TimeKeyframe[]): Keyframe[] {
		return keyframes.map((keyframe) => {
			if (this.animationTime == null || this.maxValue == null) {
				return {};
			}

			return {
				offset: keyframe.time / this.animationTime,
				width: `${(keyframe.value / this.maxValue) * 100}%`,
			};
		});
	}

	get value(): number {
		console.dir(this.chartBar?.nativeElement?.offsetWidth);

		return this.chartBar?.nativeElement?.offsetWidth;
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
