
export class Book {
    [x: string]: any;
    id: any;
    code!: string;
    name!: string;
    prix!: number;
    auteur!: string;
    image!: string;
    categoryId!: number;
    description!: string;
 // categoryDTO?: any|undefined |Category;

    constructor(
        id: any,
        
      
       
   //     categoryDTO?: Category 

    ) {
        this.id = id;
       
      
        
      //  this.categoryDTO= categoryDTO
    }
}

