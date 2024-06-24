import Link from "next/link";

export default async () => {
  const posts = await fetch("https://dummyjson.com/posts?select=title", {
    cache: "force-cache",
  }).then((res) => res.json());
  console.log(posts);
  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {posts.posts.map((item) => (
          <li key={item.id}>
            <Link href={`posts/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
