import PostCard from "../PostCard/PostCard";

const cardList = [
  {
    img: "https://via.placeholder.com/150",
    time: "3 min ago",
    isLike: true,
    likes: "43 K",
    name: "Xihomara",
    post: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    comentCount: 15,
  },
  {
    img: "https://via.placeholder.com/150",
    time: "18:00",
    isLike: false,
    likes: "80 K",
    name: "Juan",
    post: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    comentCount: 50,
  },
  {
    img: "https://via.placeholder.com/150",
    time: "10:00",
    isLike: true,
    likes: "10 K",
    name: "Mar",
    post: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    comentCount: 20,
  },
  {
    img: "https://via.placeholder.com/150",
    time: "yesterday",
    isLike: false,
    likes: "0",
    name: "Oscar",
    post: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    comentCount: 35,
  },
];

function PostCardList() {
  return (
    <div className="row">
      {cardList.map((card, i) => (
        <PostCard
          key={i}
          img={card.img}
          time={card.time}
          isLike={card.isLike}
          likes={card.likes}
          name={card.name}
          post={card.post}
          comentCount={card.comentCount}
        />
      ))}
    </div>
  );
}

export default PostCardList;
