import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ToastrService } from './common/toastr.service';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { CreateEventComponent,
  EventDetailsComponent,
  EventListResolver,
  EventRouteActivator,
  EventService,
  EventsListComponent,
  EventThumbnailComponent } from './events/index';
import { NavBarComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";



@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component
  ],
  providers: [
    EventService,
    ToastrService,
    EventRouteActivator,
    EventListResolver,
    { provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you realy want to cancel?')
  return true
}