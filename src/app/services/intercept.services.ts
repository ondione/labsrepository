import { Injectable } from '@angular/core';
import {  
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest,  
    HttpResponse,
    HttpErrorResponse 
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable ,   } from 'rxjs/';
import { tap } from 'rxjs/operators';
import { catchError} from "rxjs/internal/operators";
import { of  } from 'rxjs';
import { sharedService } from './shared.service';

@Injectable()
export class InterceptService  implements HttpInterceptor {
    JwtToken = null;
    constructor( private sharedServ: sharedService,
    private router: Router) { }
	//intercept request and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
        //console.log(request , " request sent")
        this.JwtToken = this.sharedServ.getUserToken();
        let isUserConnected = this.sharedServ.isUserConnected();
        const isApiUrl = request.url.includes("/Projectangular2/api/v1/");

        if(isUserConnected && this.JwtToken != null && isApiUrl){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.JwtToken}`
                }
            });
            return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        if(event.status!= 200 && event.statusText!="OK"){
                           console.log(event , "event response : No error but status not OK ");
                        }
                    }
                }, error => {
                    //http response status code
                    console.log("----response----");
                    console.error("status code:", error.status);
                    console.error("Error message:",error.message);
                    console.log("--- end of response---");
                })
            )
        }
        //return next.handle(request);
        /**
         * continues request execution
        */
        return next.handle(request).pipe(catchError((error, caught) => {
            //intercept the respons error and displace it to the console
           // console.log(error);
            this.handleAuthError(error);
            return of(error);
        }) as any);
    };

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        //handle your auth error or rethrow
        if (err.status === 401) {
          //navigate /delete cookies or whatever
         // console.log('handled error ' + err.status);
          this.router.navigate([`/login`]);
          // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
          return of(err.message);
        }
        throw new Error(" Execution error");
    }
}