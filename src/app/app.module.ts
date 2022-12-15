import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from '@components/chart/chart.component';
import { ChartBarComponent } from './components/chart/chart-bar/chart-bar.component';

@NgModule({
	declarations: [AppComponent, ChartComponent, ChartBarComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
