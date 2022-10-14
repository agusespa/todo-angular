import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
    @Output() filterClick = new EventEmitter<string>();

    activeFilter: string = "all";

    constructor() {}

    ngOnInit(): void {}

    filterItems(filter: string) {
        this.activeFilter = filter;
        this.filterClick.emit(filter);
    }
}
