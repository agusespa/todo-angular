import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { HttpService } from "../http.service";
import { Item } from "../item";
import { ItemDto } from "../itemDto";
import { ItemSummary } from "../itemSummary";
import { createItem, loadItems } from "../store/actions";
import { State } from "../store/reducer";
import { getTodoItems } from "../store/selectors";

@Component({
    selector: "app-tasks",
    templateUrl: "./tasks.component.html",
    styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
    items = this.getListFromStore();

    //filteredItems = new Array<Item>();

    currentDate = new Date();

    itemSummary: ItemSummary = {} as ItemSummary;

    constructor(
        private httpService: HttpService,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.httpService.getTasks().subscribe((response) => {
            this.store.dispatch(loadItems({ response }));
        });
        console.log(this.items);
    }

    getListFromStore() {
        return this.store.select(getTodoItems).subscribe((value) => {
            console.log(value);
            return value;
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
            this.store.dispatch(createItem({ response }));
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
