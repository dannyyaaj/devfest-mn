import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import { SpeakersComponent } from './speakers.component';
import { ScheduleComponent } from './schedule.component';
import { AdminNavComponent } from './admin-nav.component';
import { SpeakerSelector } from './speaker-selector.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg",
            authDomain: "devfestmn.firebaseapp.com",
            databaseURL: "https://devfestmn.firebaseio.com",
            storageBucket: "firebase-devfestmn.appspot.com",
        }, {method: AuthMethods.Popup, provider: AuthProviders.Google}),
        RouterModule.forChild([
            {path: '', component: AdminComponent},
            {path: 'speakers', component: SpeakersComponent},
            {path: 'schedule', component: ScheduleComponent},
        ]),
        FormsModule,
        SharedModule,
    ],
    declarations: [
        AdminComponent,
        SpeakersComponent,
        AdminNavComponent,
        ScheduleComponent,
        SpeakerSelector,
    ]
})
export class AdminModule {}