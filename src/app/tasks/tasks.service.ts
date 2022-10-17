import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "./item/item";
import { ItemDto } from "./item/itemDto";
import {catchError, Observable, tap} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TasksService {
    private url = "http://localhost:8080/tasks";

    constructor(private http: HttpClient) {}

    getTasks(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url).pipe(
            tap(data => console.log(data))
        );
    }

    postTask(item: ItemDto) {
        return this.http.post<Item>(this.url, item);
    }

    putTask(item: Item) {
        return this.http.put<Item>(this.url, item);
    }

    deleteTask(id: number) {
        return this.http.delete(this.url + "/" + id);
    }
}
