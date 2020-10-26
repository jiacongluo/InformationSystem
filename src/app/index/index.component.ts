import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ACLService } from '@delon/acl';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aclService: ACLService
  ) {}
  isCollapsed=false;
  username: string;
  currentModule: string;

  // tslint:disable-next-line: typedef
  logout() {
    this.aclService.setFull(false);
    this.aclService.setAbility([0]);
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line: typedef
  switchModule(module) {
    this.currentModule = module;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
    });
    // 根据用户设置模块权限点
    switch (this.username) {
      case 'admin': {
        this.aclService.setFull(true);
        break;
      }
      case 'man': {
        this.aclService.setAbility([1]);
        break;
      }
      case 'woman': {
        this.aclService.setAbility([2]);
        break;
      }
      default:
        break;
    }
    // 设置当前访问模块
    this.currentModule = this.username === 'admin' ? 'members' : this.username;
  }
}
