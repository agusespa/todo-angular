import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {Store} from "@ngrx/store";
import { HttpService } from "../../http.service";
import { Item } from "./item";
import {State} from "../store/tasks.reducer";
import {editItem} from "../store/tasks.actions";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
    editable = false;

    @Input() item: Item = {} as Item;
    @Output() remove = new EventEmitter<Item>();

    constructor(private httpService: HttpService, private store: Store<State>) {}

    ngOnInit(): void {}

    saveItem(title: string): void {
        this.item.title = title;
        const item = this.item;
        this.store.dispatch(editItem({item}));
        this.httpService.putTask(this.item).subscribe();

        this.editable = false;
    }

    checkIsDone(event: Event): void {
        const status = (<HTMLInputElement>event.target).checked;
        this.item.done = status;
        const item = this.item;
        this.store.dispatch(editItem({item}));
        this.httpService.putTask(this.item).subscribe();
    }

    setDate(event: Event): void {
        const date = (<HTMLInputElement>event.target).value;
        this.item.dueDate = date;
    }
}
