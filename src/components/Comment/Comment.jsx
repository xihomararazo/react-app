function Comment({ text, user, createdAt, id }) {
  return (
    <div className="col-12 ">
      <div className="card m-2 text-start">
        <div className="card-body">
          <div className="d-flex flex-row">
            <img
              src={user.avatar}
              className=" img-thumbnail border border-primary rounded-circle mt-2 me-2"
              alt="..."
              style={{ height: 30, width: 30 }}
            />
            <h5 className="card-title text-body-emphasis mt-2">
              @{user.username}
            </h5>
          </div>

          <div className="col align-self-start">
            <h6 className="text-body-secondary pt-2">
              {createdAt.substr(0, 10)}
            </h6>
          </div>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}
export default Comment;
