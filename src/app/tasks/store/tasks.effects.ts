import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {concatMap, map, mergeMap} from "rxjs/operators";
import {TasksAPIService} from "../tasksAPI.service";
import * as TasksActions from "./tasks.actions";
import {catchError, of} from "rxjs";

@Injectable()
export class TasksEffects {
    constructor(private actions$: Actions, private tasksService: TasksAPIService) {
    }

    loadTasks$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TasksActions.loadItems),
            mergeMap(() => this.tasksService.getTasks().pipe(
                map(items => TasksActions.loadItemsSuccess({items})),
                catchError(error => of(TasksActions.loadItemsFailure({error})))
            ))
        )
    })

    createTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TasksActions.createItem),
            concatMap((action) =>
                this.tasksService.postTask((action.itemDto)).pipe(
                    map((item) => TasksActions.createItemSuccess({item})),
                    catchError((error) =>
                        of(TasksActions.createItemFailure({error}))
                    )
                )
            )
        );
    });

    deleteTask$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TasksActions.deleteItem),
            concatMap((action) =>
                this.tasksService.deleteTask(action.id).pipe(
                    map(() =>
                        TasksActions.deleteItemSuccess({
                            id: action.id,
                        })
                    ),
                    catchError((error) =>
                        of(TasksActions.deleteItemFailure({error}))
                    )
                )
            )
        );
    });

    updateProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TasksActions.editItem),
            concatMap((action) =>
                this.tasksService.putTask(action.editedItem).pipe(
                    map((editedItem) => TasksActions.editItemSuccess({ editedItem })),
                    catchError(
                        (error) => of(TasksActions.editItemFailure({ error }))
                    )
                )
            )
        );
    });
}
