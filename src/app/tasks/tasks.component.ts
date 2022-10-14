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
    items = new Array<Item>();

    filter= '';

    filteredItems = new Array<Item>();

    constructor(private httpService: HttpService) {}

    ngOnInit() {
        this.httpService.getTasks().subscribe((response) => {
            this.items = response;
            this.filteredItems = response;
        });
    }

    filterItems(filter: string): void {
        if (filter === "active")
            this.filteredItems = this.items.filter((i) => i.done === false);
        else if (filter === "completed")
            this.filteredItems = this.items.filter((i) => i.done === true);
        else if (filter === "today") {
            const currentDate = new Date();
            this.filteredItems = this.items.filter(
                (i) =>
                    i.done === false &&
                    i.dueDate !== null &&
                    i.dueDate !== undefined &&
                    new Date(i.dueDate).setHours(0, 0, 0, 0) ===
                        currentDate.setHours(0, 0, 0, 0)
            );
        } else if (filter === "overdue") {
            const currentDate = new Date();
            this.filteredItems = this.items.filter(
                (i) =>
                    i.done === false &&
                    i.dueDate !== null &&
                    i.dueDate !== undefined &&
                    new Date(i.dueDate).setHours(0, 0, 0, 0) <
                        currentDate.setHours(0, 0, 0, 0)
            );
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
