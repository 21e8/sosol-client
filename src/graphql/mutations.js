/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createTweet = /* GraphQL */ `
  mutation CreateTweet(
    $input: CreateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    createTweet(input: $input, condition: $condition) {
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
export const updateTweet = /* GraphQL */ `
  mutation UpdateTweet(
    $input: UpdateTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    updateTweet(input: $input, condition: $condition) {
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
export const deleteTweet = /* GraphQL */ `
  mutation DeleteTweet(
    $input: DeleteTweetInput!
    $condition: ModelTweetConditionInput
  ) {
    deleteTweet(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const createReaction = /* GraphQL */ `
  mutation CreateReaction(
    $input: CreateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    createReaction(input: $input, condition: $condition) {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const updateReaction = /* GraphQL */ `
  mutation UpdateReaction(
    $input: UpdateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    updateReaction(input: $input, condition: $condition) {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const deleteReaction = /* GraphQL */ `
  mutation DeleteReaction(
    $input: DeleteReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    deleteReaction(input: $input, condition: $condition) {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const createFile = /* GraphQL */ `
  mutation CreateFile(
    $input: CreateFileInput!
    $condition: ModelFileConditionInput
  ) {
    createFile(input: $input, condition: $condition) {
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
export const updateFile = /* GraphQL */ `
  mutation UpdateFile(
    $input: UpdateFileInput!
    $condition: ModelFileConditionInput
  ) {
    updateFile(input: $input, condition: $condition) {
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
export const deleteFile = /* GraphQL */ `
  mutation DeleteFile(
    $input: DeleteFileInput!
    $condition: ModelFileConditionInput
  ) {
    deleteFile(input: $input, condition: $condition) {
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
export const createRetweet = /* GraphQL */ `
  mutation CreateRetweet(
    $input: CreateRetweetInput!
    $condition: ModelRetweetConditionInput
  ) {
    createRetweet(input: $input, condition: $condition) {
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
export const updateRetweet = /* GraphQL */ `
  mutation UpdateRetweet(
    $input: UpdateRetweetInput!
    $condition: ModelRetweetConditionInput
  ) {
    updateRetweet(input: $input, condition: $condition) {
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
export const deleteRetweet = /* GraphQL */ `
  mutation DeleteRetweet(
    $input: DeleteRetweetInput!
    $condition: ModelRetweetConditionInput
  ) {
    deleteRetweet(input: $input, condition: $condition) {
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
export const createAuthPayload = /* GraphQL */ `
  mutation CreateAuthPayload(
    $input: CreateAuthPayloadInput!
    $condition: ModelAuthPayloadConditionInput
  ) {
    createAuthPayload(input: $input, condition: $condition) {
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
export const updateAuthPayload = /* GraphQL */ `
  mutation UpdateAuthPayload(
    $input: UpdateAuthPayloadInput!
    $condition: ModelAuthPayloadConditionInput
  ) {
    updateAuthPayload(input: $input, condition: $condition) {
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
export const deleteAuthPayload = /* GraphQL */ `
  mutation DeleteAuthPayload(
    $input: DeleteAuthPayloadInput!
    $condition: ModelAuthPayloadConditionInput
  ) {
    deleteAuthPayload(input: $input, condition: $condition) {
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
