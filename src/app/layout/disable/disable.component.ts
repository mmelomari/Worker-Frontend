import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-disable',
  templateUrl: './disable.component.html',
  styleUrls: ['./disable.component.css']
})
export class DisableComponent implements OnInit {

  worker?: Worker;
  id!: number;

  constructor(private workerService: WorkerService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.workerService.GetWorkerById(this.id).subscribe((data) => {

      const employeeData = data.employeeData;
      employeeData.creationDate = new Date(employeeData.creationDate!).toLocaleDateString('pt-BR');
      employeeData.changeDate = new Date(employeeData.changeDate!).toLocaleDateString('pt-BR');

      this.worker = employeeData;
    });
  }

  inactivateWorker() {
    this.workerService.InactivateWorker(this.id).subscribe((data) => {
      this.workerService.showMessage('Funcionário inativo.');
      this.router.navigate(['']);
    });
  }
}