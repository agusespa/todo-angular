import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../../http.service";
import { Item } from "./item";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
    editable = false;

    @Input() item: Item = {} as Item;
    @Output() remove = new EventEmitter<Item>();

    constructor(private httpService: HttpService) {}

    ngOnInit(): void {}

    saveItem(title: string): void {
        this.item.title = title;
        this.httpService.putTask(this.item).subscribe();

        this.editable = false;
    }

    checkIsDone(event: Event): void {
        const status = (<HTMLInputElement>event.target).checked;
        this.item.done = status;
        this.httpService.putTask(this.item).subscribe();
    }

    setDate(event: Event): void {
        const date = (<HTMLInputElement>event.target).value;
        this.item.dueDate = date;
    }
}
