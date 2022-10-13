import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Item } from "../item";
import { ItemDto } from "../itemDto";

@Component({
    selector: "app-tasks",
    templateUrl: "./tasks.component.html",
    styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {

    filter: "all" | "active" | "completed" | "today" | "overdue" = "all";

    items = new Array<Item>();

    filteredItems = new Array<Item>();

    constructor(private httpService: HttpService) {}

    ngOnInit() {
        this.httpService.getTasks().subscribe((response) => {
            this.items = response;
            this.filteredItems = response;
        });
    }

    filterItems(filter: "all" | "active" | "completed" | "today" | "overdue") {
        if (filter === "active")
            this.filteredItems = this.items.filter((i) => i.done === false);
        else if (filter === "completed")
            this.filteredItems = this.items.filter((i) => i.done === true);
        else if (filter === "today") {
        } else if (filter === "overdue") {
        } else this.filteredItems = this.items;
    }

    addItem(title: string): void {
        const itemDto: ItemDto = {
            title,
            done: false,
        };
        this.httpService.postTask(itemDto).subscribe((response) => {
            this.items.push(response);
        });
    }

    remove(item: Item): void {
        this.httpService.deleteTask(item.id).subscribe();
        this.items.splice(this.items.indexOf(item), 1);
    }
}
