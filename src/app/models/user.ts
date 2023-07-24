export interface User {
	id_user?: number;
	firstname: string;
	lastname: string;
	login: string;
	password?: string;
	telephone: string;
	adresse: string;
	role:string;
	isEnabled:string;
}