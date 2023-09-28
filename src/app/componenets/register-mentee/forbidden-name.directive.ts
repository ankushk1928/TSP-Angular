import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ForbiddenNameValidatorDirective,
    multi: true
  }]
})
export class ForbiddenNameValidatorDirective implements Validator {
  @Input('appForbiddenName')
    forbiddenName!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.forbiddenName) {
      return null;
    }

    const value = control.value;
    if (value === this.forbiddenName) {
      return { forbiddenName: true };
    }

    return null;
  }
}
