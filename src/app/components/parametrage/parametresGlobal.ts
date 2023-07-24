
import { Component, OnInit,ViewChild , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup , FormControl, Validators} from  '@angular/forms';
import { ParamGeneral } from '../../models/paramGeneral';
import { Router }  from '@angular/router';
import { NgbModal , NgbModalRef,  NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { Store, select } from '@ngrx/store';
import { State } from '../../store_managment/reducers/index';
import { selectedParams  } from '../../store_managment/selectors/appSetting-selector';
import { Observable , Subscription} from 'rxjs';
import { ParametrageService , showAlertService }  from '@/services/index';

@Component({
  selector: 'app-root',
  templateUrl: './parametresGlobal.html',
  styles: ['']
})
export class ParametresGlobalComponent implements OnInit {

    paramG : ParamGeneral = {
        id_param_gen: '',
        login_attempt: '',
        keepConnexion: false,
        reconnect: false,
        session_timeout: '',
        password_complexite: '',
        taux_tva:'',
        format_facture: ''
    };
    private _subscription = new Subscription();

    registerForm: FormGroup;

    @ViewChild( 'content' , { read:"", static:false}) modalView : NgbModalRef ;
   
    constructor(
        private route: Router,
        private modalService: NgbModal,
        private changedetect : ChangeDetectorRef,
        private store: Store<State>,
        private paramServ: ParametrageService,
        private alertServ: showAlertService
    ) { }

    ngOnInit() {

        this.registerForm = new FormGroup({
            $id_param_gen: new FormControl(null),
            login_attempt: new FormControl('',[Validators.required]),
            keepConnexion: new FormControl('', [Validators.required]),
            reconnect: new FormControl('', [Validators.required]),
            session_timeout: new FormControl('', [ Validators.required,  Validators.maxLength(25)]),
            password_complexite: new FormControl('',[Validators.required]),
            taux_tva: new FormControl('',[Validators.required]),
            format_facture: new FormControl('',[Validators.required])
          
        });

        this.store.select(selectedParams).subscribe( settingsParams  =>{
            console.log(settingsParams ,JSON.parse(settingsParams["premiere_connexion"]), " settings params");
            if(settingsParams){
                let premiere_connexion = JSON.parse(settingsParams["premiere_connexion"]);
                this.registerForm.patchValue({
                    $id_param_gen: settingsParams["id_param_gen"],
                    login_attempt: settingsParams["login_attempt"],
                    keepConnexion: premiere_connexion.keepConnexion,
                    reconnect: premiere_connexion.reconnect,
                    session_timeout: settingsParams["session_timeout"],
                    password_complexite: settingsParams["password_complexite"],
                    taux_tva: settingsParams["taux_tva"],
                    format_facture:settingsParams["format_facture"]
                });
            }
        });
    }

    saveParams(form){
        console.log( form.value, " form ")
        let params = form.value;
        var premiere_connexion = JSON.stringify({"keepConnexion": params["keepConnexion"],"reconnect":params.reconnect});
        params["premiere_connexion"] = premiere_connexion;
        params["id_param_gen"] = params.$id_param_gen;
        this._subscription.add(
            this.paramServ.updateParamGeneral(params).subscribe(resp =>{
                
                console.log(resp, " resp update")
                if(resp && resp["reponse"] == "OK"){
                    this.alertServ.success("Param General mise a jour avec success",true);
                   // this.route.navigate(['/contacts']);
                }
            })
        );
    }

    ngOnDestroy(){
        this._subscription.unsubscribe();
    }
}
