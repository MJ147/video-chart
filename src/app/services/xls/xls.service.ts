import { Injectable } from '@angular/core';
import { BarChart, Bar, Point } from 'src/app/models/chart-bar.interface';
import { read, utils } from 'xlsx';

@Injectable({
	providedIn: 'root',
})
export class XlsService {
	readonly DURATION_TIME: number = 20000;
	private _chartData$: Promise<BarChart>;

	constructor() {
		this._chartData$ = this.setChartData();
	}

	async readXls(): Promise<{ [key: string]: string }[]> {
		const file = await (await fetch('/assets/data-files/chart-data.xls')).arrayBuffer();
		const sheets = read(file);
		const data = utils.sheet_to_json<{ [key: string]: string }>(sheets.Sheets[sheets.SheetNames[0]]);

		return data;
	}

	convertToChartData(xlsData: { [key: string]: string }[]): BarChart {
		const barChart: BarChart = { bars: [], minValue: null, maxValue: null, duration: this.DURATION_TIME };

		xlsData.slice(3, 4).forEach((dataset) => {
			const datasetEntries = Object.entries(dataset).slice(0, -2);
			const label = 'test';
			const keyframes: Point[] = datasetEntries.map((entry) => {
				const x = Number(entry[1]);
				const y = Number(entry[0]);
				barChart.minValue = Math.min(barChart.minValue ?? x, x);
				barChart.maxValue = Math.max(barChart.maxValue ?? x, x);

				return { x, y };
			});
			const chartBar: Bar = { isPercentValue: false, dataset: keyframes, label };
			barChart.bars.push(chartBar);
		});
		console.log(barChart.bars);

		return barChart;
	}

	async setChartData(): Promise<BarChart> {
		const xlsData = await this.readXls();

		return this.convertToChartData(xlsData);
	}

	get chartData$(): Promise<BarChart> {
		return this._chartData$;
	}
}
