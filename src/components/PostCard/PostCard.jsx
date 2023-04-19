import { useState } from "react";
import { PostLike } from "../../services/PostService";
import CommentList from "../CommentList/CommentList";
import LikeButton from "./LikeButton";

function PostCard({ image, createdAt, likes, author, text, comments, id }) {
  const [totalLikes, setNumLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);

  const addLike = (event) => {
    PostLike(id)
      .then(() => {
        setNumLikes(totalLikes + 1);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Sesion was expired");
        }
      });
  };
  const ShowCommentsList = (event) => {
    setShowComments(!showComments);
  };
  function CommentsList() {
    if (showComments) {
      return <CommentList key={id} comments={comments} />;
    }
  }

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 ">
      <div className="card m-3 text-start">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="row">
            <div className="col align-self-start">
              <h6 className="text-body-secondary pt-3">
                {createdAt.substr(0, 10)}
              </h6>
            </div>
            <LikeButton likes={totalLikes} addLike={addLike} />
          </div>
          <h5 className="card-title text-body-emphasis pt-2">
            @{author.username}
          </h5>
          <p className="card-text">{text}</p>
          <button
            onClick={ShowCommentsList}
            className="btn btn-outline-secondary"
          >
            <i className="fa-regular fa-comments"></i> Comments (
            {comments.length})
          </button>
        </div>
        {CommentsList()}
      </div>
    </div>
  );
}
export default PostCard;
