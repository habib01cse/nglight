import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { I18nService } from 'src/app/core/services/i18n.service';
import { LangService } from 'src/app/core/services/lang.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  currentLanguageActive = globalVariables.currentLanguage;
  constructor(
    private router: Router
    , private i18nService: I18nService
    , public langService: LangService
    ) { }

  ngOnInit(): void {
  }

  onChangeLanguage(language) {    
    globalVariables.currentLanguage = language;
    this.currentLanguageActive = language;
    let path = this.router.url;
    path = path.substr(1, path.length);
    let pathStr = path.split("/")[0];

    this.i18nService.getLanguageData(`${pathStr}/${language}`).subscribe(
      dataFromApi => {
        globalVariables.currentLanguageData = dataFromApi;
        this.langService.changeLang();
      },
      err => { console.log(err); }
    );
  }

}
