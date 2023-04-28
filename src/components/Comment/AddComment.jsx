import { AddCommentsPost } from "../../services/PostService";

function AddComment({ idPost, changeAuth, createCommentObj }) {
  const onComment = () => {
    const comment = document.getElementById("comment");
    AddCommentsPost(idPost, comment.value)
      .then((res) => {
        console.log("New Comment");
        console.log(res.data);
        createCommentObj(res.data);
        comment.value = "";
      })
      .catch((error) => {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  };

  return (
    <div className="container mt-2 mb-2">
      <div className="d-flex">
        <input type="text" className="form-control" id="comment" />
        <button onClick={onComment} className={"btn btn btn-primary ms-2"}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AddComment;
