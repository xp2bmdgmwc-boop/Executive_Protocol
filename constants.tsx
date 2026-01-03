
import { TransformationPhase, GalleryItem, Testimonial, ComparisonItem } from './types';

export const TRANSFORMATION_DATA: TransformationPhase[] = [
  {
    id: '1',
    label: 'ФАЗА 01: РЕАЛЬНАЯ ЖИЗНЬ',
    image: 'https://static.tildacdn.com/tild6639-6330-4565-a437-643966646532/1766840175558.jpg'
  },
  {
    id: '2',
    label: 'ФАЗА 02: НА СЪЁМКЕ',
    image: 'https://static.tildacdn.com/tild3034-3933-4335-a564-616461353762/IMG_9206.jpg'
  },
  {
    id: '3',
    label: 'ФАЗА 03: МАНИФЕСТ',
    image: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg',
    subPhases: [
      { id: 'a', label: 'Костюм Brioni', image: 'https://static3.tildacdn.com/tild3863-3864-4336-b531-626366353438/Generated_Image_Dece.jpg' },
      { id: 'b', label: 'Loro Piana', image: 'https://static.tildacdn.com/tild3166-3231-4264-a166-633762613832/Generated_Image_Dece.jpg' }
    ]
  }
];

export const COMPARISON_COLLECTION: ComparisonItem[] = [
  {
    id: 1,
    title: "Chanel Heritage",
    category: "Luxe Portrait",
    before: "https://static.tildacdn.com/tild3431-6234-4963-a633-663036666465/01f_shoot.jpg",
    after: "https://static.tildacdn.com/tild3038-3634-4939-a564-626634393139/01f_executive_image.jpg"
  },
  {
    id: 2,
    title: "Editorial Presence",
    category: "Corporate Leader",
    before: "https://static.tildacdn.com/tild3230-3233-4234-a330-643962316630/02f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6562-6131-4363-a434-386139393833/02f_executive_image.jpg"
  },
  {
    id: 3,
    title: "Global Executive",
    category: "Power Look",
    before: "https://static.tildacdn.com/tild6136-6262-4163-b735-366635366631/03f_shoot.jpg",
    after: "https://static.tildacdn.com/tild6337-6235-4930-b437-313639343066/03f_executive_image1.jpg"
  },
  {
    id: 4,
    title: "Pinstripe Authority",
    category: "CEO Manifesto",
    before: "https://static.tildacdn.com/tild3739-6266-4566-b835-376632613633/04m_shootjpg.jpg",
    after: "https://static.tildacdn.com/tild3065-3539-4135-a636-313232303362/04m_executive_image1.jpg"
  }
];

export const AUTHORITY_ARCHIVE: GalleryItem[] = [
  { id: 1, name: 'Ирина Хакамада', status: 'Символ лидерства', image: 'https://static.tildacdn.com/tild6336-6461-4239-a533-636461316432/_MG_4315.jpg' },
  { id: 2, name: 'Михаил Федоренко', status: 'Госсоветник 2 класса', image: 'https://static.tildacdn.com/tild3065-6262-4766-b635-353233626138/IMG_4309-Edit.jpg' },
  { id: 3, name: 'Аделия Петросян', status: 'Чемпионка РФ', image: 'https://static.tildacdn.com/tild3436-3831-4433-b630-313939653736/IMG_3426-Edit.jpg' },
  { id: 4, name: 'Francisco Oliveira', status: 'Владелец Guru Canggu', image: 'https://static.tildacdn.com/tild3038-3566-4338-a434-333236653135/IMG_0549.jpeg' },
  { id: 5, name: 'Dr. Kate Barker', status: 'Футуролог NEOM', image: 'https://static.tildacdn.com/tild3336-3630-4732-b438-323161323763/IMG_9624.jpg' },
  { id: 6, name: 'Dr. Aisha Bin Bishr', status: 'Digital Dubai', image: 'https://static.tildacdn.com/tild3564-3432-4335-b338-643631373236/IMG_9564.jpg' },
  { id: 7, name: 'Олег Конников', status: 'Konnikov Clinic', image: 'https://static.tildacdn.com/tild6436-6430-4636-a233-653536316663/_MG_8784.jpg' },
  { id: 8, name: 'Михаил Федоренко', status: 'Системный имидж', image: 'https://static.tildacdn.com/tild3236-3061-4261-b063-376136633263/IMG_4334-2.jpg' }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: 'Ирина Хакамада', description: 'Публичный деятель, писатель, бизнес-спикер.', videoUrl: 'https://rutube.ru/play/embed/ef3ddf744edc99e9d1dbeb3f92540683' },
  { id: 2, name: 'Олег Конников', description: 'Konnikov Clinic, эксперт федеральных ТВ-проектов.', videoUrl: 'https://rutube.ru/play/embed/ffb709841bf1ffda248861c8f9c5f41d' },
  { id: 3, name: 'Lex Borealis', description: 'Бизнес-инноватор, эксперт по системному мышлению.', videoUrl: 'https://rutube.ru/play/embed/9ee74e5c2e6ddeb2d0bb97e257cae03b' },
  { id: 4, name: 'Роман Тарасенко', description: 'Маркетолог №1, автор бестселлеров, стратег.', videoUrl: 'https://rutube.ru/play/embed/28c6c2f35ca1d859ce6a037c859a6e26' }
];
