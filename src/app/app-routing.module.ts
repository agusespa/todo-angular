import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TaskList} from "./tasks/task-list/task-list.component";

const routes: Routes = [{ path: 'tasks', component: TaskList }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
