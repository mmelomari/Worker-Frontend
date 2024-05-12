import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Worker } from 'src/app/models/worker';
import { WorkerService } from 'src/app/services/worker.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  inputdata:any;
  worker!: Worker;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, 
  private workerService: WorkerService, private router: Router, 
  private ref:MatDialogRef<DeleteComponent>){}

  ngOnInit(): void {
      this.inputdata = this.data;

      this.workerService.GetWorkerById(this.inputdata.id).subscribe(data => {
          this.worker = data.employeeData;
      });
  }

  delete(){
    this.workerService.DeleteWorker(this.inputdata.id).subscribe(data => {
       this.ref.close();
       this.workerService.showMessage('Funcionário excluído.');
       window.location.reload();
    });
  }

  cancel(){
    this.ref.close();
  }

}
