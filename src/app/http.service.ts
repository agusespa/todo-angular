import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Item } from "./item";
import {ItemDto} from "./itemDto";

@Injectable({
    providedIn: "root",
})
export class HttpService {
    private url = "http://localhost:8080/tasks";

    constructor(private http: HttpClient) {}

    getTasks() {
        return this.http.get<Item[]>(this.url);
    }

    postTask(item: ItemDto) {
        return this.http.post<Item>(this.url, item);
    }

    putTask(item: Item) {
        return this.http.put<Item>(this.url, item);
    }
}
