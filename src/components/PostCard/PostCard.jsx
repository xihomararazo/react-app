import { useState } from "react";
import LikeButton from "./LikeButton";

function PostCard({ image, createdAt, isLike, likes, autor, text, comments }) {
  const [myLike, setMyLike] = useState(isLike);
  const [totalLikes, setNumLikes] = useState(likes);

  const myLikeChange = (event) => {
    if (!myLike) {
      setMyLike(true);
      setNumLikes(totalLikes + 1);
    } else {
      setMyLike(false);
      setNumLikes(totalLikes - 1);
    }
  };

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 ">
      <div className="card m-3 text-start">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row">
            <div className="col align-self-start">
              <h6 className="text-body-secondary pt-3">{createdAt}</h6>
            </div>
            <LikeButton
              isLike={myLike}
              likes={totalLikes}
              myLikeChange={myLikeChange}
            />
          </div>
          <h5 className="card-title text-body-emphasis pt-2">@{autor}</h5>
          <p className="card-text">{text}</p>
          <button className="btn btn-outline-secondary">
            <i className="fa-regular fa-comments"></i> Comments ({comments})
          </button>
        </div>
      </div>
    </div>
  );
}
export default PostCard;
