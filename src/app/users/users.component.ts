import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hobby } from 'src/shared/hobby.interface';
import { User } from 'src/shared/user.interface';
import { HobbiesService } from '../services/hobbies.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  hobbies: Hobby[] = this.hobbiesService.fetchHobbies();
  ELEMENT_DATA: User[] = this.usersService.fetchUsers();
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'age',
    'gender',
    'phoneNumber',
    'address',
    'dateOfBirth',
    'action',
  ];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  constructor(
    private usersService: UsersService,
    private hobbiesService: HobbiesService
  ) {}

  ngOnInit(): void {
    this.comparingHobbies(this.ELEMENT_DATA, this.hobbies);
  }
  private comparingHobbies(user: User[], hobby: Hobby[]): void {
    const res = user.filter((user: User) => {
      return !hobby.some((hobby: Hobby) => {
        for (let i = 0; i < user.hobbies.length; i++) {
          if (user.hobbies[i] === hobby.id) {
            console.log(hobby.name);
          }
        }
      });
    });
  }
}
