function LikeButton({ isLike, likes }) {
  if (isLike === true) {
    return (
      <div className="col align-self-end text-end">
        <a href="#" className="btn btn-danger">
          <i className="fa-solid fa-heart"></i> {likes}
        </a>
      </div>
    );
  }
  return (
    <div className="col align-self-end text-end">
      <a href="#" className="btn btn-secondary">
        <i className="fa-regular fa-heart"></i> {likes}
      </a>
    </div>
  );
}
export default LikeButton;
