import { useState } from "react";
import { Link } from "react-router-dom";
import { DeletePost, PostLike } from "../../services/PostService";
import { GetProfile } from "../../services/UsersService";
import AddComment from "../Comment/AddComment";
import CommentList from "../CommentList/CommentList";
import LikeButton from "./LikeButton";

function PostCard({
  image,
  createdAt,
  likes,
  author,
  text,
  comments,
  id,
  changeAuth,
  removePost,
}) {
  const [totalLikes, setNumLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [list, setList] = useState(comments.reverse());

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

  const removeComment = (idremove) => {
    var newList = [...list];
    const index = newList.findIndex((x) => x.id === idremove);
    if (index > -1) {
      newList.splice(index, 1);
    }
    setList(newList);
  };

  const createCommentObj = (data) => {
    GetProfile(data.user)
      .then((p) => {
        var newList = [...list];
        const newComment = {
          text: data.text,
          user: {
            avatar: p.data.avatar,
            name: p.data.name,
            username: p.data.username,
            bio: p.data.bio,
            createdAt: p.data.createdAt,
            updatedAt: p.data.updatedAt,
            id: p.data.id,
          },
          post: data.post,
          createdAt: data.createdAt,
          id: data.id,
        };

        newList.unshift(newComment);
        setList(newList);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  };

  const onDeletePost = () => {
    DeletePost(id)
      .then((res) => {
        console.log(res);
        removePost(id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  };

  function CommentsList() {
    if (showComments) {
      return (
        <div>
          <AddComment
            idPost={id}
            changeAuth={changeAuth}
            createCommentObj={createCommentObj}
          />
          <CommentList
            key={id}
            idPost={id}
            comments={list}
            changeAuth={changeAuth}
            removeComment={removeComment}
          />
        </div>
      );
    }
  }

  const dateObj = new Date(createdAt);

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 ">
      <div className="card m-3 text-start">
        <div className="d-flex flex-row-reverse">
          <button onClick={onDeletePost} className={"btn "}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <img src={image} className="card-img-top p-2" alt="..." />
        <div className="card-body">
          <div className="row">
            <div className="col align-self-start">
              <h6 className="text-body-secondary pt-3">
                {dateObj.toLocaleString("en-US")}
              </h6>
            </div>
            <LikeButton likes={totalLikes} addLike={addLike} />
          </div>
          <Link to={`/perfil/${author.id}`}>
            <h5 className="card-title text-body-emphasis pt-2">
              @{author.username}
            </h5>
          </Link>
          <p className="card-text">{text}</p>
          <button
            onClick={ShowCommentsList}
            className="btn btn-outline-secondary"
          >
            <i className="fa-regular fa-comments"></i> Comments ({list.length})
          </button>
        </div>
        {CommentsList()}
      </div>
    </div>
  );
}
export default PostCard;
