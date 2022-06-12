import { HeroService } from './../hero.service';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?:Hero;
  constructor(private _HeroService: HeroService,
              private _Location: Location,
              private _ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHero()
  }
  getHero():void{
    const id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._HeroService.getHero(id).subscribe(hero => this.hero = hero);
  }
  goBack():void{
    this._Location.back()
  }
}
