import { AbstractControl, ValidatorFn } from '@angular/forms';

// Define a class for custom validation
export default class Validation {
  // Static method to create a validator function for matching two form controls
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      // Retrieve the main control and the control to be matched
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      // If the check control has other errors and they are not related to matching, return null
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      // If the values of the two controls do not match, set a 'matching' error on the check control
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        // If the values match, return null indicating no error
        return null;
      }
    };
  }
}