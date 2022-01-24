import './Button.scss';

export function Button({ onClick }) {
  return (
    <button type="button" className="Button visually-hidden" onClick={onClick}>
      Load more
    </button>
  );
}
