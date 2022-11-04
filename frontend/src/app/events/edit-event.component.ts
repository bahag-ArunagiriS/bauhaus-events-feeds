import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { EventsService } from './events.service';
import { Event } from '../models/event';
import { FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  event!: Event;
  eventForm!: FormGroup;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  showError(error: any): void {
    this.errorMessage = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
  }

  getEvent(id: string) {
    this.eventsService
      .getEvent(id)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of(); //{} gives error
        })
      )
      .subscribe((event) => {
        this.event = event;
        this.initializeForm();
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

    this.eventsService
      .editEvent(editedEvent)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe((data) => console.log(data));
    this.eventForm.reset();
    this.router.navigate(['']);
  }

  delete(id: string) {
    this.eventsService
      .deleteEvent(id)
      .pipe(
        catchError((err) => {
          this.showError(err);
          return of({});
        })
      )
      .subscribe((data) => console.log(data));
    this.eventForm.reset();
    this.router.navigate(['']);
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      title: [this.event.title],
      description: [this.event.description],
      location: [this.event.location],
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
