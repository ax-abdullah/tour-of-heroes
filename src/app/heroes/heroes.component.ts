import { HEROES } from './../mock-app';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';

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
  heroes = HEROES;
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
    console.log(this.selectedHero);
  }
}
