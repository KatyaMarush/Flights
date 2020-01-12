import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkerService} from '../../services/worker.service';
import {Subscription} from 'rxjs';
import {Flight} from '../../interfaces/flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit, OnDestroy {
  flights: Flight[];
  selectedKey: number;
  flightsSubscription: Subscription;
  selectedFlightKeySubscription: Subscription;

  constructor(private workerService: WorkerService) { }

  ngOnInit() {
    this.flightsSubscription = this.workerService.flights$.subscribe(flights => this.flights = flights);
    this.selectedFlightKeySubscription = this.workerService.selectedFlightKey$.subscribe(key => this.selectedKey = key);

    this.refreshFlights();
    setInterval(() => {
      this.refreshFlights();
    }, 60000);
  }

  refreshFlights() {
    this.workerService.updateFlights();
  }

  onFlightClick(key) {
    this.workerService.updateFlightKey(key);
  }

  ngOnDestroy() {
    this.flightsSubscription.unsubscribe();
    this.selectedFlightKeySubscription.unsubscribe();
  }
}
