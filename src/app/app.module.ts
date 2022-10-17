import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { AppRoutingModule } from './app-routing.module';
import {TasksModule} from "./tasks/tasks.module";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatIconModule,
        TasksModule,
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
