import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { response } from '../models/response';
import { Worker } from '../models/worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  private apiUrl = `${environment.apiUrl}Worker`

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  GetWorkers(): Observable<response<Worker[]>> {
    return this.http.get<response<Worker[]>>(this.apiUrl);
  }

  GetWorkerById(id: number): Observable<response<Worker>> {
    return this.http.get<response<Worker>>(`${this.apiUrl}/${id}`);
  }

  CreateWorker(worker: Worker): Observable<response<Worker[]>> {
    return this.http.post<response<Worker[]>>(`${this.apiUrl}`, worker);
  }

  UpdateWorker(worker: Worker): Observable<response<Worker[]>> {
    return this.http.put<response<Worker[]>>(`${this.apiUrl}`, worker);
  }

  InactivateWorker(id: number): Observable<any> {
    const url = `${this.apiUrl}/inactivateWorker?id=${id}`;
    return this.http.put(url, {});
  }

  DeleteWorker(id: number): Observable<response<Worker[]>> {
    return this.http.delete<response<Worker[]>>(`${this.apiUrl}?id=${id}`)
  }

  showMessage(message: string): void {
    this._snackBar.open(message, 'x', {
      duration: 3000,
    });
  }
}
