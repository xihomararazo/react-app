function LikeButton({ likes, addLike }) {
  return (
    <div className="col align-self-end text-end">
      <button onClick={addLike} className="btn btn-danger">
        <i className="fa-solid fa-heart"></i> {likes}
      </button>
    </div>
  );
}
export default LikeButton;
