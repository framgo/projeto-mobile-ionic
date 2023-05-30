import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModelsPage } from '../models/models.page';
import { ModalPage } from '../modal/modal.page';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animes: any = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController, private authService: AuthService, private router: Router) {
    this.dataService.getAnimes().subscribe(res => {
      console.log(res);
      this.animes = res;
    })
  }

  async openAnime(anime: any){
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: anime.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });

    modal.present();
  }


  async addAnime(){
    const alert = await this.alertCtrl.create({
      header: 'Add Animes',
      inputs: [
        {
          name: 'nome',
          placeholder: 'coloque o nome do anime',
          type: 'text'
        },
        {
          name: 'genero',
          placeholder: 'coloque o genero do anime',
          type: 'text'
        },
        {
          name: 'episodios',
          placeholder: 'coloque os episodios do anime',
          type: 'number'
        },
        {
          name: 'lancamento',
          placeholder: 'coloque o dia que lançou',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (res) => {
            this.dataService.addAnimes({nome: res.nome, genero: res.genero, episodes: res.episodios, lancamento: res.lancamento
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async logout(){
    this.authService.logout();
    this.router.navigateByUrl('/' , {replaceUrl: true});
  }
}
