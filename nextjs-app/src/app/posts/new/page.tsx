const PostForm = () => {
  const handleSubmit = async (formData:FormData) => {
    "use server"
    console.log("Title:", formData.get('title'));
    console.log("Body:", formData.get('body'));
  };

  return (
    <form className="border-2 m-2 p-2" action={handleSubmit}>
      <div className="flex gap-3">
        <label htmlFor="title">Title:</label>
        <input className="border-2" type="text" id="title" name="title" required />
      </div>

      <div className="flex gap-3">
        <label htmlFor="body">Body:</label>
        <textarea className="border-2" id="body" name="body" rows="5" required></textarea>
      </div>

      <button className="border-2 px-2" type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
