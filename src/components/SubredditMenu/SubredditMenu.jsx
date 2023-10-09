import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits } from "../../app/subredditSlice";
import { setSelectedSubreddit } from "../../app/redditSlice";
import { BiLogoReddit } from "react-icons/bi";

const SubredditMenu = () => {
  const dispatch = useDispatch();
  const { subreddits, isLoading } = useSelector((store) => store.subreddits);
  const { selectedSubreddit } = useSelector((store) => store.reddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  return (
    <div className="mt-6 shadow-md px-4">
      <h2 className="text-center text-2xl font-bold">Subreddits</h2>
      <ul>
        {isLoading ? (
          <div className="text-center mt-6 font-bold text-xl">Cargando...</div>
        ) : (
          subreddits.map((subreddit) => (
            <li
              key={subreddit.id}
              className={`p-2 rounded-md font-semibold hover:bg-gray-100 ${selectedSubreddit === subreddit.url && "border-l-4 border-blue-500 bg-gray-100"}`}
            >
              <button
                className="flex items-center gap-x-4"
                onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
              >
                {subreddit.icon_img ? <img
                  className="w-12 h-12 rounded-full border-gray-200 border-4"
                  src={subreddit.icon_img}
                  alt={`${subreddit.display_name}`}
                /> : <BiLogoReddit className="w-12 h-12 rounded-full border-gray-200 border-4 text-blue-500" />}
                
                {subreddit.display_name}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SubredditMenu;
