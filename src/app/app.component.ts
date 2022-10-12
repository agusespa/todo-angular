import { Component } from "@angular/core";
import { Item } from "./item";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  title = "tasks";

  filter: "all" | "active" = "active";

  items = [
    { title: "To do item 1", isDone: false },
    { title: "To do item 2", isDone: true },
    { title: "To do item 3", isDone: false },
    { title: "To do item 4", isDone: true },
  ];

  getItems() {
    if (this.filter === "all") return this.items;
    return this.items.filter((item) => item.isDone === false);
  }

  addItem(title: string) {
    console.log(title);
    this.items.push({
      title,
      isDone: false,
    });
  }

  remove(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
