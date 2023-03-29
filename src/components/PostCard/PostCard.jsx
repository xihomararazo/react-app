import LikeButton from "./LikeButton";

function PostCard({ img, time, isLike, likes, name, post, comentCount }) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 ">
      <div className="card m-3 text-start">
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row">
            <div className="col align-self-start">
              <h6 className="text-body-secondary pt-3">{time}</h6>
            </div>
            <LikeButton isLike={isLike} likes={likes} />
          </div>
          <h5 className="card-title text-body-emphasis pt-2">@{name}</h5>
          <p className="card-text">{post}</p>
          <a href="" className="btn btn-outline-secondary">
            <i className="fa-regular fa-comments"></i> Comments ({comentCount})
          </a>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
