/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
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
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet {
    onUpdateTweet {
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
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      text
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReaction = /* GraphQL */ `
  subscription OnCreateReaction {
    onCreateReaction {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateReaction = /* GraphQL */ `
  subscription OnUpdateReaction {
    onUpdateReaction {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteReaction = /* GraphQL */ `
  subscription OnDeleteReaction {
    onDeleteReaction {
      id
      emojiId
      skin
      tweetId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
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
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
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
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
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
export const onCreateRetweet = /* GraphQL */ `
  subscription OnCreateRetweet {
    onCreateRetweet {
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
export const onUpdateRetweet = /* GraphQL */ `
  subscription OnUpdateRetweet {
    onUpdateRetweet {
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
export const onDeleteRetweet = /* GraphQL */ `
  subscription OnDeleteRetweet {
    onDeleteRetweet {
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
export const onCreateAuthPayload = /* GraphQL */ `
  subscription OnCreateAuthPayload {
    onCreateAuthPayload {
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
export const onUpdateAuthPayload = /* GraphQL */ `
  subscription OnUpdateAuthPayload {
    onUpdateAuthPayload {
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
export const onDeleteAuthPayload = /* GraphQL */ `
  subscription OnDeleteAuthPayload {
    onDeleteAuthPayload {
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
