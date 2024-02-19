import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Point} from "../models/point";

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private points$: BehaviorSubject<Array<Point>> = new BehaviorSubject([] as Array<Point>);
  private pointNumber = 0;
  private points: Array<Point> = [];

  constructor() { }

    getPoints(): Observable<any> {
      return this.points$.asObservable();
    }

    addPoint(point: Point) {
      this.points.push({...point, number: this.pointNumber++});
      this.points$.next(this.points);
    }
}
