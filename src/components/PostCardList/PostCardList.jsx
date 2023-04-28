import PostCard from "../PostCard/PostCard";

function PostCardList({ changeAuth, filterTxt, cardList, removePost }) {
  if (!cardList.length) {
    return (
      <div className="center">
        <h3 className="mt-5">Loading...</h3>
      </div>
    );
  } else {
    return (
      <div className="row">
        {cardList
          .filter((card) =>
            card.text.toLowerCase().includes(filterTxt.toLowerCase())
          )
          .map((card, i) => (
            <PostCard
              key={i}
              image={card.image}
              createdAt={card.createdAt}
              likes={card.likes}
              author={card.author}
              text={card.text}
              comments={card.comments}
              id={card.id}
              changeAuth={changeAuth}
              removePost={removePost}
            />
          ))}
      </div>
    );
  }
}

export default PostCardList;
