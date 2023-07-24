export interface Commande {
    id_client?: number
    id_cmd: number;
    nom_client: string;
    prenom_client: string;
    adresse_client: string;
    telephone_client: string;
    description_cmd : string;
    date_enreg: string;
    heure: string;
    coordonnees_geo: string;
}