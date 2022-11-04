import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './events/event-form.component';
import { EventsListComponent } from './events/events-list.component';
import {EditEventComponent} from "./events/edit-event.component";

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent,
  },
  {
    path: 'add',
    component: EventFormComponent,
  },
  {
    path: 'edit/:id',
    component: EditEventComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
