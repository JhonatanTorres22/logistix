// angular import
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// third party
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

// project import
import { SharedModule } from '../../shared/shared.module';
import { BuyNowLinkService } from '../../../@theme/services/buy-now-link.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, CarouselModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  // public props
  currentSlide = 'slide-1';
  scrolledPastPoint = false;
  single: boolean;

  // constructor
  constructor(
    private renderer: Renderer2,
    private productIdService: BuyNowLinkService
  ) {}

  // life cycle event
  ngOnInit() {
    this.renderer.addClass(document.body, 'landing-page');
    // landing page menu sticky
    let ost = 0;
    window.addEventListener('scroll', () => {
      const cOst = document.documentElement.scrollTop;
      const header = document.querySelector('.component-header') as HTMLElement;

      if (cOst === 0) {
        header.classList.add('top-header');
      } else if (cOst > ost) {
        header.classList.add('top-header');
        header.classList.remove('default');
      } else {
        header.classList.add('default');
        header.classList.remove('top-header');
      }
      ost = cOst;
    });
    console.log(this.productIdService.buyNowLink);
    if (this.productIdService.buyNowLink.includes('able-pro-angular-dashboard-template')) {
      this.single = true;
    } else {
      this.single = false;
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'landing-page');
  }

  // public method
  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    items: 1,
    nav: false,
    rtl: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  };

  techBlock = [
    {
      url: 'https://ableproadmin.com',
      images: 'assets/images/landing/tech-bootstrap.svg'
    },
    {
      url: 'https://ableproadmin.com/react',
      images: 'assets/images/landing/tech-react.svg'
    },
    {
      url: 'https://ableproadmin.com/codeigniter/default/public',
      images: 'assets/images/landing/tech-codeigniter.svg'
    },
    {
      url: 'https://able-pro.azurewebsites.net',
      images: 'assets/images/landing/tech-net.svg'
    },
    {
      url: 'https://ableproadmin.com/angular/default',
      images: 'assets/images/landing/tech-angular.svg'
    },
    {
      url: 'https://able-pro-material-next-ts-navy.vercel.app/',
      images: 'assets/images/landing/tech-nextjs.svg'
    },
    {
      url: 'https://ableproadmin.com/vue/',
      images: 'assets/images/landing/tech-vuetify.svg'
    },
    {
      url: 'https://www.figma.com/file/6XqmRhRmkr33w0EFD49acY/Able-Pro--v9.0-Figma-Preview?type=design&mode=design&t=0XZ5hhGAwBPr4Qlj-0',
      images: 'assets/images/landing/tech-figma.svg'
    }
  ];

  technologies = [
    {
      image: 'assets/images/landing/tech-bootstrap.svg',
      name: 'Bootstrap 5',
      text: "Able Pro - Boost your project's visual appeal and functionality with our Bootstrap 5 dashboard template.",
      preview: 'Preview Bootstrap',
      url: 'https://ableproadmin.com',
      freeRepo: true
    },
    {
      image: 'assets/images/landing/tech-react.svg',
      name: 'React Material-UI',
      text: 'Able Pro React dashboard template is a powerful tool that utilizes the Material-UI component library to create stunning and intuitive user interfaces.',
      preview: 'Preview React',
      url: 'https://ableproadmin.com/react/',
      freeRepo: true
    },
    {
      image: 'assets/images/landing/tech-angular.svg',
      name: 'Angular Material-UI',
      text: 'Able Pro Angular dashboard template is a powerful tool that utilizes the Material-UI component library to create stunning and intuitive user interfaces.',
      preview: 'Preview Angular',
      url: 'https://ableproadmin.com/angular/default/',
      freeRepo: true
    },
    {
      image: 'assets/images/landing/tech-nextjs.svg',
      name: 'Next Js',
      text: 'Able Pro Next Js dashboard template is a powerful tool that utilizes the Material-UI component library to create stunning and intuitive user interfaces.',
      preview: 'Preview Next Js',
      url: 'https://able-pro-material-next-ts-navy.vercel.app/',
      freeRepo: false
    },
    {
      image: 'assets/images/landing/tech-vuetify.svg',
      name: 'Vue',
      text: "Able Pro - Boost your project's visual appeal and functionality with our Vue Dashboard template.",
      preview: 'Preview Vue',
      url: 'https://ableproadmin.com/vue/',
      freeRepo: true
    },
    {
      image: 'assets/images/landing/tech-codeigniter.svg',
      name: 'CodeIgniter',
      text: 'Able Pro CodeIgniter version is a powerful dashboard template built specifically for developers who use the CodeIgniter PHP framework.',
      preview: 'Preview CodeIgniter',
      url: 'https://ableproadmin.com/codeigniter/default/public/',
      freeRepo: false
    },
    {
      image: 'assets/images/landing/tech-net.svg',
      name: 'Asp.net',
      text: 'Able Pro .NET version is a robust dashboard template designed specifically for .NET developers. Its comes with a wide range of pre-built components.',
      preview: 'Preview Asp.net',
      url: 'https://able-pro.azurewebsites.net/',
      freeRepo: false
    },
    {
      image: 'assets/images/landing/tech-figma.svg',
      name: 'Figma',
      text: 'Able Pro comes with a Figma design file that allows you to customize and fine-tune your dashboard to meet your specific needs.',
      preview: 'Preview Figma',
      url: 'https://www.figma.com/file/6XqmRhRmkr33w0EFD49acY/Able-Pro--v9.0-Figma-Preview?type=design&mode=design&t=4FS2Lw6WxsmJ3RLm-0',
      freeRepo: false
    }
  ];

  carouselData = [
    { id: 'slide-1', img: 'assets/images/landing/Chat.png' },
    { id: 'slide-2', img: 'assets/images/landing/e-commerce.png' },
    { id: 'slide-3', img: 'assets/images/landing/mail.png' },
    { id: 'slide-4', img: 'assets/images/landing/social.png' }
  ];

  support = [
    {
      img: 'assets/images/user/avatar-1.png',
      text: '“Amazing template for fast develop.💎“',
      author: 'devbar',
      describe: 'Customizability'
    },
    {
      img: 'assets/images/user/avatar-2.png',
      text: '“Code quality is amazing. Design is astonishing. very easy to customize..😍“',
      author: 'shahabblouch',
      describe: 'Code Quality'
    },
    {
      img: 'assets/images/user/avatar-3.png',
      text: '“This has been one of my favorite admin dashboards to use. 😍“',
      author: 'htmhell',
      describe: 'Design Quality'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      text: '“Excellent support, if we need any modification, they are doing immediately“',
      author: 'hemchandkodali',
      describe: 'Customer Support'
    },
    {
      img: 'assets/images/user/avatar-5.jpg',
      text: '“For developers like me, this is the total package! 😍“',
      author: 'sumaranjum',
      describe: 'Feature Availability'
    },
    {
      img: 'assets/images/user/avatar-1.png',
      text: '“I love the looks of Able Pro 7.0. I really like the colors you guys have chosen for this theme. It looks really nice.. 💎“',
      author: 'ritelogic',
      describe: 'Other'
    },
    {
      img: 'assets/images/user/avatar-2.png',
      text: '“The author is very nice and solved my problem inmediately 😍“',
      author: 'richitela',
      describe: 'Customer Support'
    },
    {
      img: 'assets/images/user/avatar-3.png',
      text: '“Very universal admin template“',
      author: 'htmhell',
      describe: 'Design Quality'
    },
    {
      img: 'assets/images/user/avatar-4.jpg',
      text: '“An amazing template. Very good design, good quality code and also very good customer support. 💎“',
      author: 'macugi',
      describe: 'Code Quality'
    },
    {
      img: 'assets/images/user/avatar-5.jpg',
      text: '“I have it running on a medium size site that is geared towards displaying stats tables and custom forms, a blog and a forum. My customers love the design and the speed in which the pages load. 😍 “',
      author: 'RizzoFrank',
      describe: 'Design Quality'
    }
  ];
}
