export type Offer = {
  id: number;
  image: string;
  price: number;
  priceText: string;
  isBookMarked: boolean;
  rating: number;
  href: string;
  hrefTitle: string;
  type: string;
}

export type Offers = Offer[];
