import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private scores$ = new BehaviorSubject<number[]>([])

  constructor() { }

  public sendNewScore(scores: number[]){
    this.scores$.next(scores)
  }

  public getScoresAsObservable():Observable<number[]>{
    return this.scores$.asObservable()
  }
}
