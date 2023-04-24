import { Link } from "react-router-dom";
import { DeleteCommentsPost } from "../../services/PostService";

function Comment({
  text,
  user,
  createdAt,
  id,
  changeAuth,
  idPos,
  removeComment,
}) {
  const dateObj = new Date(createdAt);

  const onDeletePost = () => {
    DeleteCommentsPost(idPos, id)
      .then(() => {
        console.log("Delete Post");
        removeComment(id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  };

  return (
    <div className="col-12 ">
      <div className="card m-2 text-start">
        <div className="d-flex flex-row-reverse">
          <button onClick={onDeletePost} className={"btn "}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="card-body">
          <div className="d-flex flex-row">
            <img
              src={user.avatar}
              className=" img-thumbnail border border-primary rounded-circle mt-2 me-2"
              alt="..."
              style={{ height: 30, width: 30 }}
            />
            <Link to={`/perfil/${user.id}`}>
              <h5 className="card-title text-body-emphasis mt-2">
                @{user.username}
              </h5>
            </Link>
          </div>

          <div className="col align-self-start">
            <h6 className="text-body-secondary pt-2">
              {dateObj.toLocaleString("en-US")}
            </h6>
          </div>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}
export default Comment;
