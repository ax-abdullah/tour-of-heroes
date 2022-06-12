import { HeroService } from './../hero.service';
import { Hero } from './../hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes:Hero[] = [];
  constructor(private _HeroService: HeroService){}
  ngOnInit(): void {
    this.getHeroes()
  }
  getHeroes(){
    this._HeroService.getHeroes().subscribe(heros => this.heroes = heros.slice(1, 5))
  }
}
