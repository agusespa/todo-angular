import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {TasksService} from "../tasks.service";
import * as TasksActions from "./tasks.actions";
import {catchError, of} from "rxjs";

@Injectable()
export class TasksEffects {
    constructor(private actions$: Actions, private tasksService: TasksService) {
    }

    loadTasks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TasksActions.loadItems),
            mergeMap(() => this.tasksService.getTasks().pipe(
                map(items => TasksActions.loadItemsSuccess({items})),
                catchError(error => of(TasksActions.loadItemsFailure({ error })))
            ))
        )
    })
}
