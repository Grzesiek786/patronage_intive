import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/shared/user.interface';
import { users } from 'src/shared/users';
import { HobbiesService } from './hobbies.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users';
  private users$: Observable<User[]> = of(users);

  constructor(private http: HttpClient) {}

  public fetchUsers(): Observable<User[]> {
    this.users$ = this.http.get<User[]>(this.apiUrl);
    return this.users$;
  }
}
