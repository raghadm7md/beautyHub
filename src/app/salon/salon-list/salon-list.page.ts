import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { SalonServiceService } from '../salon-service.service';
import { ISalon } from '../salon.model';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-salon-list',
  templateUrl: './salon-list.page.html',
  styleUrls: ['./salon-list.page.scss'],
})
export class SalonListPage implements OnInit {
  salons: ISalon[]
  searchForm: FormGroup
  private searchSubject = new Subject<string>();
  inputText: string = '';
  private readonly debounceTimeMs = 1000;

  constructor(private _salonservice: SalonServiceService,
    private loadingCtrl: LoadingController,
  ) { }

  async ngOnInit() {
    let loading = await this.loadingCtrl.create();
    loading.present();
    this._salonservice.fetchsalonList().subscribe(salonList => {
      this.salons = salonList
      loading.dismiss()
    })

    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });

  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onSearch() {
    this.searchSubject.next(this.inputText);
  }

  async performSearch(searchValue: string) {
    let loading = await this.loadingCtrl.create();
    loading.present();
    this._salonservice.fetchSalonOnsearch(searchValue)
      .subscribe(searchResult => {
        this.salons = searchResult
        loading.dismiss()
      });

  }

}
