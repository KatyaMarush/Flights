import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkersComponent } from './components/workers/workers.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import {WorkerService} from './services/worker.service';
import {TimeConverterPipe} from './pipes/timeConverter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    FlightsComponent,
    FlightInfoComponent,
    TimeConverterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
