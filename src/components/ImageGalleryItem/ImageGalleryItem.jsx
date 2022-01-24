import './ImageGalleryItem.scss';

export function ImageGalleryItem({ webformatURL, largeImageURL, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
        onClick={() => {
          onClick(largeImageURL);
        }}
      />
    </li>
  );
}
