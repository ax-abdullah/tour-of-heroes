import { HEROES } from './../mock-app';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero?:Hero;
  hero:Hero = {
    id: 1,
    name: 'windstrom'
  }
  heroes:Hero[] = [];
  // inject the service
  // the paramerter simultaneously defines a private parameter property and identifies it as a service parameter injection site .
  constructor(private _HeroService: HeroService) { }

  ngOnInit(): void {

    this.heroes = this._HeroService.getHeroes();
  }
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }

}
