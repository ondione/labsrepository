import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Router , ActivatedRouteSnapshot ,ActivatedRoute}  from '@angular/router';
import { ProductServices } from '../../../../services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush,

  providers:[ProductServices]
})
export class EditProduitComponent implements OnInit {

  tobeUpdatedproduit;
  id: number = null;
  categorie_list;
  produit;
  expires = [
    { value:'oui' ,description :'OUI' },
    { value:'non' ,description :'NON' }
  ];
  
  constructor(private route: ActivatedRoute,
    private rte: Router,
    private prodservice:ProductServices) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => { 
      this.id = +paramMap.get('id'); // (+) converts string 'id' to a number
      //console.log(this.id , " id recu ");
      this.getProduitById(this.id);
    });   

    this.categorie_list = [ 
      { value:'Alimentaire'},
      { value:'Informatique'}, 
      { value:'Electromenager'}, 
      { value:'Habillement'}, 
      { value:'Immobilier'}, 
      { value:'Education'}
    ];
    this.produit = [
      { value:'oui' ,description :'OUI' },
      { value:'non' ,description :'NON' }
    ];
  }

  getProduitById(id){

    this.prodservice.getProductById(id).subscribe(prod=>{
      //console.log(prod, "prod recu");
      if(prod){
       // console.log(prod, "prod recu");
        this.tobeUpdatedproduit = prod[0];
      }
    });
  }
  updateProduit(f){
    //console.log(f.value, " produit a modifier");
  }
}
