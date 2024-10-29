import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  api: string = 'http://127.0.0.1:8000/api/';

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
}
