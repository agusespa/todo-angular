import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {
    getActiveTasks,
    getAllTasks,
    getCompletedTasks,
    getOverdueTasks,
    getTodaysTasks,
    State
} from "../store/tasks.reducer";
import {setActiveFilter} from "../store/tasks.actions";
import {Item} from "../item/item";
import {Observable} from "rxjs";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
    @Input() activeFilter: string | null;
    @Output() filterClick = new EventEmitter<string>();

    allItems$: Observable<Item[]>;
    todaysItems$: Observable<Item[]>;
    activeItems$: Observable<Item[]>;
    completedItems$: Observable<Item[]>;
    overdueItems$: Observable<Item[]>;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.allItems$ = this.store.select(getAllTasks);
        this.todaysItems$ = this.store.select(getTodaysTasks);
        this.activeItems$ = this.store.select(getActiveTasks);
        this.completedItems$ = this.store.select(getCompletedTasks);
        this.overdueItems$ = this.store.select(getOverdueTasks);
    }

    filterItems(filter: string) {
        this.store.dispatch(setActiveFilter({filter}));
    }
}
