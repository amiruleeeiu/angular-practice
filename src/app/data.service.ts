import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:9000/data';

  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    return this.http
      .get<any>(`http://localhost:9000/data${url}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getDataById(id: number): Observable<any> {
    return this.http
      .get<any>(`http://localhost:9000/data/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  saveService(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  editService(data: any) {
    return this.http.put(`http://localhost:9000/data/${data.id}`, data);
  }
  deleteService(id: any) {
    return this.http.delete(`http://localhost:9000/data/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'UnKnown Error';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
