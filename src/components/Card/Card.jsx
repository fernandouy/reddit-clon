import React, { useState } from "react";
import { BiDownvote, BiUpvote, BiComment } from "react-icons/bi";
import moment from "moment";

const Card = ({ title, score, url, num_comments, author, created }) => {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  const handleUpvote = () => {
    if (!upvote) {
      setUpvote(true);
      setDownvote(false);
    } else {
      setUpvote(false);
    }
  }

  const handleDownvote = () => {
    if (!downvote) {
      setDownvote(true);
      setUpvote(false);
    } else {
      setDownvote(false);
    }
  }

  return (
    <div className="mt-6 w-full shadow-md rounded-lg grid grid-cols-4 sm:grid-cols-12 p-4 gap-4">
      <div className="col-start-1 col-end-2 flex flex-col items-center gap-2 font-bold text-gray-500">
        <BiUpvote
          className={`w-6 h-6 ${upvote && "text-[#FF8b60]"}`}
          onClick={handleUpvote}
        />
        <p>{score}</p>
        <BiDownvote
          className={`w-6 h-6 ${downvote && "text-[#9494FF]"}`}
          onClick={handleDownvote}
        />
      </div>
      <div className="col-start-2 col-end-5 sm:col-end-13">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <img
          src={`https://i.redd.it/${url}.jpg`}
          className="rounded-lg"
          alt="post-img"
        />
        <hr className="my-4" />
        <div className="flex justify-between text-gray-400">
          <p>
            Posted by <span className="text-blue-500">{author}</span>
          </p>
          <p>{moment.unix(created).fromNow()}</p>
          <p className="inline-flex gap-2 items-center">
            <BiComment />
            {num_comments}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
