import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from './events.service';
import { Event } from '../models/event';
import { FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  event!: Event;
  eventForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private fb: FormBuilder
  ) {}

  getEvent(id: string) {
    this.eventsService.getEvent(id).subscribe((event) => {
      this.event = event;
      this.initializeForm(event);
    });
  }

  edit() {
    const form = this.eventForm.value;
    const editedEvent = new Event(
      form.title,
      this.event.id,
      form.description,
      form.location,
      this.event.likes
    );

    this.eventsService.editEvent(editedEvent).subscribe((data) => {
      console.log(data);
    });
    this.eventForm.reset();
  }

  delete(id: string) {
    console.log('deleted');
    this.eventsService.deleteEvent(id).subscribe((data) => console.log(data));
  }

  initializeForm(event: Event) {
    this.eventForm = this.fb.group({
      title: [event.title],
      description: [event.description],
      location: [event.location],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getEvent(id);
  }

  get title() {
    return this.eventForm.get('title')!;
  }

  get description() {
    return this.eventForm.get('description')!;
  }

  get location() {
    return this.eventForm.get('location')!;
  }
}
