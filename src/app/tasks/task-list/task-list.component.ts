import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Item } from "../item/item";
import { ItemDto } from "../item/itemDto";
import * as TasksActions from "../store/tasks.actions";
import { getTasks, getError, getFilter, State } from "../store/tasks.reducer";
import { filter, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-tasks",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.scss"],
})
export class TaskList implements OnInit {
    searchTerm = "";

    items$: Observable<Item[]>;

    errorMessage$: Observable<string>;

    activeFilter$: Observable<string>;

    constructor(private store: Store<State>) {}

    ngOnInit() {
        this.store.dispatch(TasksActions.loadItems());
        this.items$ = this.store.select(getTasks);
        this.errorMessage$ = this.store.select(getError);
        this.activeFilter$ = this.store.select(getFilter);
    }

    addItem(title: string): void {
        const itemDto: ItemDto = {
            title,
            done: false,
        };
        this.store.dispatch(TasksActions.createItem({ itemDto }));
    }

    remove(item: Item): void {
        const id = item.id;
        this.store.dispatch(TasksActions.deleteItem({ id }));
    }

    removeErrorMessage(): void {
        this.store.dispatch(TasksActions.deleteError());
    }

    setSearchTerm(term: string) {
        this.searchTerm = term;
    }
}
