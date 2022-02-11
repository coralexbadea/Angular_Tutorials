import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-link1',
  templateUrl: './link1.component.html',
  styleUrls: ['./link1.component.scss']
})
export class Link1Component implements OnInit {
  public title:string = 'ngxtranslate';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr'])
    translate.setDefaultLang('en')
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  ngOnInit() {
  }

}
