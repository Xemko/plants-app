import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { FirstKeyPipe } from '../common/directives/first-error.pipe';
import { ENVIRONMENT } from '../common/models/environment.model';
import { SignInFormFields, SignInResponse } from './models/sign-in.interface';
import { SignInService } from './services/sign-in.service';
import { signInPhoneNumberValidator } from './validators/sign-in.validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: [ 'sign-in.page.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton,
    TranslocoPipe, ReactiveFormsModule, FirstKeyPipe ],
  providers: [ SignInService ]
})
export class SignInPage {
  private environment = inject(ENVIRONMENT);
  private signInService = inject(SignInService);

  public form: FormGroup = new FormGroup({
    phoneNumber: new FormControl<SignInFormFields['phoneNumber']>('', [ signInPhoneNumberValidator() ]),
  });
  public appName: string = this.environment.appName;

  submit(): void {
    if (this.form.valid) {
      this.signInService.submit(this.form.value).subscribe({
        error: (response: SignInResponse) => {
          const errors = this.signInService.getValidationErrorsByResponse(response);
          this.form.get('phoneNumber')?.setErrors(errors);
        }
      });
    }
  }

}
