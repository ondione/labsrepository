export interface Facture{
	id_fact?:number;
	id_client?:string;
	num_fact?:string;
	clientData:object;
	facture_data:object;
	date_enreg?:string;
};