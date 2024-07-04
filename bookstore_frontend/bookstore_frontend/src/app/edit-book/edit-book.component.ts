import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';
import { FileUploadService } from '../services/file-upload.service';
import { Book } from '../shared/book';
import { Category } from '../shared/category';
import { Observable, catchError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  // book: Book = new Book(null, '', '', 0, '', '', 0, '');
  book!:Book;
  //Varable to track loadig state
  isLoading: boolean = false;
  //variable for message duplicate code 
  error: string = '';
  categories: Category[] = [];

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  // httpClient: any;

  constructor(
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    @Inject('BaseURL') public baseURL:any
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.route.paramMap.subscribe(result => {
      let id = result.get('id');
      if ( id !== "-1") 
        this.initBook(id);
      else {
        this.book = new Book(null) // Nouvelle catégorie vide pour l'ajout
      }
    }
  );
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



  isFormValid(): boolean {
    return this.book.name !== '' && this.book.auteur !== '' && this.book.prix > 0 &&
      this.book.description !== '' && this.book.code !== '' &&
      this.book.categoryId !== 0;
  }





  onSubmit(form:NgForm) {
    
    if (!this.isFormValid()) {
      return;
    }
    this.isLoading = true;

    if (this.book.id == null) {
      let categoryId =this.book.categoryId;
      console.log(categoryId)

      this.bookService.addBook(this.book ).subscribe({
        next: (book: Book) => {
          this.error = "";
           this.upload(book);
           console.log("hi upload book ")
           this.router.navigateByUrl('/books');
        },
        error: (err) => {
          // this.error = err.message || 'Failed to add book.';
          this.error = err.message ;
           console.error('Error adding book:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.bookService.updateBook(this.book).subscribe({
        next: (book: Book) => {
          this.error = '';
           this.upload(book);
           console.log("hi uploadbook ")
          this.router.navigateByUrl('/books');
        },
        error: (err) => {
          this.error = err.message;
           console.error('Error updating book:', err);
          this.isLoading = false;
        }
      });
    }
  }
  onBook() {
    this.router.navigateByUrl('/books');
  }

/*upload file*/
selectFile(event: any): void {
  // This function is called when a file is selected by the user
  // It assigns the selected file(s) to the selectedFiles property
  this.selectedFiles = event.target.files;
}

/*
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
            // Redirect to contact details page after successful upload
            // 
            
            this.router.navigateByUrl('/books/' + book.id);
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
      // Redirect to contact details page
      // this.router.navigateByUrl('/books/' + book.id);
      this.router.navigateByUrl('/books/' + book.id);
      this.isLoading = false; //Desactiver le spinner
    }
  } else {
    // Redirect to contact details page 
    this.router.navigateByUrl('/books/' + book.id);
    this.isLoading = false; //Desactiver le spinner
  }*/
    upload(book: Book): void {
      this.progress = 0;
    
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);
    
        if (file) {
          this.currentFile = file;
    
          this.fileUploadService.upload(this.currentFile, book.id).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.router.navigateByUrl('/books/' + book.id);
                this.isLoading = false;
              }
            },
            error: (err: any) => {
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
          this.selectedFiles = undefined;
          this.router.navigateByUrl('/books');
          this.isLoading = false;
        }
      } else {
        this.router.navigateByUrl('/books/' + book.id);
        this.isLoading = false;
      }
    }
    
}






























//   onSubmit(form:NgForm): void {
//     if (!this.isFormValid()) {
//       return;
//     }

//     this.isLoading = true;

//     if (this.book.id === null) {
//       this.bookService.addBook(this.book).subscribe({
//         next: (book: Book) => {
//           this.error = '';
//            this.upload(book);
//           // this.router.navigateByUrl('/books');
//         },
//         error: (err) => {
//           this.error = err.message || 'Failed to add book.';
//            console.error('Error adding book:', err);
//           this.isLoading = false;
//         }
//       });
//     } else {
//       this.bookService.updateBook(this.book).subscribe({
//         next: (book: Book) => {
//           this.error = '';
//            this.upload(book);
//           //this.router.navigateByUrl('/books');
//         },
//         error: (err) => {
//           this.error = err.message;
//            console.error('Error updating book:', err);
//           this.isLoading = false;
//         }
//       });
//     }
//   }
//   onBook() {
//     this.router.navigateByUrl('/books');
//   }


// /*upload file*/
// selectFile(event: any): void {
//   // This function is called when a file is selected by the user
//   // It assigns the selected file(s) to the selectedFiles property
//   this.selectedFiles = event.target.files;
// }


// upload(book: Book): void {
//   // This function uploads the selected file(s) to the server

//   // Reset progress to 0 at the beginning of the upload
//   this.progress = 0;

//   // Check if there are selected files
//   if (this.selectedFiles) {
//     // Get the first selected file
//     const file: File | null = this.selectedFiles.item(0);

//     if (file) {
//       // Assign the current file being uploaded
//       this.currentFile = file;

