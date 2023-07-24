import { Directive,ElementRef,Renderer2, HostListener, HostBinding, PipeTransform, Pipe, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Contact }  from './models/contact';
import 'rxjs/';

@Pipe({
    name: 'searchcontact'
})

export class CustomerFilterContact implements PipeTransform {  
    transform( contacts: Contact[], search:string ) : Contact[] { 
        let filteredContacts: Contact[] = [];
        if(typeof search!= 'undefined' && search.length > 3){
            for( let idx = 0, contact; contact = contacts[ idx ]; idx++ ) {
                let k = 0;
                for(let key in contact){
                    let elem = contact[key].toString().toLowerCase();
                    if( elem && elem.indexOf(search.toLowerCase())!==-1 ){
                        k++;   
                    }
                }
                if(k>0){
                    filteredContacts.push(contact);
                }else{
                    continue;
                }
            }
            return filteredContacts;
        }else{
            return contacts;
        }
    } 
};

/***** Pipe to filter array on keys ********* */
@Pipe({
    name: 'keys'
})
export class KeysPipe implements PipeTransform {
    transform(value, args:string[]=[]) : any {
        let keys = [];
        if(args || args == []){

            var  obj = value[0];
            for (let key in obj) {
                keys.push(key);
            } 
            return keys;
        }
        
    }
}
/***** Pipe to format phone number ********* */
@Pipe({
    name: 'phonePipe'
})
export class PhoneNumberPipe implements PipeTransform {
    transform(value, args:string[]=[]) : any {
        let defaultCountryCode = args[0] || "221";
        let sign ="+";

        if(value.trim().indexOf("+")!=-1){
           value = value.slice(1);
        }
      
        let taille = value.length;
        if( (!args || args.length == 0 ) && !value.startsWith('221')){
            return `${sign} ${defaultCountryCode} ${value}`;
        }
        else if(args.indexOf(value.slice(0,3))!= -1 ){
            let prefix = value.slice(0,3);
            let rest = value.slice(4,taille-1);
            return `${sign} ${prefix} ${rest}`;
        }
        else {
            return `${sign} ${args[0]} ${value}`;
        } 
    }
}

/**** First lette upper case */

@Pipe({
    name: 'PremierLettreEnMajuscuule'
})
export class FirstLetterUpperCase implements PipeTransform {
    transform(value, args:string='') : any {
       var firtsCharacter = value.substring(0,1), 
           rest = value.substring(1);
       let upperCaseLetter = firtsCharacter.toUpperCase();
        return `${upperCaseLetter}${rest}`;
    }
}

/***** Pipe to format files sizes ********* */
const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']; 
const FILE_SIZE_UNITS_LONG = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Pettaby tes', 'Exabytes', 'Zettabytes', 'Yottabytes'];

@Pipe({ name: 'formatFileSize' }) 
export class FormatFileSizePipe implements PipeTransform {
    transform(sizeInBytes: number, longForm: boolean): string {
        const units = longForm ? FILE_SIZE_UNITS_LONG : FILE_SIZE_UNITS;
        let power = Math.round(Math.log(sizeInBytes) / Math.log(1024)); 
        power = Math.min(power, units.length - 1);
        const size = sizeInBytes / Math.pow(1024, power);	//	size	in	new	units	
        const formattedSize	=	Math.round(size	*	100)	/	100;	//	keep	up	to	2	decimals				
        const unit = units[power];
        return `${formattedSize} ${unit}`;
    }
}
@Pipe({
    name:'formatNumber'
})
export class FormatStringToNumber implements PipeTransform{
    transform(entry:any, args: any[]) {
       entry = Array.from(entry.toString());
        var taille = entry.length,j=0;
        if(args && args!=null){
            for( let i = (taille-1) ; i> 0; i--){
                j++;
                if(j%3 == 0){
                    entry.splice(i, 0, '.');
                }
            }
            return entry.join('')+ ' '+args;
        }
    }
}

