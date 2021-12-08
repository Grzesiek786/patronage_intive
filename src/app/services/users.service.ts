import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/shared/user.interface';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private httpService: HttpService, private httpClient: HttpClient) {}

  public fetchUsers(): Observable<User[]> {
    return this.httpService.get<User[]>('users');
  }

  public deleteUser(user: User): Observable<User> {
    return this.httpService.delUser<User>(user);
  }

  public addUser(user: User): Observable<User> {
    return this.httpService.addUser<User>(user);
  }

  public updateUser(user: User): Observable<User> {
    return this.httpService.updateUser<User>(user);
  }
}