//       // Upload the file using the fileUploadService
//       this.fileUploadService.upload(this.currentFile, book.id).subscribe({
//         next: (event: any) => {
//           // Progress event: Update progress bar
//           if (event.type === HttpEventType.UploadProgress) {
//             this.progress = Math.round(100 * event.loaded / event.total);
//           }
//           // Response event: Handle successful upload
//           else if (event instanceof HttpResponse) {
//             this.message = event.body.message;
//             // Redirect to contact details page after successful upload
//             this.router.navigateByUrl('/books/' + book.id);
//             this.isLoading = false; //Desactiver le spinner
//           }
//         },
//         error: (err: any) => {
//           // Handle error
//           console.log(err);
//           this.progress = 0;

//           if (err.error && err.error.message) {
//             this.message = err.error.message;
//           } else {
//             this.message = 'Could not upload the file!';
//           }
//           this.currentFile = undefined;
//         }
//       });
//     } else {
//       // Reset selectedFiles if no file is selected
//       this.selectedFiles = undefined;
//       // Redirect to contact details page
//       this.router.navigateByUrl('/books/' + book.id);
//       this.isLoading = false; //Desactiver le spinner
//     }
//   } else {
//     // Redirect to contact details page 
//     this.router.navigateByUrl('/books/' + book.id);
//     this.isLoading = false; //Desactiver le spinner
//   }
// }

























  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }

  // upload(book: Book): void {
  //   this.progress = 0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles.item(0);

  //     if (file) {
  //       this.currentFile = file;
  //       this.fileUploadService.upload(this.currentFile, book.id).subscribe({
  //         next: (event: any) => {
  //           if (event.type === HttpEventType.UploadProgress) {
  //             this.progress = Math.round(100 * event.loaded / event.total);
  //           } else if (event instanceof HttpResponse) {
  //             this.message = event.body.message;
  //             this.router.navigateByUrl('/books/' + book.id);
  //             this.isLoading = false;
  //           }
  //         },
  //         error: (err: any) => {
  //           console.log(err);
  //           this.progress = 0;

  //           if (err.error && err.error.message) {
  //             this.message = err.error.message;
  //           } else {
  //             this.message = 'Could not upload the file!';
  //           }
  //           // this.progress = 0;
  //           // this.message = err.error?.message || 'Could not upload the file!';
  //           this.currentFile = undefined;
  //         }
  //       });
  //     } else {
  //       this.selectedFiles = undefined;
  //       this.router.navigateByUrl('/books');
  //       this.isLoading = false;
  //     }
  //   } else {
  //     this.router.navigateByUrl('/books/' + book.id);
  //     this.isLoading = false;
  //   }
  //}

  // onBooks(): void {
  //   this.router.navigateByUrl('/books');
  // }
// }








  /*
    onSubmit(): void {
   
  
      const selectedCategory = this.categories.find((category) => category.id === category);
      console.log("category id to select "+this.book.categoryId);
      console.log("selected category "+this.categories.find(category => category.id === this.book.categoryId));
  
      if (selectedCategory) {
        this.book.categoryId = selectedCategory.id;
      } else {
        this.error = 'Selected category is invalid';
        this.isLoading = false;
        return;
      }
  
      this.isLoading = true;
      if (this.book.id === null) {
        this.bookService.addBook(this.book,  this.book.categoryId).subscribe({
          next: (newBook: Book) => {
            this.error = '';
            this.upload(newBook);
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
          },
          error: (err) => {
            this.error = err.message || 'Failed to update book.';
            console.error('Error updating book:', err);
            this.isLoading = false;
          }
        });
      }
    }
  */



  // Méthode onSubmit() dans EditBookCompone


  // onSubmit(): void {
  //   if (!this.isFormValid()) {
  //     return;
  //   }

  //   const selectedCategory = this.categories.find(category => category.id === this.book.categoryId);

  //   if (selectedCategory) {
  //     this.book.categoryId = selectedCategory.id;
  //   } else {
  //     this.error = 'Selected category is invalid';
  //     this.isLoading = false;
  //     return;
  //   }

  //   this.isLoading = true;

  //   if (this.book.id === null) {
  //     this.bookService.addBook(this.book, this.book.categoryId).subscribe({
  //       next: (newBook: Book) => {
  //         this.error = '';
  //         this.upload(newBook);
  //       },
  //       error: (err) => {
  //         this.error = err.message || 'Failed to add book.';
  //         console.error('Error adding book:', err);
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.bookService.updateBook(this.book).subscribe({
  //       next: (updatedBook: Book) => {
  //         this.error = '';
  //         this.upload(updatedBook);
  //       },
  //       error: (err) => {
  //         this.error = err.message || 'Failed to update book.';
  //         console.error('Error updating book:', err);
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }


  // onSubmit(): void {
  //   if (!this.isFormValid()) {
  //     return;
  //   }

  //   this.isLoading = true;

  //   if (this.book.id === null) {
  //     this.bookService.addBook(this.book).subscribe({
  //       next: (newBook: Book) => {
  //         this.error = '';
  //         this.router.navigateByUrl('/books');
  //       },
  //       error: (err) => {
  //         this.error = err.message || 'Failed to add book.';
  //         console.error('Error adding book:', err);
  //         this.isLoading = false;
  //       }
  //     });
  //   } else {
  //     this.bookService.updateBook(this.book).subscribe({
  //       next: (updatedBook: Book) => {
  //         this.error = '';
  //         this.router.navigateByUrl('/books');
  //       },
  //       error: (err) => {
  //         this.error = err.message || 'Failed to update book.';
  //         console.error('Error updating book:', err);
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }
