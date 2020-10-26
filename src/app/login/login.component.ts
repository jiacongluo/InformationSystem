import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  submitted = false;
  httpPostSubscriber: Observable<Object>;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private http2:HttpClient
  ) {}

  submitForm() {
    if (this.validateForm.invalid) {
      console.log('登录失败');
      return false;
    }
    console.log('尝试登录');
    const httpPostFunc = this.http2.post('login', {
      username: this.validateForm.value['userName'],
      password: this.validateForm.value['password'],
    });
    this.httpPostSubscriber = httpPostFunc;
    httpPostFunc.subscribe((result: boolean) => {
      console.log('httpClient登录结果:' + result);
      if (result) {
        // 登录成功
        console.log('httpClient登录成功');
        this.submitted = true;
        this.router.navigate(['/index', this.validateForm.value['userName']]);
        this.createMessage('success');
      } else {
        // 登录失败
        this.createMessage('error');
      }
    });
  }

  createMessage(type: string): void {
    if (type === 'success') {
      this.message.create(
        type,
        this.validateForm.value['userName'] + ` 登录成功，欢迎使用本系统`
      );
    } else {
      this.message.create(type, `登录失败，请重试！`);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
