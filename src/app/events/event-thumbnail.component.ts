import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
        <h2>{{event?.name}}</h2>
        <div>Date: {{event?.date}}</div>
        <div [ngSwitch]="event?.time" [ngClass]="getStartTimeClass()">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div>Price: \${{event?.price}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span>&nbsp;</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div [hidden]="!event?.onlineUrl">Online URL: {{event?.onlineUrl}}</div>
        <button class="btn btn-primary" (click)="handleClickMe()">
        Show me the url
        </button>
    </div>
    `,
    styles: [`
        .green { color: #003300 !important; }
        .bold { font-weight: bold; }
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb; }
        .thumbnail { min-height: 250px; }
    `]

})
export class EventThumbnailComponent {
    @Input() event:any
    @Output() eventClick = new EventEmitter()

    handleClickMe() {
        this.eventClick.emit('foo')
    }

    getStartTimeClass() {
        const isEarlyStart = this.event && this.event.time === '8:00 am'
        return {green: isEarlyStart, bold: isEarlyStart}
        /*or return a string with space separated classes
        if (this.event && this.event.time === '8:00 am')
            return 'green bold'
        return ''

        or return ["green", "bold"] //array of strings*/
    }
}