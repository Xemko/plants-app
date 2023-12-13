import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import { ENVIRONMENT } from '../common/models/environment.model';
import { SignInFormFields } from './models/sign-in.interface';
import { SignInService } from './services/sign-in.service';
import { signInPhoneNumberValidator } from './validators/sign-in.validators';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: [ 'sign-in.page.scss' ],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, TranslocoPipe, ReactiveFormsModule, IonInput, IonItem, IonButton ],
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
      this.signInService.submit(this.form.value).subscribe();
    }
  }

}
