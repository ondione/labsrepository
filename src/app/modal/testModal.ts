
import { Component, Injectable, Directive, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductServices } from '../services/products.service';
import { sharedService } from '../services/shared.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

/**
 * Options passed when opening a confirmation modal
 */
interface ConfirmOptions {
  /**
   * The title of the confirmation modal
   */
  title: string,

  /**
   * The message in the confirmation modal
   */
  message: string
  /**
   * The contenu in the confirmation modal
   */

  contenu: number

  /**
   * The style in the confirmation modal
   */
  style: Object

  /**
   * The object for payment process
   */

  params: Object

  /**
  * The object for payment process
  */

  ispaid: Boolean
  isPayable: boolean

  contacts : Object
  contact : number


}

/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable()
export class ConfirmState {
  /**
   * The last options passed ConfirmService.confirm()
   */
  options: ConfirmOptions;

  /**
   * The last opened confirmation modal
   */
  modal: NgbModalRef;

  /**
   * The template containing the confirmation modal component
   */
  template: TemplateRef<any>;
}

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {

  constructor(private modalService: NgbModal, private state: ConfirmState) { }

  /**
   * Opens a confirmation modal
   * @param options the options for the modal (title and message)
   * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
   * the user chooses not to confirm, or closes the modal
   */
  confirm(options: ConfirmOptions): Promise<any> {
    this.state.options = options;
    this.state.modal = this.modalService.open(this.state.template);
    return this.state.modal.result;
  }
}

/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
  selector: 'confirm-modal-component',
  template: `<div class="modal-header {{options.style.color}}">
                <button type="button" class="close {{options.style.color}}" aria-label="Close" (click)="close()">
                  <span aria-hidden="true">&times;</span>
                </button>
                 <h4 class="modal-title "><img src="../../assets/images/{{options.style.img}}"  width="45" height="45" /> {{ options.title}}</h4>
              </div>
              <div class="modal-body" *ngIf="!options.ispaid">
                <div class="row"  *ngIf="options.message">
                  <label class="col-sm-3 control-label">Libelle:</label>
                  <div class="col-sm-6"> 
                      <input type="text" name="message"  [(ngModel)]="options.message" class="form-control"  readonly/>
                  </div>
                </div>
                <div >&nbsp;</div>
                <div class="row" *ngIf="options && options.contenu">
                  <label class="col-sm-3 control-label">Total:</label>
                  <div class="col-sm-6">
                      <input type="text" name="total" [(ngModel)]="options.contenu" class="form-control" readonly/>
                  </div>
                </div>
                <div >&nbsp;</div>
                <div class="row" *ngIf="options.contacts.length > 0">
                  <label class="col-sm-3 control-label">Client:</label>
                  <div class="col-sm-6">
                    <select name="contact" [(ngModel)]="contact"   class="form-control"  >
                        <option *ngFor="let curcts of options.contacts" [ngValue]="curcts" >{{curcts.prenom}} {{curcts.nom}}  ( {{curcts.telephone}} )  </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button *ngIf="options.ispaid && options.isPayable" type="button" class="btn btn-primary" (click)="print(options.params,contact)">Generer Facture</button>
                <button *ngIf="!options.ispaid" type="button" class="btn btn-{{options.style.btn}}"  (click)="sendProcess(options,contact)"> Payer Facture</button>
                <button type="button" class="btn btn-secondary" (click)="reset(options.isPayable)">Fermer</button>
              </div>`,
              providers:[ProductServices]
             
})


export class ConfirmModalComponent {

  options: ConfirmOptions;
  constructor(private state: ConfirmState,private prodService: ProductServices,private shareserv: sharedService) {
    this.options = state.options;
  }

  contact;

  close() {
    this.state.modal.close('confirmed');
  }

  reset(isp: boolean) {
    if (isp === true) {
      this.close();
    }else{
      this.state.modal.close('rejected')
    }
  }

  sendProcess(_options, contact) {

    let _params = {
      params : _options.params,
      provider: _options.provider,
      payAmount:_options.payAmount,
      canCheckBalance: _options.canCheckBalance
    };
    return this.prodService.paymentProcess(_params, contact)
      .subscribe( data => {
        if (data["status"] === 'success' && data["response"] === 'OK') {
          this.options.ispaid = true;
          this.options.isPayable = true;
          this.options.title = 'Payment succesfully done';
          this.prodService.removePanier();
        }else if(data["status"] === 'failed' && data["response"] === 'KO'){
          this.options.ispaid = true;
          this.options.isPayable = false;
          this.options.title = 'Balance is less than Payment amount.\n Try to pay with Cash';
        }
      });
  }

  print(params, contact) {
    let type = "invoice";
    return this.prodService.printpdfReceipe({params,contact,type}).subscribe(data => {
      if(data["filename"] && data["messageOut"] === "Pdf successfully generated" && data["status"] === "OK") {
        this.options.title = data["messageOut"];
        this.state.modal.close('confirmed');
        let filename = data["filename"].toString();
        let blob = data["blobFile"];
        this.shareserv.generatePDF(filename,blob);
      }
    });
  }
}

/**
 * Directive allowing to get a reference to the template containing the confirmation modal component,
 * and to store it into the internal confirm state service. Somewhere in the view, there must be
 *
 * ```
 * <template confirm>
 *   <confirm-modal-component></confirm-modal-component>
 * </template>
 * ```
 *
 * in order to register the confirm template to the internal confirm state
 */
@Directive({
  selector: "ng-template [confirm]"
})
export class ConfirmTemplateDirective {
  constructor(confirmTemplate: TemplateRef<any>, state: ConfirmState) {
    state.template = confirmTemplate;
  }
}

// @Component({
//   selector: 'some-applicative-component',
//   templateUrl: './some-applicative-component.html'
// })
// export class SomeApplicativeComponent {
//   constructor(private confirmService: ConfirmService) {}

//   deleteFoo() {
//     this.confirmService.confirm({ title:'Confirm deletion', message: 'Do you really want to delete this foo?' }).then(
//       () => {
//         console.log('deleting...');
//       },
//       () => {
//         console.log('not deleting...');
//       });
//   }
// }
