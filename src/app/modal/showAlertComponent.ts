import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { showAlertService } from '../services/showAlertService';
import { debounceTime } from 'rxjs/operators';

@Component({ selector: 'alert', templateUrl: './showAlertComponent.html' })
export class showAlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: showAlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert().pipe( debounceTime(3000) )
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.alertService.clear();
        this.subscription.unsubscribe();
    }
}