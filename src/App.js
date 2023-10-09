import { useEffect } from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import SubredditMenu from "./components/SubredditMenu/SubredditMenu";
import { useDispatch, useSelector } from "react-redux";
import { getSubredditPosts } from "./app/redditSlice";

function App() {
  const dispatch = useDispatch();
  const { posts, selectedSubreddit } = useSelector((state) => state.reddit);

  useEffect(() => {
    dispatch(getSubredditPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  return (
    <>
      <Header />
      <main className="pt-16 container grid grid-cols-1 sm:grid-cols-3 gap-4 mx-auto">
        <div className="col-span-2 mt-6">
          <h2 className="font-bold text-3xl text-center">{selectedSubreddit}</h2>
          {posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              score={post.score}
              url={post.gallery_data?.items[0].media_id}
              num_comments={post.num_comments}
              author={post.author}
              created={post.created}
            />
          ))}
        </div>
        <div>
          <SubredditMenu />
        </div>
      </main>
    </>
  );
}

export default App;
