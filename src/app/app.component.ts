import { Component } from "@angular/core";
import { HttpService } from "./http.service";
import { Item } from "./item";
import { ItemDto } from "./itemDto";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    title = "tasks";
   filter: "all" | "active" = "active";

    items = new Array<Item>();

    constructor(private httpService: HttpService) {}

    ngOnInit() {
        this.httpService.getTasks().subscribe(
            (response) => {
                this.items = response;
            }
        );
    }

    addItem(title: string) {
        const itemDto: ItemDto = {
            title,
            isDone: false,
        };
        this.httpService.postTask(itemDto).subscribe(
        (response) => {
                this.items.push(response);
    }
        );
    }

    remove(item: Item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}
