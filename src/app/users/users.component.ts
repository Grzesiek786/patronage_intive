import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Hobby } from 'src/shared/hobby.interface';
import { User } from 'src/shared/user.interface';
import { HobbiesService } from '../services/hobbies.service';
import { UsersService } from '../services/users.service';
import { Destroyable } from '../shared/destroyable';
import { takeUntil } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersComponent extends Destroyable implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public hobbies: Hobby[] = [];

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
    const users$: Observable<User[]> = this.usersService.fetchUsers();
    const hobbies$: Observable<Hobby[]> = this.hobbiesService.fetchHobbies();

    combineLatest([users$, hobbies$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([users, hobbies]) => {
        this.handleUserWithHobbiesSubscription(users, hobbies);
        this.deleteUser(users);
      });
  }

  private handleUserWithHobbiesSubscription(
    users: User[],
    hobbies: Hobby[]
  ): void {
    users.forEach((user: User) => {
      if (!user.hobbyNames) {
        user.hobbyNames = [];
      }

      user.hobbies.forEach((hobbyName: string) => {
        const foundHobby: Hobby = hobbies.find(
          (searchedHobby: Hobby) => searchedHobby.id === hobbyName
        );
        user.hobbyNames.push(foundHobby.name);
      });
    });
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
  }

  private deleteUser(users: User[]) {
    console.log(users);
  }

  public editUser(user: User) {
    console.log(user);
    
  }
}
