import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { hobbies } from 'src/shared/hobbies';
import { Hobby } from 'src/shared/hobby.interface';

@Injectable({
  providedIn: 'root',
})
export class HobbiesService {
  private apiUrl = 'http://localhost:3000/hobbies';
  private hobbies$: Observable<Hobby[]> = of(hobbies);

  constructor(private http: HttpClient) {}

  public fetchHobbies(): Observable<Hobby[]> {
    this.hobbies$ = this.http.get<Hobby[]>(this.apiUrl);
    return this.hobbies$;
  }
}
