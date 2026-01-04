
import { ComparisonItem, GalleryItem, Testimonial, TransformationStep } from './types';

export const COMPARISON_COLLECTION: ComparisonItem[] = [
  {
    id: 1,
    title: "Chanel Heritage",
    category: "ЛЮКС-ПОРТРЕТ",
    before: "https://static.tildacdn.com/tild3431-6234-4963-a633-663036666465/01f_shoot.jpg",
    after: "https://static.tildacdn.com/tild3038-3634-4939-a564-626634393139/01f_executive_image.jpg"
  },
  {
    id: 2,
    title: "Editorial Presence",
    category: "КОРПОРАТИВНЫЙ ЛИДЕР",
    before: "https://static.tildacdn.com/tild3230-3233-4234-a330-643962316630/02f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6562-6131-4363-a434-386139393833/02f_executive_image.jpg"
  },
  {
    id: 3,
    title: "Global Executive",
    category: "ОБРАЗ ВЛАСТИ",
    before: "https://static.tildacdn.com/tild6136-6262-4163-b735-366635366631/03f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6337-6235-4930-b437-313639343066/03f_executive_image1.jpg"
  },
  {
    id: 4,
    title: "Pinstripe Authority",
    category: "CEO МАНИФЕСТ",
    before: "https://static.tildacdn.com/tild3739-6266-4566-b835-376632613633/04m_shootjpg.jpg",
    after: "https://static.tildacdn.com/tild3065-3539-4135-a636-313232303362/04m_executive_image1.jpg"
  }
];

export const AUTHORITY_ARCHIVE: GalleryItem[] = [
  { id: 1, name: 'Ирина Хакамада', status: 'Символ лидерства', image: 'https://static.tildacdn.com/tild6336-6461-4239-a533-636461316432/_MG_4315.jpg' },
  { id: 2, name: 'Михаил Федоренко', status: 'Госсоветник 2 класса', image: 'https://static.tildacdn.com/tild3065-6262-4766-b635-353233626138/IMG_4309-Edit.jpg' },
  { id: 3, name: 'Аделия Петросян', status: 'Чемпионка РФ', image: 'https://static.tildacdn.com/tild3436-3831-4433-b630-313939653736/IMG_3426-Edit.jpg' },
  { id: 4, name: 'Francisco Oliveira', status: 'Guru Canggu Owner', image: 'https://static.tildacdn.com/tild3038-3566-4338-a434-333236653135/IMG_0549.jpeg' },
  { id: 5, name: 'Александр Г.', status: 'Акционер холдинга', image: 'https://static.tildacdn.com/tild3431-3165-4339-b962-636261623136/04m_shootjpg.jpg' },
  { id: 6, name: 'Елена В.', status: 'Основатель бренда', image: 'https://static.tildacdn.com/tild3164-3665-4161-b130-363539656534/01f_shoot.jpg' },
  { id: 7, name: 'Виктор П.', status: 'Управляющий партнер', image: 'https://static.tildacdn.com/tild6361-3965-4139-b864-343530366166/03f_shoot.jpg' },
  { id: 8, name: 'Марина С.', status: 'IT Визионер', image: 'https://static.tildacdn.com/tild6162-3664-4662-b939-663265613337/02f_shoot.jpg' }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Ирина Хакамада', description: 'Бизнес-спикер, \nпубличный деятель.', videoUrl: 'https://rutube.ru/play/embed/ef3ddf744edc99e9d1dbeb3f92540683' },
  { id: 2, name: 'Олег Конников', description: 'Звездный стоматолог, \nэксперт федеральных ТВ-проектов.', videoUrl: 'https://rutube.ru/play/embed/ffb709841bf1ffda248861c8f9c5f41d' },
  { id: 3, name: 'Lex Borealis', description: 'Международные юристы: \nЛондон, Дубай, Москва.', videoUrl: 'https://rutube.ru/play/embed/9ee74e5c2e6ddeb2d0bb97e257cae03b' },
  { id: 4, name: 'Роман Тарасенко', description: 'Маркетолог №1, стратег, \nавтор бестселлеров.', videoUrl: 'https://rutube.ru/play/embed/28c6c2f35ca1d859ce6a037c859a6e26' }
];

export const TRANSFORMATION_DATA: TransformationStep[] = [
  {
    id: '1',
    label: 'ФАЗА 01: АНАЛИЗ',
    image: 'https://static.tildacdn.com/tild6136-6262-4163-b735-366635366631/03f_shoot.jpg'
  },
  {
    id: '2',
    label: 'ФАЗА 02: СТРАТЕГИЯ',
    image: 'https://static.tildacdn.com/tild3739-6266-4566-b835-376632613633/04m_shootjpg.jpg'
  },
  {
    id: '3',
    label: 'ФАЗА 03: РЕЗУЛЬТАТ',
    image: 'https://static.tildacdn.com/tild6337-6235-4930-b437-313639343066/03f_executive_image1.jpg',
    subPhases: [
      { id: 'a', label: 'QUIET LUXURY', image: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' },
      { id: 'b', label: 'BRIONI STYLE', image: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
      { id: 'c', label: 'OLD MONEY', image: 'https://static.tildacdn.com/tild6562-6131-4363-a434-386139393833/02f_executive_image.jpg' }
    ]
  }
];
