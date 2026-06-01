import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
const PASSPORT_PATTERN = /^[A-Za-z0-9]{6,12}$/;
const NATIONAL_ID_PATTERN = /^\d{7,11}$/;
export function passportValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string)?.trim();
    if (!value) return null;
    return PASSPORT_PATTERN.test(value) ? null : { passportFormat: true };
  };
}
export function nationalIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string)?.trim();
    if (!value) return null;
    return NATIONAL_ID_PATTERN.test(value) ? null : { nationalIdFormat: true };
  };
}
