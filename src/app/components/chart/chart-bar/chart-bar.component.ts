import { Bar } from './../../../models/chart-bar.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { min } from 'rxjs';
import { Point } from 'src/app/models/chart-bar.interface';

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
	@Input() chartBar: Bar;
	@Input() minValue: number = 0;
	@Input() maxValue: number = 0;
	@Input() duration: number = 10000;

	yMax: number = 0;
	yMin: number = 0;
	value: number = 0;

	constructor() {}

	@ViewChild('chartBarRef') chartBarRef: ElementRef | null = null;

	ngOnInit(): void {
		this.yMax = Math.max(...this.chartBar.dataset.map(({ y }) => y));
		this.yMin = Math.min(...this.chartBar.dataset.map(({ y }) => y));

		// this.maxValue = Math.max(...this.chartBar.keyframes.map(({ value }) => value));

		setInterval(() => {
			this.updateValue();
		}, 100);
	}

	ngAfterViewInit(): void {
		const mappedKeyframes: Keyframe[] = this.mapKeyframes(this.chartBar.dataset);

		const animationTiming = {
			duration: this.duration,
			iterations: 1,
			fill: 'forwards',
		};

		this.chartBarRef?.nativeElement?.animate(mappedKeyframes, animationTiming);
	}

	createPercentValue(value: number, minValue: number, maxValue: number): string {
		const barLength = maxValue - minValue;
		const percentValue = (value / barLength) * 100;

		return `${percentValue}%`;
	}

	private mapKeyframes(keyframes: Point[]): Keyframe[] {
		return keyframes.map((keyframe) => {
			console.log(
				Math.round(((keyframe.y - this.yMin) / (this.yMax - this.yMin)) * 10000) / 10000,
				`${Math.round(((keyframe.x - this.minValue) / (this.maxValue - this.minValue)) * 10000) / 100}%`,
			);

			return {
				offset: Math.round(((keyframe.y - this.yMin) / (this.yMax - this.yMin)) * 10000) / 10000,
				width: `${Math.round(((keyframe.x - this.minValue) / (this.maxValue - this.minValue)) * 10000) / 100}%`,
			};
		});
	}

	updateValue(): void {
		const max = this.chartBarRef?.nativeElement?.parentNode?.offsetWidth;
		const progress = this.chartBarRef?.nativeElement?.offsetWidth;
		const maxValue = this.chartBar?.isPercentValue ? 100 : this.maxValue;
		this.value = (progress / max) * (maxValue - this.minValue) + this.minValue;
	}
}
