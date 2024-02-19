// @ts-nocheck
import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {PointsService} from "../../services/points.service";
import {Point} from "../../models/point";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";

@Component({
  selector: 'app-player',
  standalone: true,
    imports: [
        NgForOf,
        MatTooltipModule,
        MatIcon,
        NgIf,
    ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnDestroy {
    unsubscribe$: Subject<boolean> = new Subject();
    points: Array<Point> = [];
    //     = [
    //     {number: 1, name: 'a', x: 0, y: 0},
    //     {number: 2, name: 'b', x: 0, y: 0},
    //     {number: 3, name: 'c', x: 0, y: 0},
    //     {number: 4, name: 'd', x: 0, y: 0},
    //     {number: 5, name: 'd', x: 0, y: 0},
    //     {number: 6, name: 'd', x: 0, y: 0},
    //     {number: 7, name: 'd', x: 0, y: 0},
    //     {number: 8, name: 'd', x: 0, y: 0},
    //     {number: 9, name: 'd', x: 0, y: 0},
    // ];

    pointsMapped: any;

    constructor(private pointsService: PointsService) {
        this.pointsService.getPoints()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.points = data;

                this.pointsMapped = this.points.map((el, i) => {
                    if (i % 2 === 0) {
                        return [this.points[i], this.points[i + 1]]
                    }
                    return;
                }).filter((el) => el !== undefined);
            })
    }

    onClickPlay() {}

    onClickStop() {}

    ngOnDestroy() {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }
}
