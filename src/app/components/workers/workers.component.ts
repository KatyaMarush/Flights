import { Component, OnInit, OnDestroy } from '@angular/core';
import { Worker } from '../../interfaces/worker'
import { Subscription } from 'rxjs';
import { WorkerService } from '../../services/worker.service'

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {
  workers: Worker[];
  selectedKey: number;
  workersSubscription: Subscription;
  selectedWorkerKeySubscription: Subscription;

  constructor(private workerService: WorkerService) { }

  ngOnInit() {
    this.workersSubscription = this.workerService.workers$.subscribe(workers => this.workers = workers);
    this.selectedWorkerKeySubscription = this.workerService.selectedWorkerKey$.subscribe(key => this.selectedKey = key);
    this.workerService.getWorkers();
  }

  onWorkerClick(key) {
    this.workerService.updateWorkerKey(key);
    this.workerService.getFlightsByWorkerKey(key);
  }
 
  ngOnDestroy() {
    this.workersSubscription.unsubscribe();
    this.selectedWorkerKeySubscription.unsubscribe();
  }
}
