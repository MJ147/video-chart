import { ChartBar } from './../../../models/chart-bar.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TimeKeyframe } from 'src/app/models/chart-bar.interface';
import { XlsService } from 'src/app/services/xls/xls.service';

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
})
export class ChartBarComponent implements OnInit {
	@Input() chartBar: ChartBar | null = null;

	animationTime: number = 0;
	maxValue: number = 0;
	value: number = 0;

	constructor() {}

	@ViewChild('chartBarRef') chartBarRef: ElementRef | null = null;

	ngOnInit(): void {
		if (this.isChartBarNullish(this.chartBar)) {
			return;
		}

		this.animationTime = Math.max(...this.chartBar.keyframes.map(({ time }) => time));
		this.maxValue = Math.max(...this.chartBar.keyframes.map(({ value }) => value));

		setInterval(() => {
			this.setValue(this.chartBar?.isPercentValue ?? false);
		}, 100);
	}

	ngAfterViewInit(): void {
		if (this.isChartBarNullish(this.chartBar)) {
			return;
		}

		const mappedKeyframes: Keyframe[] = this.mapKeyframes(this.chartBar.keyframes);

		const animationTiming = {
			duration: this.animationTime,
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

	private mapKeyframes(keyframes: TimeKeyframe[]): Keyframe[] {
		return keyframes.map((keyframe) => {
			return {
				offset: keyframe.time / this.animationTime,
				width: `${(keyframe.value / this.maxValue) * 100}%`,
			};
		});
	}

	setValue(isPercentValue: boolean): void {
		const max = this.chartBarRef?.nativeElement?.parentNode?.offsetWidth;
		const progress = this.chartBarRef?.nativeElement?.offsetWidth;
		const maxValue = isPercentValue ? 100 : this.maxValue;
		this.value = Math.round((progress / max) * maxValue);
	}

	isChartBarNullish(chartBar: ChartBar | null): chartBar is null {
		return this.chartBar == null;
	}
}
