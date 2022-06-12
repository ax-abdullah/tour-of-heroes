import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-app';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private _MessageService: MessageService) { }
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this._MessageService.add('Heroeservice: fetched heroes ')
    return heroes;
  }
}
