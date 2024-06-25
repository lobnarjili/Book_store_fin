export class Book {
    id: any;
    code: string;
    name: string;
    prix: number;
    auteur: string;
    image: string;
    categorieById: number;
    description: string;

    constructor(
        id: any,
        code: string,
        name: string,
        prix: number,
        auteur: string,
        image: string,
        categorieById: number,
        description: string
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.prix = prix;
        this.auteur = auteur;
        this.image = image;
        this.categorieById = categorieById;
        this.description = description;
    }
}