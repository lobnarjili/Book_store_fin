

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { Category } from '../shared/category';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';
import { FileUploadService } from '../services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  //  book!: Book
  book: Book = new Book(null, '', '', 0, '', '', '');

    // = {
  //   id: null,
  //   name: '',
  //   auteur: '',
  //   prix: 0,
  //   description: '',
  //   code: '',
  //   image: '',
  //   categorieById: 0
  // }
  ;
  
  isLoading: boolean = false;
  error: string = '';
  categories: Category[] = [];
  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService,
    private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseUrl: string

  ) {}
  ngOnInit(): void {
    this.getCategories(); 
    this.route.paramMap.subscribe(
      result => {
        let id = result.get('id');
        if (id != "-1") this.initBook(id);
        else
        this.book = new Book(null, '', '', 0, '', '', '');
      }
    )
  }
initBook(id: any) {
  this.bookService.getBookById(id).subscribe(
    book => {
      this.book = book;
    },
    error => {
      console.error('Error fetching Book:', error);
    }
  );
}

  // ngOnInit(): void {
  //   this.getCategories(); // Fetch categories data
  //   this.route.paramMap.subscribe(params => { // Subscribe to route parameter changes
  //     const id = params.get('id'); // Get the 'id' parameter from the route
  //     if (id !== null) { // Check if 'id' parameter exists
  //       const parsedId = +id; // Parse 'id' to a number
  //       if (!isNaN(parsedId)) { // Check if 'parsedId' is a valid number
  //         this.bookService.getBookById(parsedId).subscribe( // Fetch book details by 'id'
  //           book => {
  //             this.book = book; // Assign fetched book details to component property
  //           },
  //           error => {
  //             console.error('Error fetching book:', error); // Log error if book fetch fails
  //           }
  //         );
  //       } else {
  //         console.error('Invalid ID:', id); // Log error if 'id' parameter is not a valid number
  //       }
  //     } else {
  //       console.error('ID not found in params.'); // Log error if 'id' parameter is not present
  //     }
  //   });
  // }
  
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }


  validateBook(): boolean {
    if (!this.book.categoryDTO) {
      this.error = 'Category is required';
      return false;
    }
    return true;
  }



  onSubmit() {

    if (!this.validateBook()) {
      this.isLoading = false;
      return;
    }
      // Assigner categoryDTO avant d'envoyer la requête
      const selectedCategory = this.categories.find(category => category.id === this.book.categoryDTO.id);
      if (selectedCategory) {
        this.book.categoryDTO.id = selectedCategory;
        console.log("wink y category ")
        // Assigner l'objet complet categoryDTO
      } else {
        this.error = 'Selected category is invalid';
        this.isLoading = false;
        console.log("mch jay  ")

        return;
      }




    this.isLoading = true;
    console.log('Book data being sent:', this.book); // Log book data

    if (this.book.id === null) {
      // Ajout d'un nouveau livre
      this.bookService.addBook(this.book).subscribe({
        next: (newBook: Book) => {
          this.error = '';

          this.upload(newBook);
          // this.router.navigateByUrl('/books'); // Redirection vers la liste des catégories après ajout

          console.log(" done deone ddkjidckxnk ")

          // this.router.navigateByUrl('/books'); // Redirection vers la liste des livres après ajout
        },
        error: (err) => {
          this.error = err.message || 'Failed to add book.';
          console.error('Error adding book:', err);
          this.isLoading = false;
        }
      });
    } else {
     
      this.bookService.updateBook(this.book).subscribe({
        next: (updatedBook: Book) => {
          this.error = '';
          this.upload(updatedBook);
          // this.router.navigateByUrl('/books'); // Redirection vers la liste des livres après mise à jour
        },
        error: (err) => {
          this.error = err.message || 'Failed to update book.';
          console.error('Error updating book:', err);
          this.isLoading = false;
        }
      });
    }
  }
  onBooks() {
    this.router.navigateByUrl('/books');
  }
  // onImageChange(event: any): void {
  //   const file = event.target.files[0];
  //   console.log('Selected image:', file);
  // }
 


  /*upload file*/
  selectFile(event: any): void {
    // This function is called when a file is selected by the user
    // It assigns the selected file(s) to the selectedFiles property
    this.selectedFiles = event.target.files;
  }
  upload(book: Book): void {
    // This function uploads the selected file(s) to the server

    // Reset progress to 0 at the beginning of the upload
    this.progress = 0;

    // Check if there are selected files
    if (this.selectedFiles) {
      // Get the first selected file
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        // Assign the current file being uploaded
        this.currentFile = file;

        // Upload the file using the fileUploadService
        this.fileUploadService.upload(this.currentFile, book.id).subscribe({
          next: (event: any) => {
            // Progress event: Update progress bar
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            }
            // Response event: Handle successful upload
            else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              // Redirect to book details page after successful upload
              this.router.navigateByUrl('/books');
              this.isLoading = false; //Desactiver le spinner
            }
          },
          error: (err: any) => {
            // Handle error
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
            this.currentFile = undefined;
          }
        });
      } else {
        // Reset selectedFiles if no file is selected
        this.selectedFiles = undefined;
        // Redirect to book details page
        this.router.navigateByUrl('/books' );
        this.isLoading = false; //Desactiver le spinner
      }
    } else {
      // Redirect to book details page 
      this.router.navigateByUrl('/books' );
      this.isLoading = false; //Desactiver le spinner
    }
  }
}














// import { Component, Inject, OnInit } from '@angular/core';
// import { Book } from '../shared/book';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BookService } from '../services/book.service';

// @Component({
//   selector: 'app-edit-book',
//   templateUrl: './edit-book.component.html',
//   styleUrls: ['./edit-book.component.css']
// })
// export class EditBookComponent implements OnInit{

//  book: Book = new Book(null,'','',0,'','',0,''); 
//  isLoading: boolean = false;
//  errMail: string = '';
//  progress = 0;
//  message = '';

//  constructor(
//   private router: Router,
//   private bookService:BookService,
//   private route: ActivatedRoute,
//   @Inject('BaseURL') public baseUrl: string
// ) {}
// ngOnInit(): void {
//   this.route.paramMap.subscribe(result => {
//     let id = result.get('id');
//     if (id !== '-1') {
//       this.initBook(id);
//     } else {
//       this.book = new Book(null,'','',0,'','',0,''); ;
//     }
//   });
// }

// initBook(id: any) {
//   this.bookService.getBookById(id).subscribe(
//     book => {
//       this.book = book;
//     },
//     error => {
//       console.error('Error fetching Book:', error);
//     }
//   );
// }

// onSubmit() {
//   this.isLoading = true;

//   if (this.book.id == null) {
//     // Ajout d'une nouvelle catégorie
//     this.bookService.addBook(this.book).subscribe({
//       next: (newBook:Book) => {
//         this.errMail = '';
//         this.router.navigateByUrl('/books'); // Redirection vers la liste des catégories après ajout
//       },
//       error: (err) => {
//         this.errMail = err.message || 'Failed to add book.';
//         console.error('Error adding book:', err);
//         this.isLoading = false;
//       }
//     });
//   } else {

//     this.bookService.updateBook(this.book).subscribe({
//       next: (updatedBook: Book) => {
//         this.errMail = '';
//         this.router.navigateByUrl('/books'); // Redirection vers la liste des catégories après mise à jour
//       },
//       error: (err) => {
//         this.errMail = err.message || 'Failed to update book.';
//         console.error('Error updating book:', err);
//         this.isLoading = false;
//       }
//     });
//   }
// }
// }

