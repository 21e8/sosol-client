import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Linkify from "linkifyjs/react";
import PersonIcon from '@material-ui/icons/Person';
import TweetFile from "../../styles/TweetFile";
import hashtag from "linkifyjs/plugins/hashtag";
import mention from "linkifyjs/plugins/mention";
import moment from "moment";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";
import { CommentIcon } from "../Icons";
import { EmojiTweet, DeleteTweet, Retweet } from "./index";
import { Link } from "react-router-dom";
import { onCreateReaction, onCreateComment } from "../../graphql/subscriptions";
import { setDate } from "../../utils";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding: 1.5rem 1rem 1rem 1rem;

  .avatar {
    margin-right: 1em;
    margin-bottom: 1em;
  }

  .tweet-info-user {
    display: flex;
  }

  .tweet-info-user span.username {
    font-weight: 500;
  }

  .tweet-info-user span.secondary {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.secondaryColor};
  }

  .tags {
    display: flex;
  }

  a.body {
    color: ${(props) => props.theme.accentColor};
  }

  div.tweet-stats {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;

    div {
      margin-right: 4rem;
      min-width: 40px;
      color: ${(props) => props.theme.secondaryColor};
    }

    svg {
      margin-right: 0.5rem;
    }

    span {
      display: flex;
      align-items: center;
    }

    span.comment {
      svg {
        position: relative;
        top: 4px;
      }
    }
  }

  @media screen and (max-width: 470px) {
    div.tweet-stats {
      div {
        margin-right: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;

    .username {
      display: none;
    }

    .avatar {
      display: none;
    }

    .tweet-info-user span.secondary {
      padding-left: 0;
      padding-right: 0.5rem;
    }
  }
`;

export const Tweet = ({ tweet }) => {
  // const handle = user && user.handle;
  const handle = null;
  const [reactions, setReactions] = useState(tweet.reactions?.items);
  const [comments, setComments] = useState(tweet.comments?.items);

  useEffect(() => {
    (async () => await API.graphql(graphqlOperation(onCreateReaction)).subscribe({
      next: (reactionData) => {
        const reaction = reactionData.value.data.onCreateReaction;
        setReactions([reaction, ...reactions]);
      },
    }))();
    (async () => await API.graphql(graphqlOperation(onCreateComment)).subscribe({
      next: (commentData) => {
        const comment = commentData.value.data.onCreateComment;
        setComments([comment, ...comments]);
      },
    }))();
  }, [reactions, comments]);

  const linkifyOptions = {
    formatHref: function (value, type) {
      if (type === "hashtag") {
        return "explore?=" + value.substring(1);
      }
      return value;
    },
    className: "body",
  };

  return (
    <Wrapper>
      <Link /* to={`/${handle}`} */>
        {/* {user && user.avatar ? <Avatar size="large" src={user.avatar} /> : <Avatar size="large" icon={<UserOutlined />} />} */}
        <Avatar className="avatar">
          <PersonIcon />
        </Avatar>
      </Link>

      <div className="tweet-info">
        <div className="tweet-info-user">
          {/* <Link to={`/${handle}`}>
            <span className="username">{user && user.fullname}</span>
            <span className="secondary">{`@${handle}`}</span>
          </Link>*/}
          &nbsp;&nbsp;
          <Link to={`/${handle}/status/${tweet.id}`} className="secondary">
            {moment(setDate(tweet.createdAt)).fromNow()}
          </Link> 
        </div>

        <Linkify options={linkifyOptions}>
          <p>{tweet.text}</p>
        </Linkify>

        {/* <Link to={`/${handle}/status/${id}`}>
          {files && files.length && files[0] ? (
            <TweetFile src={files[0].url} alt="tweet-file" />
          ) : null}
        </Link> */}

        <div className="tweet-stats">
          <span>
            <EmojiTweet tweetId={tweet.id} reactions={reactions} />
          </span>

          <div>
            <span className="comment">
              <Link to={`/${handle}/status/${tweet.id}`}>
                <CommentIcon />
                {comments?.length ? comments?.length : null}
              </Link>
            </span>
          </div>

          <div>
            {/* <Retweet
              id={id}
              isRetweet={isRetweet}
              retweetsCount={retweetsCount}
            /> */}
          </div>

          <div>
            {/* <span>{isTweetMine ? <DeleteTweet id={id} /> : null}</span> */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
