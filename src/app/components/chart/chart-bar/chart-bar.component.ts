import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartBarComponent implements OnInit {
	@Input() label: string = '';
	@Input() group: number = 1;
	@Input() set percent(percent: number) {
		this.percentString = this.createPercentValue(percent);
	}

	percentString = this.createPercentValue(0);

	constructor() {}

	ngOnInit(): void {}

	getCssColorClass(): string {
		switch (this.group) {
			case 1:
			default:
				return 'background-primary';
			case 2:
				return 'background-secondary';
		}
	}

	createPercentValue(number: number): string {
		if (number < 0.1) {
			number = 0.1;
		}

		return `${number}%`;
	}
}
