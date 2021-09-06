import gql from "graphql-tag";

export const FEED = gql`
  query TweetFeed {
    TweetFeed(type: "Post", sortDirection: DESC) {
      items {
        id
        text
        tags
        createdAt
        # isTweetMine
        # commentsCount
        # retweetsCount
        # isRetweet
        # files {
        #   id
        #   url
        # }
        # user {
        #   id
        #   avatar
        #   handle
        #   fullname
        # }
        reactions {
          items {
            id
            emojiId
            skin
          }
        }
        comments {
          items {
            id
            text
            tweetId
            createdAt
          }
        }
      }
    }
  }
`;

export const USERS = gql`
  query users {
    users {
      id
      handle
      isFollowing
      isSelf
      fullname
      avatar
    }
  }
`;

export const MENTIONS = gql`
  query mention {
    mentions {
      id
      text
      tags
      isTweetMine
      commentsCount
      retweetsCount
      isRetweet
      reactions {
        id
        emojiId
        skin
        isMine
        count
      }
      files {
        id
        url
      }
      user {
        id
        avatar
        handle
        fullname
      }
      createdAt
    }
  }
`;
