import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Item } from "./item/item";
import { ItemDto } from "./item/itemDto";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TasksService {
    private url = "http://localhost:8080/tasks";

    constructor(private http: HttpClient) {}

    getTasks(): Observable<Item[]> {
        return this.http.get<Item[]>(this.url).pipe(
            catchError(this.handleError)
        );
    }

    postTask(item: ItemDto): Observable<Item> {
        return this.http.post<Item>(this.url, item).pipe(
            catchError(this.handleError)
        );
    }

    putTask(item: Item) {
        return this.http.put<Item>(this.url, item);
    }

    deleteTask(id: number) {
        return this.http.delete(this.url + "/" + id);
    }

    private handleError(err: any) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
}
