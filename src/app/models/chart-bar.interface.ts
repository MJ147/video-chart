export interface BarChart {
	chartBars: ChartBar[];
}

export interface ChartBar {
	label: string;
	isPercentValue: boolean;
	keyframes: TimeKeyframe[];
}

export interface TimeKeyframe {
	time: number;
	value: number;
}
