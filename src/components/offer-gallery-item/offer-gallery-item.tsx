type OfferGalleryItemProps = {
  offerImage: string;
}

export function OfferGalleryItem({offerImage}: OfferGalleryItemProps): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={offerImage} alt="Photo studio"/>
    </div>
  );
}
