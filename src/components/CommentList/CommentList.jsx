import Comment from "../Comment/Comment";

function CommentList({ idPost, comments, changeAuth, removeComment }) {
  return (
    <div className="row">
      {comments.map((comment, i) => (
        <Comment
          key={i}
          text={comment.text}
          user={comment.user}
          createdAt={comment.createdAt}
          id={comment.id}
          idPos={idPost}
          changeAuth={changeAuth}
          removeComment={removeComment}
        />
      ))}
    </div>
  );
}
export default CommentList;
