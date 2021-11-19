import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/shared/user.interface';
import { Users } from 'src/shared/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ELEMENT_DATA: User[] = Users;
  displayedColumns: string[] = [
    'name',
    'lastName',
    'email',
    'age',
    'gender',
    'phoneNumber',
    'address',
    'dateOfBirth',
    'action'
  ];
  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
}
