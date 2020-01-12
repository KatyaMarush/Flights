import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Worker} from '../interfaces/worker';
import {Flight} from '../interfaces/flight';

@Injectable()
export class WorkerService {
  private url = 'https://interview-mock.herokuapp.com/api/workers/';

  private workersSource = new BehaviorSubject<Worker[]>(null);
  private flightsSource = new BehaviorSubject<Flight[]>(null);
  private selectedWorkerKeySource = new BehaviorSubject<number>(null);
  private selectedFlightKeySource = new BehaviorSubject<number>(null);

  workers$ = this.workersSource.asObservable();
  flights$ = this.flightsSource.asObservable();
  selectedWorkerKey$ = this.selectedWorkerKeySource.asObservable();
  selectedFlightKey$ = this.selectedFlightKeySource.asObservable();

  constructor(private http: HttpClient) { }

  getWorkers() {
    this.http.get(this.url).subscribe(workers => {
      this.workersSource.next(workers as Worker[]);

      if (workers) {
        this.updateWorkerKey(0);
        this.getFlights(workers[0].id);
      }
    });
  }

  getFlights(workerId) {
    const url = `${this.url}${workerId}`;

    this.http.get(url).subscribe(flights => {
      this.flightsSource.next(flights as Flight[]);
      this.updateFlightKey(0);
    });
  }

  getWorkerByKey(key) {
    return this.workersSource.value[key];
  }

  getWorkerIdByKey(key) {
    return this.workersSource.value[key].id;
  }

  getSelectedWorkerKey() {
    return this.selectedWorkerKeySource.value;
  }

  getSelectedFlightKey() {
    return this.selectedFlightKeySource.value;
  }

  getFlightsByWorkerKey(key) {
    const worker = this.getWorkerByKey(key);
    this.getFlights(worker.id);
  }

  updateWorkerKey(key) {
    this.selectedWorkerKeySource.next(key);
  }

  updateFlightKey(key) {
    this.selectedFlightKeySource.next(key);
  }

  getFlightByKey(key) {
    return this.flightsSource.value ?
      this.flightsSource.value[key] :
      null;
  }

  refreshFlightInfo() {
    if (this.flightsSource.value !== null) {
      const key = this.getSelectedFlightKey();
      this.updateFlightKey(key);
    }
  }

  updateFlights() {

    const workerKey = this.getSelectedWorkerKey();
    if (workerKey !== null) {
      const workerId = this.getWorkerIdByKey(workerKey);
      const url = `${this.url}${workerId}`;

      this.http.get(url).subscribe(flights => {
        this.flightsSource.next(flights as Flight[]);
        this.refreshFlightInfo();

      });
    }
  }
}

