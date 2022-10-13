import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";

import { AppComponent } from "./app.component";
import { ItemComponent } from "./item/item.component";
import { TasksComponent } from './tasks/tasks.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, ItemComponent, TasksComponent, SidebarComponent],
  imports: [BrowserModule, HttpClientModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
