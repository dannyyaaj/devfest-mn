import { of as observableOf, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { DataService, Session } from '../shared/data.service';
import { YearService } from '../year.service';
import { FireJoinPipe } from '../realtime-data/fire-join.pipe';
import { SpeakerSelectorComponent } from './speaker-selector.component';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor, AsyncPipe, KeyValuePipe } from '@angular/common';
import { GetSpeakerPipe } from '../shared/get-speaker.pipe';

@Component({
    templateUrl: './session-edit.component.html',
    standalone: true,
    imports: [
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatAutocompleteModule,
        NgFor,
        MatOptionModule,
        MatButtonModule,
        SpeakerSelectorComponent,
        AsyncPipe,
        KeyValuePipe,
        FireJoinPipe,
        GetSpeakerPipe,
    ],
})
export class SessionEditComponent {
    sessionData: Observable<Session>;

    constructor(
        public ds: DataService,
        public route: ActivatedRoute,
        public router: Router,
        public yearService: YearService
    ) {
        this.sessionData = route.params.pipe(
            switchMap((params) => {
                if (params['id'] === 'new') {
                    return observableOf({ startTime: params['time'], room: params['room'] });
                }
                return ds
                    .getSchedule(yearService.year)
                    .pipe(map((list) => list.find((item) => item.$key === params['id'])));
            })
        );
    }

    save(session) {
        event.preventDefault();
        this.ds.save('schedule', session);
        this.router.navigate(['/', 'schedule']);
    }

    delete(session) {
        this.ds.delete('schedule', session);
        this.router.navigate(['/', 'schedule']);
    }

    deleteSpeakerFromSession(session: Session, speakerKey: string) {
        this.ds.deleteSpeakerFromSession(session, speakerKey);
    }
    getValues(obj) {
        return Object.keys(obj).map((key) => obj[key]);
    }
}
// @Pipe({
//     name: 'getSpeaker',
//     standalone: true,
// })
// export class getSpeaker implements PipeTransform {
//     constructor(private ds: DataService) {
//         console.log('constructing pipe with ds', ds);
//     }

//     transform(value: string, destination: string): any {
//         if (value && destination && this.ds) {
//             console.log('generating observable for speaker at', value);
//             return this.ds
//                 .getSpeaker(value)
//                 .pipe(tap((speaker) => console.log('showing data for speaker', speaker)));
//         }
//     }
// }
