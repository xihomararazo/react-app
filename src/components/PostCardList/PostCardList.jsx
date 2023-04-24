import { useState, useEffect } from "react";
import { GetList } from "../../services/PostService";
import PostCard from "../PostCard/PostCard";

function PostCardList({ changeAuth, filterTxt }) {
  const [cardList, setList] = useState([]);

  useEffect(() => {
    GetListData();
  }, []);

  function GetListData() {
    GetList()
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          changeAuth(false);
          alert("unauthorized, the session was expired");
        }
      });
  }
  const removePost = (idremove) => {
    var newList = cardList;
    const index = newList.findIndex((x) => x.id === idremove);
    if (index > -1) {
      newList.splice(index, 1);
    }
    console.log(newList);
    setList(newList);
    console.log(cardList);
  };

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
