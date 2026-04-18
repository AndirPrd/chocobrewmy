import caramelMacchiatoSundaeImg from '../assets/images/menu/Caramel Macchiato Sundae.jpeg'
import classicCaramelMacchiatoImg from '../assets/images/menu/Classic Caramel Machiatto menu.jpeg'
import cozyVanillaLatteImg from '../assets/images/menu/Cozy Vanilla Latte menu.jpeg'
import doubleDarkChocoSwirlImg from '../assets/images/menu/Double Dark Choco Swirl menu.jpeg'
import frozenNuttyChocoFrappeImg from '../assets/images/menu/Frozen Nutty Choco Frappe menu.jpeg'
import icedSeaSaltCaramelLatteImg from '../assets/images/menu/Iced Sea-Salt Caramel Latte menu.jpeg'
import marshmallowChocoHugImg from '../assets/images/menu/Marshmallow Choco Hug menu.jpeg'
import signatureDarkChocoImg from '../assets/images/menu/Signature Dark Choco menu.jpeg'
import vanillaBeanWaffleConeImg from '../assets/images/menu/Vanilla Bean Waffle Cone menu.jpeg'

const menuData = [
  {
    id: 'choco-001',
    name: 'Signature Dark Choco',
    category: 'Chocolate',
    temp: 'Hot',
    group: 'choco-classic',
    price: 32000,
    image: signatureDarkChocoImg,
    shortDesc: 'Deep cocoa profile with velvety steamed milk.',
    ingredients: [
      { id: 'i-1', x: 24, y: 26, text: '70% dark cocoa blend' },
      { id: 'i-2', x: 69, y: 41, text: 'Fresh creamy milk foam' },
      { id: 'i-3', x: 47, y: 74, text: 'Brown sugar drizzle' },
    ],
  },
  {
    id: 'choco-002',
    name: 'Marshmallow Choco Hug',
    category: 'Chocolate',
    temp: 'Hot',
    group: 'choco-classic',
    price: 34000,
    image: marshmallowChocoHugImg,
    shortDesc: 'Warm chocolate topped with toasted marshmallow cloud.',
    ingredients: [
      { id: 'i-1', x: 27, y: 24, text: 'Chocolate base concentrate' },
      { id: 'i-2', x: 63, y: 35, text: 'Toasted mini marshmallows' },
      { id: 'i-3', x: 42, y: 73, text: 'Vanilla cream finish' },
    ],
  },
  {
    id: 'choco-003',
    name: 'Frozen Nutty Choco Frappe',
    category: 'Chocolate',
    temp: 'Cold',
    group: 'choco-frappe',
    price: 36000,
    image: frozenNuttyChocoFrappeImg,
    shortDesc: 'Icy cocoa blend with nutty crunch and creamy body.',
    ingredients: [
      { id: 'i-1', x: 20, y: 30, text: 'Crushed ice and chocolate syrup' },
      { id: 'i-2', x: 70, y: 48, text: 'Roasted almond crumble' },
      { id: 'i-3', x: 46, y: 77, text: 'Whipped cream swirl' },
    ],
  },
  {
    id: 'coffee-001',
    name: 'Cozy Vanilla Latte',
    category: 'Coffee',
    temp: 'Hot',
    group: 'latte',
    price: 30000,
    image: cozyVanillaLatteImg,
    shortDesc: 'Smooth espresso latte with sweet vanilla comfort.',
    ingredients: [
      { id: 'i-1', x: 24, y: 25, text: 'Double espresso shot' },
      { id: 'i-2', x: 68, y: 43, text: 'Vanilla syrup touch' },
      { id: 'i-3', x: 45, y: 73, text: 'Silky steamed milk' },
    ],
  },
  {
    id: 'coffee-002',
    name: 'Iced Sea-Salt Caramel Latte',
    category: 'Coffee',
    temp: 'Cold',
    group: 'latte',
    price: 34000,
    image: icedSeaSaltCaramelLatteImg,
    shortDesc: 'Chilled caramel latte with a gentle sea-salt lift.',
    ingredients: [
      { id: 'i-1', x: 22, y: 30, text: 'Cold espresso concentrate' },
      { id: 'i-2', x: 69, y: 44, text: 'Sea-salt caramel layer' },
      { id: 'i-3', x: 47, y: 76, text: 'Iced milk blend' },
    ],
  },
  {
    id: 'coffee-003',
    name: 'Classic Caramel Macchiato',
    category: 'Coffee',
    temp: 'Hot',
    group: 'macchiato',
    price: 33000,
    image: classicCaramelMacchiatoImg,
    shortDesc: 'Signature layered macchiato with caramel glaze.',
    ingredients: [
      { id: 'i-1', x: 25, y: 23, text: 'Espresso over milk foam' },
      { id: 'i-2', x: 67, y: 38, text: 'Caramel cross drizzle' },
      { id: 'i-3', x: 44, y: 74, text: 'Warm milk body' },
    ],
  },
  {
    id: 'ice-001',
    name: 'Vanilla Bean Waffle Cone',
    category: 'Ice Cream',
    temp: 'Cold',
    group: 'cone',
    price: 24000,
    image: vanillaBeanWaffleConeImg,
    shortDesc: 'Creamy vanilla bean scoop on crunchy waffle cone.',
    ingredients: [
      { id: 'i-1', x: 26, y: 23, text: 'Madagascar vanilla bean' },
      { id: 'i-2', x: 64, y: 40, text: 'Fresh cream churn' },
      { id: 'i-3', x: 43, y: 78, text: 'Baked waffle cone' },
    ],
  },
  {
    id: 'ice-002',
    name: 'Caramel Macchiato Sundae',
    category: 'Ice Cream',
    temp: 'Cold',
    group: 'sundae',
    price: 29000,
    image: caramelMacchiatoSundaeImg,
    shortDesc: 'Creamy sundae layered with coffee caramel notes.',
    ingredients: [
      { id: 'i-1', x: 23, y: 24, text: 'Vanilla cream ice base' },
      { id: 'i-2', x: 67, y: 41, text: 'Macchiato caramel sauce' },
      { id: 'i-3', x: 46, y: 75, text: 'Soft crumble topping' },
    ],
  },
  {
    id: 'ice-003',
    name: 'Double Dark Choco Swirl',
    category: 'Ice Cream',
    temp: 'Cold',
    group: 'cone',
    price: 35000,
    image: doubleDarkChocoSwirlImg,
    shortDesc: 'Extra bold cold choco with layered dark syrup.',
    ingredients: [
      { id: 'i-1', x: 22, y: 28, text: 'Double cocoa infusion' },
      { id: 'i-2', x: 66, y: 46, text: 'Dark chocolate ribbon' },
      { id: 'i-3', x: 48, y: 75, text: 'Cold milk crema' },
    ],
  },
]

export default menuData
