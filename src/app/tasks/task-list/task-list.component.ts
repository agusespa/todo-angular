import {Component, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {Store} from "@ngrx/store";
import {HttpService} from "../../http.service";
import {Item} from "../item/item";
import {ItemDto} from "../item/itemDto";
import {createItem, loadItems} from "../store/tasks.actions";
import {State} from "../store/tasks.reducer";

@Component({
    selector: "app-tasks",
    templateUrl: "./task-list.component.html",
    styleUrls: ["./task-list.component.scss"],
})
export class TaskList implements OnInit {

    currentDate = new Date();

    items = [];

    constructor(
        private httpService: HttpService,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.httpService.getTasks().subscribe((response) => {
            this.store.dispatch(loadItems({response}));
        });

    }

    //filterItems(filter: string): void {
    //if (filter === "active") this.filteredItems = this.getActiveItems();
    //else if (filter === "completed")
    //this.filteredItems = this.getCompletedItems();
    //else if (filter === "today") {
    //this.filteredItems = this.getTodaysItems();
    //} else if (filter === "overdue") {
    //this.filteredItems = this.getOverdueItems();
    //} else this.filteredItems = this.items;
    //}

    addItem(title: string): void {
        const itemDto: ItemDto = {
            title,
            done: false,
        };
        this.httpService.postTask(itemDto).subscribe((response) => {
            this.store.dispatch(createItem({response}));
        });
    }

    remove(item: Item): void {
        this.httpService.deleteTask(item.id).subscribe();
        //this.buildItemSummary();
        //this.items.splice(this.items.indexOf(item), 1);
    }

    //getActiveItems(): Item[] {
    //return this.items.filter((i) => i.done === false);
    //}

    //getCompletedItems(): Item[] {
    //return this.items.filter((i) => i.done === true);
    //}

    //getTodaysItems(): Item[] {
    //return this.items.filter(
    //(i) =>
    //i.done === false &&
    //i.dueDate !== null &&
    //i.dueDate !== undefined &&
    //new Date(i.dueDate).setHours(0, 0, 0, 0) ===
    //this.currentDate.setHours(0, 0, 0, 0)
    //);
    //}

    //getOverdueItems(): Item[] {
    //return this.items.filter(
    //(i) =>
    //i.done === false &&
    //i.dueDate !== null &&
    //i.dueDate !== undefined &&
    //new Date(i.dueDate).setHours(0, 0, 0, 0) <
    //this.currentDate.setHours(0, 0, 0, 0)
    //);
    //}

    //buildItemSummary(): void {
    //this.itemSummary = {
    //today: this.getTodaysItems().length,
    //active: this.getActiveItems().length,
    //all: this.items.length,
    //overdue: this.getOverdueItems().length,
    //completed: this.getCompletedItems().length,
    //};
    //}
}