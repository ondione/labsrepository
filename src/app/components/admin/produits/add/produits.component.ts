import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators }  from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router }  from '@angular/router';
import { ProductServices} from '../../../../services/products.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css'],
  providers:[ProductServices]
})
export class ProduitsComponent implements OnInit {

  selectedFile: File = null;
  expires = [
    { value:'oui' ,description :'OUI' },
    { value:'non' ,description :'NON' }
  ];
  produit;
  categorie_list;
  isShowDateExp:boolean = false;
  produitForm:FormGroup;

  

  constructor(private http:HttpClient, 
    private prodService: ProductServices,private router:Router ) {}

   

  ngOnInit(){
    this.produit = [
      { value:'oui' ,description :'OUI' },
      { value:'non' ,description :'NON' }
    ];

    this.produit = {
      ref:'',
      categorie:'',
      PU: '',
      nom: '',
      libelle:'',
      image:'',
      date_enreg:'',
      isexpired:'non',
      date_exp:'',
      nbre:''
    };
    this.categorie_list = [ 
      { value:'Alimentaire'},
      { value:'Informatique'}, 
      { value:'Electromenager'}, 
      { value:'Habillement'}, 
      { value:'Immobilier'}, 
      { value:'Education'}
    ];

    this.produitForm = new FormGroup({
      $id: new FormControl(null),
      ref: new FormControl('',[Validators.required]),
      categorie: new FormControl(0,[Validators.required]),
      nom: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
      libelle: new FormControl('',[Validators.required]),
      isexpired: new FormControl('',[Validators.required]),
      date_expired: new FormControl('',[Validators.required]),
      quantite_stock: new FormControl('',[Validators.required]),
      PU: new FormControl(0,[Validators.required])
    });
  }

  onFileSelected($event){
    //console.log($event.target.files[0], " event file 1");
    this.selectedFile = <File>$event.target.files[0];
    //console.log(this.selectedFile, " event file 2 ");
  }

  saveProduct(f){
    f = f.value;
    this.onUpload();

    this.produit = {
      ref:f.ref,
      categorie:f.categorie,
      PU: f.PU,
      nom: f.nom,
      libelle:f.nom,
      image: this.selectedFile.name,
      date_enreg:f.date_enreg,
      isexpired:f.isexpired,
      date_exp:f.date_enreg,
      nbre: f.nbre
    };

    this.prodService.saveProduct(this.produit).subscribe(response=>{
      //console.log(response, " response recu ");
      if(response && response.hasOwnProperty("status") && response["status"] =="success"){
        //console.log( "user saved correctly");
        this.router.navigate(['/listproducts'])
      }
    })

  }

  onUpload(){
    if(this.selectedFile!=null){
      const fd = new FormData();
     // console.log(this.selectedFile," event file 3")
      fd.append('image',this.selectedFile, this.selectedFile.name);
      this.http.post("http://localhost/Projectangular2/api/v1/uploadfiles",fd,{
        reportProgress:true,
        observe:'events'
      }).subscribe( events =>{
        if(events.type == HttpEventType.UploadProgress){
          //console.log('Upload :', Math.round(events.loaded / events.total )* 100 + '%');
        }else if(events.type == HttpEventType.Response){
          //console.log(events);
        }
      })
    } 
  }
  displayDateExp(val){
    if(val=="oui"){
       this.isShowDateExp = true;
    }else{
       this.isShowDateExp = false;
    }
  }
}
