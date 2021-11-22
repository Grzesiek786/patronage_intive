import { Injectable } from '@angular/core';
import { User } from 'src/shared/user.interface';
import { users } from 'src/shared/users';
import { HobbiesService } from './hobbies.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = users;

  constructor(private hobbiesService: HobbiesService) {}

  public fetchUsers(): User[] {
    return this.users;
  }
  
}
