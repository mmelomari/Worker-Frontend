import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  action = "Cadastrar"
  title = "Cadastrar Funcionário"

  constructor(private workerService: WorkerService, private router: Router) { }

  createWorker(worker: Worker) {
    this.workerService.CreateWorker(worker).subscribe((data) => {
      this.workerService.showMessage('Funcionário cadastrado com sucesso.');
      this.router.navigate([''])
    })
  }

}
