import { Injectable } from '@angular/core';
import { hobbies } from 'src/shared/hobbies';
import { Hobby } from 'src/shared/hobby.interface';

@Injectable({
  providedIn: 'root',
})
export class HobbiesService {
  private hobbies: Hobby[] = hobbies;
  
  constructor() {}

  public fetchHobbies(): Hobby[] {
    return this.hobbies;
  }
}
