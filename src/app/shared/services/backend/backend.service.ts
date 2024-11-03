import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Tasks } from '../../models/tasks.class';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  api: string = 'http://127.0.0.1:8000/api/';
  tasks: Tasks[] = [];
  noData: boolean = false;

  constructor(private http: HttpClient) { }

  getAll(endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.api}${endpoint}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'Etwas ist schiefgelaufen; bitte versuchen Sie es später erneut.';
    if (error.error instanceof ErrorEvent) {
      console.error('Ein Fehler ist aufgetreten:', error.error.message);
    } else {
      console.error(`Backend-Fehlercode ${error.status}, Fehlerdetails: ${error.error}`);
    }
    return throwError(() => new Error(errorMsg));
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.api}${endpoint}/`, data);
  }

  getAllTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.api}tasks`).pipe(
      retry(2),
      tap((tasks) => {
        // console.log('Tasks retrieved:', tasks); // Protokolliert die abgerufenen Aufgaben
        this.tasks = tasks; // Speichert die Aufgaben im Service
      }),
      catchError(this.handleError)
    );
  }

  getTasksByStatus(status: string): Tasks[] {
    return this.tasks.filter(task => task.status === status);
  }
  getTasksByPriority(priority: string): Tasks[] {
    return this.tasks.filter(task => task.priority === priority);
  }


}