export class ConvertImageBase64 {
    /**
     * Converts image URLs to dataURL schema using Javascript only.
     *
     * @param {String} url Location of the image file
     * @param {Function} success Callback function that will handle successful responses. This function should take one parameter
     *                            <code>dataURL</code> which will be a type of <code>String</code>.
     * @param {Function} error Error handler.
     *
     * @example
     * var onSuccess = function(e){
     *  document.body.appendChild(e.image);
     *  alert(e.data);
     * };
     *
     * var onError = function(e){
     *  alert(e.message);
     * };
     *
     * getImageDataURL('myimage.png', onSuccess, onError);
     *
     */
    getImageDataURL(url, success, error) {
        var data, canvas, ctx;
        var img = new Image();
        img.onload = function(){
            // Create the canvas element.
            canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            // Get '2d' context and draw the image.
            ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            // Get canvas data URL
            try{
                data = canvas.toDataURL();
                success({image:img, data:data});
            }catch(e){
                error(e);
            }
        }
        // Load image URL.
        try{
            img.src = url;
        }catch(e){
            error(e);
        }
    }
}

/***** Directive for Hightlight ********* */
@Directive({
   selector:'[hightlight]'
})

export class MyDirective {
    constructor(private el:ElementRef, private renderer:Renderer2 ){}
    @HostListener('click') onClick(){
        this.changeElement('red');
    } 
    @HostListener('blur') onblur(){
        this.changeElement('blue');
    }

    @HostListener('focus') onfocus(){
        this.changeElement('orange');
    }
    private changeElement(color:string){
        this.renderer.setStyle(this.el.nativeElement , 'color',color);
        this.renderer.setStyle(this.el.nativeElement , 'font-weight','normal');
        //this.renderer.setStyle(this.el.nativeElement.querySelector('a') , 'underline','none');
    }
}

/***** Directive initialize input value to empty ********* */

@Directive({
   selector:'[EmptyInput]'
})

export class EmptyInputDirective {
    constructor( private el: ElementRef ){}
    @HostListener('click') onClick() {
        this.emptyElement();
    } 
    @HostBinding('style.color') inputcolor : string;
    private emptyElement(){
        this.el.nativeElement.value = '';
        this.inputcolor = 'orange';
    }
}

/*********************** Directive for Email Validator ************/
@Directive({
    selector: '[isEmailValid]',
    providers: [ 
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            //useExisting: forwardRef(() => EqualValidator), 
            multi: true
        }
    ]
})
export class EmailValidatorDirective implements Validator {
    public constructor() {}
    public validate(control: AbstractControl): {[key: string]: any} {
        let emailRegEx = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
        let valid = emailRegEx.test(control.value);
        console.log(valid, " is valid email");
        return control.value < 1 || valid ? null : { 'isEmailValid': true};
    }
}
/**************Confirmation password ******/

@Directive({
    selector: '[validateEqual][formControlName], [validateEqual][formControl], [validateEqual][ngModel]',
    providers: [ 
        { 
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => EqualValidator), 
			multi: true 
        }
    ]
})

export class EqualValidator implements Validator {
    constructor(
        @Attribute('validateEqual') public validateEqual: string, 
        @Attribute('reverse') public reverse: string) {
}

    private get isReverse() {
        if (!this.reverse) return false;
        return this.reverse == "true" ? true: false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value; 
        // control vlaue
        let e = c.root.get(this.validateEqual);

        console.log(v, this.isReverse , e.value )
        // value not equalv ;
        if (e && v !== e.value && !this.isReverse) {
            console.log(c.errors ,e.errors, " errors 1")
            return {
                validateEqual: null
            }
        }
        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            return {
                validateEqual: true
            }
            //delete e.errors['validateEqual'];
           // if (!Object.keys(e.errors).length) e.setErrors(null);
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
           if (c.errors ) c.errors['validateEqual'] = null;
            console.log(c ,e, " errors 2")
            return {
                validateEqual: null
            }
        }
        //return null;
    }
}

/*export class EqualValidator implements Validator {
    constructor(  @Attribute('validateEqual') public validateEqual: string ) {}
    validate( c: AbstractControl): { [key: string]: any } {
        let v = c.value;
            // control value (e.g. password)
        let e = c.root.get(this.validateEqual);
        var isEqual = null;
            // value not equal
           // c.root.value.confirmPassword
        console.log(e.value," confirm and password ", v)
        if(e && v!= e.value) {
           isEqual = false;
        }
        return { validateEqual: isEqual };
       
    }
} */
