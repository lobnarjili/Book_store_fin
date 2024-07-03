import { Category } from "./category";

export class Book {
    id: any;
    code: string;
    name: string;
    prix: number;
    auteur: string;
    image?: string;
//  categorieById: number;
    description: string;
  categoryDTO?: any|undefined |Category;

    constructor(
        id: any,
        code: string,
        name: string,
        prix: number,
        auteur: string,
        image: string,
        // categorieById: number,
        description: string,
        categoryDTO?: Category 

    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.prix = prix;
        this.auteur = auteur;
        this.image = image;
        // this.categorieById = categorieById;
        this.description = description;
        this.categoryDTO= categoryDTO
    }
}

