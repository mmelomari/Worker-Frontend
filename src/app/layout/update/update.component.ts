import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  action: string = 'Editar'
  title: string = 'Editar Funcionário'
  worker!: Worker;

  constructor(private workerService: WorkerService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.workerService.GetWorkerById(id).subscribe((data) => {
      this.worker = data.employeeData;
    });
  }

  updateWorker(worker: Worker) {
    this.workerService.UpdateWorker(worker).subscribe((data) => {
      this.workerService.showMessage('Funcionário atualizado com sucesso.');
      this.router.navigate(['/'])
    });
  }

}
