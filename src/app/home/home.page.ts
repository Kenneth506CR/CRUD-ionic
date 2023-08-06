import { Component } from '@angular/core';
import { DbService } from '../services/db.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) {}

  mainForm: FormGroup;
  Data: any[] = [];

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchSongs().subscribe((item) => {
          this.Data = item;
        });
      }
    });
    this.mainForm = this.formBuilder.group({
      artist: [''],
      song: [''],
      cedula: [''],
      year: ['']
    });
  }

  storeData() {
    this.db
      .addSong(
        this.mainForm.value.artist,
        this.mainForm.value.song,
        this.mainForm.value.cedula,
        this.mainForm.value.year
      )
      .then((res) => {
        this.mainForm.reset();
      });
  }

  deleteSong(id: number) {
    this.db.deleteSong(id).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Estudiante Eliminado',
        duration: 2500,
      });
      toast.present();
    });
  }
}
