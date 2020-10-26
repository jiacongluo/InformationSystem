import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { DelonACLModule } from '@delon/acl';
import { DelonMockModule } from '@delon/mock';

import * as MOCKDATA from './_mock/mockData';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline,LockOutline,MenuFoldOutline,MenuUnfoldOutline} from '@ant-design/icons-angular/icons';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import {CapitalPipe} from '../services/capital.pipe';

const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA, log: true }) ] : [];
const icons: IconDefinition[] = [UserOutline, LockOutline,MenuFoldOutline,MenuUnfoldOutline];
registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, LoginComponent, IndexComponent,CapitalPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzCheckboxModule,
    NzIconModule.forRoot(icons),
    NzMessageModule,
    DelonACLModule.forRoot(),
    ...MOCKMODULE
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
