import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TimeKeyframe } from 'src/app/interfaces/chart-bar.interface';

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
	@Input() isPercentValue: boolean = false;
	@Input() label: string = '';
	@Input() group: number = 1;
	@Input() keyframes: TimeKeyframe[] = [];

	animationTime: number = 0;
	maxValue: number = 0;
	value: number = 0;

	constructor() {}

	@ViewChild('chartBar') chartBar: ElementRef | null = null;

	ngOnInit(): void {
		this.animationTime = Math.max(...this.keyframes.map(({ time }) => time));
		this.maxValue = Math.max(...this.keyframes.map(({ value }) => value));

		setInterval(() => {
			this.setValue(this.isPercentValue);
		}, 100);
	}

	ngAfterViewInit(): void {
		const mappedKeyframes: Keyframe[] = this.mapKeyframes(this.keyframes);

		const animationTiming = {
			duration: this.animationTime,
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
			return {
				offset: keyframe.time / this.animationTime,
				width: `${(keyframe.value / this.maxValue) * 100}%`,
			};
		});
	}

	setValue(isPercentValue: boolean): void {
		const max = this.chartBar?.nativeElement?.parentNode?.offsetWidth;
		const progress = this.chartBar?.nativeElement?.offsetWidth;
		const maxValue = isPercentValue ? 100 : this.maxValue;
		this.value = Math.round((progress / max) * maxValue);
	}
}
