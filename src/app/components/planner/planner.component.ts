import {Component, OnDestroy} from '@angular/core';
import {PointsService} from "../../services/points.service";
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef,
    MatRow, MatRowDef,
    MatTable, MatTableDataSource
} from "@angular/material/table";
import {Point} from "../model/point";

@Component({
  selector: 'app-planner',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormField,
        MatInput,
        MatButton,
        MatFormFieldModule,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderRow,
        MatRow,
        MatCellDef,
        MatRowDef,
        MatHeaderRowDef,
        MatHeaderCellDef
    ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent implements OnDestroy {
    unsubscribe$: Subject<boolean> = new Subject();
    pointsForm: FormGroup<any>;

    displayedColumns = ['number', 'name', 'x', 'y']
    pointsDataSource = new MatTableDataSource<Array<Point>>();

    constructor(private pointsService: PointsService, private formBuilder: FormBuilder) {
        this.pointsService.getPoints()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((data) => {
                this.pointsDataSource.data = data;
        })

        this.pointsForm = this.formBuilder.group({
            name: this.formBuilder.nonNullable.control('', Validators.required),
            x: this.formBuilder.nonNullable.control('', Validators.required),
            y: this.formBuilder.nonNullable.control('', Validators.required)
        })
    }

    onSubmitPointsForm() {
        this.pointsService.addPoint(this.pointsForm.value);
        this.pointsForm.reset({});
        Object.keys(this.pointsForm.controls).forEach(key => {
            this.pointsForm.get(key)?.setErrors(null) ;
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next(true);
        this.unsubscribe$.complete();
    }
}
