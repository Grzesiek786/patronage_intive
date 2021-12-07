import { Component, Input, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Hobby } from 'src/shared/hobby.interface';
import { HobbiesService } from '../services/hobbies.service';
import { Destroyable } from '../shared/destroyable';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent extends Destroyable implements OnInit {
  public hobbies: Hobby[];

  public form: FormGroup;
  private emailRegx: RegExp =
    /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  public;

  constructor(public fb: FormBuilder, private hobbiesService: HobbiesService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      age: [null, Validators.required],
      gender: [null, [Validators.required]],
      phone: ['+1 (222) 222-2222', Validators.required],
      address: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      hobbies: [null],
    });

    this.getHobbies();
  }

  public submit(): void {
    if (!this.form.valid) return;
    console.log(this.form.value);
  }

  private getHobbies(): void {
    const hobbies$: Observable<Hobby[]> = this.hobbiesService.fetchHobbies();

    hobbies$.pipe(takeUntil(this.destroyed$)).subscribe((hobbies: Hobby[]) => {
      this.hobbies = hobbies;
    });
  }
}
