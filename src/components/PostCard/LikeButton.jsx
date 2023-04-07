function LikeButton({ isLike, likes, myLikeChange }) {
  if (isLike === true) {
    return (
      <div className="col align-self-end text-end">
        <button onClick={myLikeChange} className="btn btn-danger">
          <i className="fa-solid fa-heart"></i> {likes}
        </button>
      </div>
    );
  }
  return (
    <div className="col align-self-end text-end">
      <button onClick={myLikeChange} className="btn btn-secondary">
        <i className="fa-regular fa-heart"></i> {likes}
      </button>
    </div>
  );
}
export default LikeButton;
