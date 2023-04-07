import { useState, useEffect } from "react";
import { GetList } from "../../services/PostService";

import PostCard from "../PostCard/PostCard";

function PostCardList({ filterTxt }) {
  const [cardList, setList] = useState([]);

  useEffect(() => {
    GetList().then((data) => {
      setList(data);
    });
  });

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
              isLike={card.isLike}
              likes={card.likes}
              autor={card.autor}
              text={card.text}
              comments={card.comments}
            />
          ))}
      </div>
    );
  }
}

export default PostCardList;
