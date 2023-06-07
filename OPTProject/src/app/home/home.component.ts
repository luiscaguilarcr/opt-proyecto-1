import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  goToForm() {
    this.router.navigate(['/formulario']);
  }

  intelligences: any[] = [
    { name: 'Espacial', image: 'https://pymstatic.com/594/conversions/inteligencia-espacial-wide.jpg' },
    { name: 'Musical', image: 'https://concepto.de/wp-content/uploads/2020/03/musica-e1584123209397.jpg' },
    { name: 'Lingüístico-Verbal', image: 'https://www.nationalgeographic.com.es/medio/2022/04/23/libros_5cad0410_1200x630.jpg' },
    { name: 'Lógico-Matemática', image: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/164EE/production/_109347319_gettyimages-611195980.jpg' },
    { name: 'Corporal-Cinestésica', image: 'https://www.ceoe.es/sites/ceoe-corporativo/files/styles/image_1200/public/content/image/2021/03/25/104/xdiseno-sin-titulo-27.png,qitok=GA8_RFcW.pagespeed.ic.nZIFbdYHFQ.jpg' },
    { name: 'Intrapersonal', image: 'https://estaticos-cdn.elperiodico.com/clip/ae3914c8-d380-4a08-8a7e-d94d986a1cbd_alta-libre-aspect-ratio_default_0.jpg' },
    { name: 'Interpersonal', image: 'https://st3.depositphotos.com/4554625/12568/i/600/depositphotos_125689490-stock-photo-group-of-happy-friends-hugging.jpg' },
    { name: 'Naturalista', image: 'https://topadventure.com/__export/1671656865346/sites/laverdad/img/2022/12/21/la_marquesa.jpg_536647235.jpg' },
    { name: 'Existencial', image: 'https://www.iepp.es/wp-content/uploads/crisis-existencial.jpg' },
    { name: 'Creativa', image: 'https://degranero.es/wp-content/uploads/2020/10/deGranero-clases-de-pintura-en-Madrid.jpg' },
    { name: 'Emocional', image: 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/11/20/5fb79548c9772.jpeg' },
    { name: 'Colaborativa', image: 'https://www.bizneo.com/blog/wp-content/uploads/2019/10/din%C3%A1micas-de-trabajo-en-equipo.jpeg' },
  ];
}




