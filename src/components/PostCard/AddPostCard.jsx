import { CreatePost } from "../../services/PostService";

function AddPostCard({ changeAuth,onCreateNewPost }) {
  const onCreatePost = () => {
    const image = document.getElementById("image");
    const txt = document.getElementById("txt");
    const btn = document.getElementById("btn");

    if (image.value === "") {
      image.classList.add("is-invalid");
    }
    if (txt.value === "") {
      txt.classList.add("is-invalid");
    }

    if (image.value !== "" && txt.value !== "") {
      image.classList.remove("is-invalid");
      txt.classList.remove("is-invalid");
      btn.textContent = "Loading...";

      CreatePost(image.files[0], txt.value)
        .then((res) => {
          console.log(res);
          onCreateNewPost(res);
          image.value = "";
          txt.value = "";
         
        })
        .catch((error) => {
          if (error.response.status === 401) {
            changeAuth(false);
            alert("unauthorized, the session was expired");
          }
        });
      btn.textContent = "Send";
    }
  };
  return (
    <div className="col-sm-12 ">
      <div className="card m-3 text-start">
        <div className="card-body">
          <h4>Create a new post</h4>
          <form>
            <div className="text-start mb-3">
              <label forhtml="image" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/png, image/jpeg"
                id="image"
              />
            </div>

            <div className="text-start mb-3">
              <label forhtml="txt" className="form-label">
                text
              </label>
              <input type="text" className="form-control" id="txt" />
            </div>
          </form>
          <div className="d-grid">
            <button
              id="btn"
              onClick={onCreatePost}
              type="button"
              className="btn btn-primary ms-5 me-5 mt-3"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddPostCard;
