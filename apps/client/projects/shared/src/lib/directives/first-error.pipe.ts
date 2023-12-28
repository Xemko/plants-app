import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'firstKey',
  standalone: true,
})
export class FirstKeyPipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined, ...args: any[]): string | null {
    const keys = Object.keys(errors ?? {});
    return keys.length ? keys[0] : null;
  }

}
