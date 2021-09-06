import React, { useEffect, useState } from "react";
import AddComment from "../Comment/AddComment";
import Comment from "../Comment/Comment";
import CustomResponse from "../CustomResponse";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import { Loader } from "../Loader";
import { TWEET } from "../../queries/tweet";
import { Tweet } from "./Tweet";
import { getTweet } from '../../graphql/queries';
import { onCreateComment } from "../../graphql/subscriptions";
import { sortFn } from "../../utils";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

export const MasterTweet = () => {
  const { tweetId } = useParams();
  const [tweet, setTweet] = useState();
  const [comments, setComments] = useState([]);

  const fetchTweet = async () => {
    try {
      const tweetData = await API.graphql(graphqlOperation(getTweet, { id: tweetId }));
      const tweet = tweetData.data.getTweet;
      setTweet(tweet);
      const sortComments = tweet.comments?.items?.length ? tweet.comments?.items?.sort(sortFn) : [];
      setComments(sortComments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => await API.graphql(graphqlOperation(onCreateComment)).subscribe({
      next: (commentData) => {
        const comment = commentData.value.data.onCreateComment;
        setComments([comment, ...comments]);
      },
    }))();
  }, [comments]);

  useEffect(() => {
    fetchTweet();
  }, []);

  return (
    <Wrapper>
      {/* {loading ? (
        <Loader />
      ) : (*/}
        <>
          {tweet && tweet.id ? (
            <Tweet tweet={tweet} comments={comments} />
          ) : (
            <CustomResponse text="Oops, the tweet you are looking for doesn't seem to be exist." />
          )}
          {tweet && tweet.id ? (
            <AddComment id={tweet.id} />
          ) : null}
          {comments && comments?.length > 0 && comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </>
      {/*)} */}
    </Wrapper>
  );
};
