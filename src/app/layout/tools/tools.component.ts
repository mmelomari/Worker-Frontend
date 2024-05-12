import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Worker } from 'src/app/models/worker';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Worker>();
  @Input() action!: string;
  @Input() title!: string;
  @Input() workerData: Worker | null = null;

  workerForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      id: new FormControl(this.workerData ? this.workerData.id : 0),
      name: new FormControl(this.workerData ? this.workerData.name : '', [Validators.required]),
      lastName: new FormControl(this.workerData ? this.workerData.lastName : '', [Validators.required]),
      department: new FormControl(this.workerData ? this.workerData.department : '', [Validators.required]),
      office: new FormControl(this.workerData ? this.workerData.office : '', [Validators.required]),
      activity: new FormControl(this.workerData ? this.workerData?.activity : true),
      creationDate: new FormControl(new Date()),
      changeDate: new FormControl(new Date())
    });
  }

  submit() {
    this.onSubmit.emit(this.workerForm.value);
  }
}




