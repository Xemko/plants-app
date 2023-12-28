import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { ENVIRONMENT, FirstKeyPipe } from '@plants-app/shared';
import { SignInFormFields, SignInService, SignInResponseError, signInPhoneNumberValidator } from '@plants-app/auth';

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
        error: (response: SignInResponseError) => {
          const errors = this.signInService.getValidationErrorsByResponse(response);
          this.form.get('phoneNumber')?.setErrors(errors);
        }
      });
    }
  }

}
