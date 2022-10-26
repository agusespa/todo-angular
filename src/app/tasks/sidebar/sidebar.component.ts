import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import {
    getActiveTasks,
    getAllTasks,
    getCompletedTasks,
    getOverdueTasks,
    getTodaysTasks,
    State
} from "../store/tasks.reducer";
import {setActiveFilter} from "../store/tasks.actions";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {

    searchTerm = "";

    @Input() activeFilter: string | null;
    @Output() searchTermChanged = new EventEmitter<string>();

    allItems$: Observable<number>;
    todaysItems$: Observable<number>;
    activeItems$: Observable<number>;
    completedItems$: Observable<number>;
    overdueItems$: Observable<number>;

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

    onSearchTermChange() {
        this.searchTermChanged.emit(this.searchTerm);
    }

}
