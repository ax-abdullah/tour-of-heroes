import { MessageService } from './../message.service';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  hero:Hero = {
    id: 1,
    name: 'windstrom'
  }
  heroes:Hero[] = [];
  // inject the service
  // the paramerter simultaneously defines a private parameter property and identifies it as a service parameter injection site .
  constructor(private _HeroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes():void{
    this._HeroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }
  add(name: string):void{
    name = name.trim();
    if(!name) return;
    this._HeroService.addHero({name} as Hero).subscribe(hero => {
      this.heroes.push(hero)
    })
  }
  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this._HeroService.deleteHero(hero.id).subscribe();
  }
}
