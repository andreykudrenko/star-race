import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const email = '';
    const password = '';
    this.authForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, [Validators.required])
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.authForm.valid) {
      const email = this.authForm.controls['email'].value;
      const password = this.authForm.controls['password'].value;
      if (this.isLoginMode) {
        this.authService.login(email, password).subscribe(resData => {
          this.router.navigate(['/']);
          console.log(resData);
        }, error => {
          console.log(error);
        });
      } else {
        this.authService.signUp(email, password).subscribe(resData => {
          this.router.navigate(['/']);
          console.log(resData);
        }, error => {
          console.log(error);
        });
      }
    }
  }
}
