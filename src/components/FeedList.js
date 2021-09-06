import React, { useEffect, useState } from "react";
import CustomResponse from "./CustomResponse";
import styled from "styled-components";
import { FEED } from "../queries/others";
import { Loader } from "./Loader";
import { Tweet } from "./Tweet";
import { API, graphqlOperation } from "aws-amplify";
import { onCreateTweet } from "../graphql/subscriptions";

const Wrapper = styled.div`
  margin-bottom: 7rem;
`;

export const FeedList = () => {
  // const { loading, error, data } = useQuery(FEED);
  const [tweets, setTweets] = useState([]);

  const fetchFeed = async () => {
    try {
      const tweetData = await API.graphql(graphqlOperation(FEED));
      const tweets = tweetData.data.TweetFeed.items;
      setTweets(tweets);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => await API.graphql(graphqlOperation(onCreateTweet)).subscribe({
      next: (tweetData) => {
        const tweet = tweetData.value.data.onCreateTweet;
        setTweets([tweet, ...tweets]);
      },
    }))();
    // (async () => await API.graphql(graphqlOperation(onCreateReaction)).subscribe({
    //   next: (tweetData) => {
    //     const tweet = tweetData.value.data.onCreateTweet;
    //     setData([tweet, ...data]);
    //   },
    // }))();
  }, [tweets]);

  useEffect(() => {
    fetchFeed();
  }, []);

  // if (loading) return <Loader />;
  // if (error) return <p>Error :(</p>;

  // // logout the user if removed from db
  // if(data === undefined) {
  // 	localStorage.clear();
  // }

  return (
    <Wrapper>
      {tweets.length ? (
        tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      ) : (
        <CustomResponse text="Follow some people to get some feed updates" />
      )}
    </Wrapper>
  );
};
