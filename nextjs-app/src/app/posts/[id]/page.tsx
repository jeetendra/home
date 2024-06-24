export default async ({ params, searchParams }) => {
  console.log({ params, searchParams });
  const postId = params.id;
  const post = await fetch(`https://dummyjson.com/posts/${postId}`, {
    cache: "force-cache",
  }).then((res) => res.json());
  console.log(post);
  return (
    <div>
      <h2 className="text-lg">{post.title}</h2>
      <p className="text-sm">{post.body}</p>
    </div>
  );
};
