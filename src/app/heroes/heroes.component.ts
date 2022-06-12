import { MessageService } from './../message.service';
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
  constructor(private _HeroService: HeroService, private _MessageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes()
  }
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
    this._MessageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  getHeroes():void{
    this._HeroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }

}
