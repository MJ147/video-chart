export interface BarChart {
	minValue: number;
	maxValue: number;
	duration: number; //ms
	bars: Bar[];
}

export interface Bar {
	label: string;
	isPercentValue: boolean;
	dataset: Point[];
}

export interface Point {
	x: number;
	y: number;
}
