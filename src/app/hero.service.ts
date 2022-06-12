import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-app';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'api/heroes';
  constructor(private _MessageService: MessageService,
              private _HttpClient: HttpClient) { }
  getHeroes(): Observable<Hero[]> {
    // this._MessageService.add('Heroeservice: fetched heroes ');
    this.log('fetched heroes');
    return this._HttpClient.get<Hero[]>(this.heroesURL).pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  getHero(id:number): Observable<Hero>{
    const hero = HEROES.find(h => h.id === id)!;
    this._MessageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
  private log(message: string){
    this._MessageService.add(`HeroService: ${message}`);
  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
