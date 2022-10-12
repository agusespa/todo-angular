import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Item } from "../item";

@Component({
    selector: "app-item",
    templateUrl: "./item.component.html",
    styleUrls: ["./item.component.scss"],
})
export class ItemComponent implements OnInit {
    editable = false;

    @Input() item!: Item;
    @Output() remove = new EventEmitter<Item>();

    saveItem(title: string) {
        if (!title) return;
        this.item.title = title;
        this.editable = false;
    }

    constructor() {}

    ngOnInit(): void {}
}
