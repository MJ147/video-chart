import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

export enum labelType {
	Percent,
	Value,
	Text,
}

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBarComponent implements OnInit {
	@Input() labelType: string = '';
	@Input() label: string = '';
	@Input() group: number = 1;
	@Input() value: number = 0;
	@Input() minValue: number = 0;
	@Input() maxValue: number = 100;

	percentValue: string = '';

	constructor() {}

	ngOnInit(): void {
		this.percentValue = this.createPercentValue(this.value, this.minValue, this.maxValue);
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
}
