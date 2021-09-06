/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstname
      lastname
      handle
      walletId
      coverPhoto
      avatar
      bio
      location
      website
      dob
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        handle
        walletId
        coverPhoto
        avatar
        bio
        location
        website
        dob
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTweet = /* GraphQL */ `
  query GetTweet($id: ID!) {
    getTweet(id: $id) {
      id
      text
      tags
      mentions
      comments {
        items {
          id
          text
          tweetId
          createdAt
          updatedAt
        }
        nextToken
      }
      reactions {
        items {
          id
          emojiId
          skin
          tweetId
          createdAt
          updatedAt
        }
        nextToken
      }
      type
      createdAt
      updatedAt
    }
  }
`;
export const listTweets = /* GraphQL */ `
  query ListTweets(
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        tags
        mentions
        comments {
          nextToken
        }
        reactions {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        tweetId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReaction = /* GraphQL */ `
  query GetReaction($id: ID!) {
    getReaction(id: $id) {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const listReactions = /* GraphQL */ `
  query ListReactions(
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        emojiId
        skin
        tweetId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
      id
      url
      tweet {
        id
        text
        tags
        mentions
        comments {
          nextToken
        }
        reactions {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      user {
        id
        firstname
        lastname
        handle
        walletId
        coverPhoto
        avatar
        bio
        location
        website
        dob
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        tweet {
          id
          text
          tags
          mentions
          type
          createdAt
          updatedAt
        }
        user {
          id
          firstname
          lastname
          handle
          walletId
          coverPhoto
          avatar
          bio
          location
          website
          dob
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getRetweet = /* GraphQL */ `
  query GetRetweet($id: ID!) {
    getRetweet(id: $id) {
      id
      tweet {
        id
        text
        tags
        mentions
        comments {
          nextToken
        }
        reactions {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      user {
        id
        firstname
        lastname
        handle
        walletId
        coverPhoto
        avatar
        bio
        location
        website
        dob
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRetweets = /* GraphQL */ `
  query ListRetweets(
    $filter: ModelRetweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRetweets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tweet {
          id
          text
          tags
          mentions
          type
          createdAt
          updatedAt
        }
        user {
          id
          firstname
          lastname
          handle
          walletId
          coverPhoto
          avatar
          bio
          location
          website
          dob
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAuthPayload = /* GraphQL */ `
  query GetAuthPayload($id: ID!) {
    getAuthPayload(id: $id) {
      id
      token
      user {
        id
        firstname
        lastname
        handle
        walletId
        coverPhoto
        avatar
        bio
        location
        website
        dob
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAuthPayloads = /* GraphQL */ `
  query ListAuthPayloads(
    $filter: ModelAuthPayloadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAuthPayloads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        token
        user {
          id
          firstname
          lastname
          handle
          walletId
          coverPhoto
          avatar
          bio
          location
          website
          dob
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tweetFeed = /* GraphQL */ `
  query TweetFeed(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTweetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    TweetFeed(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        tags
        mentions
        comments {
          nextToken
        }
        reactions {
          nextToken
        }
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
