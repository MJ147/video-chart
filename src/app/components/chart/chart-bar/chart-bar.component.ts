import { animate, AnimationKeyframesSequenceMetadata, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

export enum LabelType {
	Percent,
	Value,
	Text,
}

export interface Keyframe {
	value: number;
	time: number;
}

function getKeyframes(): AnimationKeyframesSequenceMetadata {
	return keyframes([
		style({ width: '{{keyframe1}}%', offset: 0 }),
		style({ width: '{{keyframe2}}%', offset: 0.5 }),
		style({ width: '{{keyframe3}}%', offset: 1 }),
	]);
}

@Component({
	selector: 'app-chart-bar',
	templateUrl: './chart-bar.component.html',
	styleUrls: ['./chart-bar.component.scss'],
	animations: [
		trigger('keyframes', [
			state('fadeIn', style({ width: '0%' })),
			state('fadeOut', style({ width: '100%' })),
			transition('* => fadeOut', [animate('5s .5s', getKeyframes())]),
		]),
	],
})
export class ChartBarComponent implements OnInit {
	@Input() labelType: LabelType = LabelType.Value;
	@Input() label: string = '';
	@Input() group: number = 1;
	@Input() keyframes: Keyframe[] = [];

	percentValue: string = '';
	animationState: 'fadeIn' | 'fadeOut' = 'fadeIn';

	constructor() {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.animationState = 'fadeOut';
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
