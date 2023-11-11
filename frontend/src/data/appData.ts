import { SVG } from "@/assets/SVG";
import { IMAGES } from "@/assets/images";
import { LABELS } from "@/labels";
import { Design } from "@/types/ChooseDesignTypes";
import { ProductCardProps } from "@/types/ProductCardTypes";

export const GEN_CASE = [
  {
    title: LABELS.selectArt,
    text: LABELS.chooseYr,
    image: IMAGES.AccountCurrentBadgeIcon,
  },

  {
    title: LABELS.personalize,
    text: LABELS.choosePhone,
    image: IMAGES.AccountProfile,
  },

  {
    title: LABELS.chooseTry,
    text: LABELS.addTo,
    image: IMAGES.Ellipse3,
  },
];

export const ARROW_VALUES = [
  { left: 6, top: 10, rotate: -1.22, width: 70, height: 90 },
  { left: 16, top: 50, rotate: -1.217, width: 70, height: 90 },
];

export const CASE_OVERVIEW = [
  {
    title: `${LABELS.only} $39.99`,
    SVG: SVG.AccountCopyUsername,
  },

  { title: LABELS.freeShip, SVG: SVG.Arrow },

  {
    title: LABELS.satisfaction,
    SVG: SVG.Bookmark,
  },
];

export const FAQs = [
  {
    question: LABELS.faqQ1,
    answer: LABELS.faqA1,
  },
  {
    question: LABELS.faqQ1,
    answer: LABELS.faqA1,
  },
  {
    question: LABELS.faqQ1,
    answer: LABELS.faqA1,
  },
  {
    question: LABELS.faqQ1,
    answer: LABELS.faqA1,
  },
  {
    question: LABELS.faqQ1,
    answer: LABELS.faqA1,
  },
];

export const DESIGNS: Design[] = [
  {
    title: LABELS.willDescribe,
    image: IMAGES.Ellipse1,
  },
  // {
  //   title: LABELS.design1,
  //   image: IMAGES.design1,
  // },
  // {
  //   title: LABELS.design2,
  //   image: IMAGES.design2,
  // },

  // {
  //   title: LABELS.design3,
  //   image: IMAGES.design3,
  // },

  // {
  //   title: LABELS.design4,
  //   image: IMAGES.design4,
  // },

  // {
  //   title: LABELS.design5,
  //   image: IMAGES.design5,
  // },

  // {
  //   title: LABELS.design6,
  //   image: IMAGES.design6,
  // },

  // {
  //   title: LABELS.design7,
  //   image: IMAGES.design7,
  // },

  // {
  //   title: LABELS.design8,
  //   image: IMAGES.design8,
  // },

  // {
  //   title: LABELS.design9,
  //   image: IMAGES.design9,
  // },

  // {
  //   title: LABELS.design10,
  //   image: IMAGES.design10,
  // },

  // {
  //   title: LABELS.design11,
  //   image: IMAGES.design11,
  // },
];

export const iPhones = [
  { name: "iPhone 12", value: "iphone12" },
  { name: "iPhone 12 Pro", value: "iphone12Pro" },
  { name: "iPhone 12 Pro Max", value: "iphone12ProMax" },
  { name: "iPhone 13", value: "iphone13" },
  { name: "iPhone 13 Pro", value: "iphone13Pro" },
  { name: "iPhone 13 Pro Max", value: "iphone13ProMax" },
  { name: "iPhone 14", value: "iphone14" },
  { name: "iPhone 14 Pro", value: "iphone14Pro" },
  { name: "iPhone 14 Plus", value: "iphone14Plus" },
  { name: "iPhone 14 Pro Max", value: "iphone14ProMax" },
];

export const PRODUCTS: ProductCardProps[] = [
  {
    image: IMAGES.Ellipse2,
    price: "39.99",
    itemType: "remove",
    totalItems: 1,
    onActionClick: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
  },
  {
    image: IMAGES.Ellipse2,
    price: "49.99",
    itemType: "remove",
    totalItems: 1,
    onActionClick: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
  },
  {
    image: IMAGES.Ellipse2,
    price: "49.99",
    itemType: "remove",
    totalItems: 1,
    onActionClick: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
  },
  {
    image: IMAGES.Ellipse2,
    price: "49.99",
    itemType: "remove",
    totalItems: 1,
    onActionClick: () => {},
    onIncrement: () => {},
    onDecrement: () => {},
  },
];

export const CREDITS = [
  {
    credits: 50,
    amount: 10.99,
  },
  {
    credits: 150,
    amount: 25.99,
  },
  {
    credits: 100,
    amount: 18.99,
  },
  {
    credits: 200,
    amount: 30.99,
  },
];
