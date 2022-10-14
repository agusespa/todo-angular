import {
    Component,
    EventEmitter,
    OnInit,
    Input,
    Output,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { ItemSummary } from "../itemSummary";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnChanges {
    @Input() itemSummary = {} as ItemSummary;
    @Output() filterClick = new EventEmitter<string>();

    activeFilter: string = "all";

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges) {
        this.itemSummary = this.itemSummary;
    }

    filterItems(filter: string) {
        this.activeFilter = filter;
        this.filterClick.emit(filter);
    }
}
