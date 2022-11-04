import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventsService } from './events.service';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  modelEvents!: Event[];
  constructor(private eventService: EventsService) {}

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe((events) => (this.modelEvents = events));
  }

  ngOnInit(): void {
    this.getEvents();
  }



  addEvent(event: Event): void {
    this.eventService.addEvent(event)
      .subscribe(() => this.getEvents());
  }
}
