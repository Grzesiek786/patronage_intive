import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hobby } from 'src/shared/hobby.interface';
import { User } from 'src/shared/user.interface';
import { HobbiesService } from '../services/hobbies.service';
import { UsersService } from '../services/users.service';
import { Destroyable } from '../shared/destroyable';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends Destroyable implements OnInit {
  private hobbies: Hobby[] = [];
  private users: User[] = [];

  public hobbiesArray: Hobby[] = [];

  public displayedColumns: string[] = [
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
  public dataSource: MatTableDataSource<User>;

  constructor(
    private usersService: UsersService,
    private hobbiesService: HobbiesService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.comparingHobbies(this.users, this.hobbies);
    this.usersService
      .fetchUsers()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user: User[]) => {
        this.users = user;
        this.dataSource = new MatTableDataSource<User>(this.users);
      });
    this.hobbiesService
      .fetchHobbies()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((hobby: Hobby[]) => {
        this.hobbies = hobby;
      });
  }

  private comparingHobbies(user: User[], hobby: Hobby[]): void {
    // TODO: tuaj też musimy popracować ale to wydaje mi się, że później, jak już ogarniemy pobieranie danych z backendu
    const res = user.map((user: User) => {
      // return !hobby.some((hobby: Hobby) => {
      //   // for (let i = 0; i < user.hobbies.length; i++) {
      //   //   if (user.hobbies[i] === hobby.id) {
      //   //     console.log(hobby.name);
      //   //   }
      //   // }
      // });
      if (user.hobbies) user.hobbies.map((hobby: string) => {});
    });
    // const users = this.usersService.fetchUsers().map(user => {
    //   if (user.hobbies) user.hobbies.map(hobby => this.hobbiesService.findById(hobby))
    //   return user
    // })
  }
}
