function Profile({ avatar, username, bio }) {
  return (
    <div className="container text-center">
      <img
        src={avatar}
        className="img-thumbnail border border-primary rounded-circle mt-5"
        alt="..."
      ></img>
      <h5 className="card-title text-body-emphasis pt-2">@{username}</h5>
      <p className="pt-2">{bio}</p>
    </div>
  );
}
export default Profile;
