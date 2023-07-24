import {  
    Injectable
 
} from '@angular/core';

import { 
    ActivatedRoute , 
    RouterStateSnapshot, 
    ActivatedRouteSnapshot,
    Router ,
    Resolve 
} from '@angular/router';
import { Observable  } from 'rxjs';

@Injectable()
export class ProductResolver implements Resolve<number[]> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): number[] | Observable<number[]> | Promise<number[]> {
    console.log('Resolve');
    return [new Date().getTime()]; 
  }
}