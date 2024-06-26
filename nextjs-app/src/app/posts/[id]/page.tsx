import { query } from "@/db";
import { notFound } from "next/navigation";

function fetchFromServer() {
  // const post = await fetch(`https://dummyjson.com/posts/${postId}`, {
  //   cache: "force-cache",
  // }).then((res) => res.json());
  // console.log(post);
}

const Post = async ({ params, searchParams }:{ params:any, searchParams:any}) => {
  console.log({ params, searchParams });
  const postId = params.id;
  const queyStr = `select * from posts where id = ${postId}`;

  const { rows } = await query(queyStr);
  const post = rows[0];

  console.log(post);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h2 className="text-lg">{post.title}</h2>
      <p className="text-sm">{post.body}</p>
    </div>
  );
};

export default Post;