import Comment from "../Comment/Comment";

function CommentList({ comments }) {
  return (
    <div className="row">
      {comments.map((comment, i) => (
        <Comment
          key={i}
          text={comment.text}
          user={comment.user}
          createdAt={comment.createdAt}
          id={comment.id}
        />
      ))}
    </div>
  );
}
export default CommentList;
