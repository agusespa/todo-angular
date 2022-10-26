import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Store} from "@ngrx/store";
import {TasksAPIService} from "../tasksAPI.service";
import {Item} from "./item";
import {State} from "../store/tasks.reducer";
import {editItem} from "../store/tasks.actions";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
    @Input() item: Item;
    @Output() remove = new EventEmitter<Item>();

    editable = false;

    newDate: string;
    currentDate: number;
    itemDate: number;

    // editedItem: Item = {
    //     id: this.item.id,
    //     title: this.item.title,
    //     done: this.item.done,
    //     dueDate: this.item.dueDate
    // }

    constructor(private httpService: TasksAPIService, private store: Store<State>) {
    }

    ngOnInit(): void {
        this.currentDate = new Date().setHours(0, 0, 0, 0);
        if (this.item.dueDate) {
            this.itemDate = new Date(this.item.dueDate).setHours(0, 0, 0, 0);
        }
    }

    saveItem(title: string): void {
        const editedItem: Item = {
            id: this.item.id,
            title: title,
            done: this.item.done,
            dueDate: this.newDate
        }
        this.store.dispatch(editItem({editedItem}));

        // this.editedItem.title = title;
        // this.store.dispatch(editItem({this.editedItem}));

        this.editable = false;
    }

    checkIsDone(event: Event): void {
        const editedItem: Item = {
            id: this.item.id,
            title: this.item.title,
            done: (<HTMLInputElement>event.target).checked,
            dueDate: this.item.dueDate
        }
        this.store.dispatch(editItem({editedItem}));
    }

    setDate(event: Event): void {
        this.newDate = (<HTMLInputElement>event.target).value;
    }
}
