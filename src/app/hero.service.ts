import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-app';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private _MessageService: MessageService,
              private _HttpClient: HttpClient) { }

  updateHero(hero: Hero): Observable<any>{
    return this._HttpClient.put(this.heroesURL, hero, this.httpOptions).pipe(tap( _ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updatd hero'))
  );
}
  getHeroes(): Observable<Hero[]> {
    // this._MessageService.add('Heroeservice: fetched heroes ');
    this.log('fetched heroes');
    return this._HttpClient.get<Hero[]>(this.heroesURL).pipe(
      tap( _ => this.log('fetched Heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return this._HttpClient.get<Hero>(url).pipe(
      tap( _ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
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
  addHero(hero: Hero): Observable<Hero>{
    return this._HttpClient.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(tap(
      (newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)
    ),
    catchError(this.handleError<Hero>('addHero')));

  }

  deleteHero(id:number): Observable<Hero>{
    const url = `${this.heroesURL}/${id}`;
    return this._HttpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )

  }
  searchHeroes(term: string):Observable<Hero[]>{
    term = term.trim();
    if(!term) return of([]);


    return this._HttpClient.get<Hero[]>(`${this.heroesURL}/?name=${term}`).pipe(
      tap(x => x.length? this.log(`found heroes matching "${term}"`) :
      this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
