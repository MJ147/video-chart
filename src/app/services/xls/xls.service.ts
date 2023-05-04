import { Injectable } from '@angular/core';
import { BarChart, ChartBar } from 'src/app/models/chart-bar.interface';
import { read, utils } from 'xlsx';

@Injectable({
	providedIn: 'root',
})
export class XlsService {
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
		const barChartData: BarChart = { chartBars: [] };
		xlsData.slice(0, 5).forEach((dataset) => {
			const datasetEntries = Object.entries(dataset).slice(0, -2);
			// const label = datasetEntries[datasetEntries.length - 1][1];
			const label = 'test';
			const keyframes = datasetEntries.map((entry) => ({ time: Number(entry[0]), value: Number(entry[1]) }));
			const chartBar: ChartBar = { isPercentValue: false, keyframes, label };
			barChartData.chartBars.push(chartBar);
		});

		return barChartData;
	}

	async setChartData(): Promise<BarChart> {
		const xlsData = await this.readXls();

		return this.convertToChartData(xlsData);
	}

	get chartData$(): Promise<BarChart> {
		return this._chartData$;
	}
}
