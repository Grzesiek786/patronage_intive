import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/shared/user.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    const fullUrl: string = this.prepareFullUrl(url);
    return this.httpClient.get<T>(fullUrl);
  }

  private prepareFullUrl(url: string): string {
    return `${this.apiUrl}/${url}`;
  }

  public delete<T>(user: User): Observable<T> {
    const url: string = `${this.apiUrl}/${user.id}`;
    return this.httpClient.delete<T>(url);
  }

  public post<T>(t: T, url: string): Observable<T> {
    return this.httpClient.post<T>(this.prepareFullUrl(url), t, httpOptions);
  }

  public put<T>(user: User): Observable<T> {
    const url: string = `${this.apiUrl}/${user.id}`;
    return this.httpClient.put<T>(url, user, httpOptions);
  }
}
