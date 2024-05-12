import { WorkerService } from 'src/app/services/worker.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Worker } from 'src/app/models/worker';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MyPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página:';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  workers: Worker[] = [];
  workersGeneral: Worker[] = [];
  pageSizeOptions: number[] = [5, 10, 20];
  searchCtrl = new FormControl();

  columnsToDisplay = ['Situation', 'Name', 'LastName', 'Department', 'Office', 'Actions'];

  constructor(private workerService: WorkerService, public matDialog: MatDialog) { }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.workers = this.workersGeneral.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.workerService.GetWorkers().subscribe(data => {
      const employeeData = data.employeeData;

      employeeData.map((item) => {
        item.creationDate = new Date(item.creationDate!).toLocaleDateString('pt-BR')
        item.changeDate = new Date(item.changeDate!).toLocaleDateString('pt-BR')
      });

      this.workers = data.employeeData;
      this.workersGeneral = data.employeeData;
      this.setInitialPageSize();
    });
  }

  setInitialPageSize() {
    if (this.workersGeneral.length > 5) {
      this.workers = this.workersGeneral.slice(0, 5);
    } else {
      this.workers = this.workersGeneral;
    }
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
  
    if (value === '') {
      this.workers = this.workersGeneral.slice(0, 5);
    } else {
      this.workers = this.workersGeneral.filter(worker => {
        return worker.name.toLowerCase().includes(value);
      }).slice(0, 5);
    }
  }

  openDialog(id: number) {
    this.matDialog.open(DeleteComponent, {
      data: {
        id: id
      }
    })
  }
}






