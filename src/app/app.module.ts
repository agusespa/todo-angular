import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { ItemComponent } from "./item/item.component";
import { TasksComponent } from "./tasks/tasks.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
    declarations: [
        AppComponent,
        ItemComponent,
        TasksComponent,
        SidebarComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatIconModule,
        StoreModule.forRoot({}, {}),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
