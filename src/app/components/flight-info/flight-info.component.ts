import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkerService} from '../../services/worker.service';
import {Subscription} from 'rxjs';
import {Flight} from '../../interfaces/flight';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss']
})
export class FlightInfoComponent implements OnInit, OnDestroy {
  flight: Flight;
  subscription: Subscription;

  constructor(private workerService: WorkerService) { }

  ngOnInit() {
    this.subscription = this.workerService.selectedFlightKey$.subscribe(key => this.flight = this.workerService.getFlightByKey(key));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
