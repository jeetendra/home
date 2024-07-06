import { query } from "@/db";
import { getCache, setCache } from "@/services/cache";
import Link from "next/link";

const Posts = async () => {
  // const posts = await fetch("https://dummyjson.com/posts?select=title", {
  //   cache: "force-cache",
  // }).then((res) => res.json());
  // console.log(posts);

  let posts = await getCache('posts');

  if(!posts) {
    console.log("Fetching fresh data")
    const queyStr = `select * from posts limit 30`;

    ({ rows: posts } = await query(queyStr));
    setCache('posts', posts);
  }

  

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            <Link href={`posts/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts