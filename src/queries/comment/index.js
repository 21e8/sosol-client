import gql from "graphql-tag";

export const ADD_COMMENT = gql`
  mutation addComment($tweetId: ID!, $text: String!) {
    addComment(tweetId: $tweetId, text: $text) {
      id
      text
      # isCommentMine
      # user {
      #   id
      #   handle
      #   avatar
      #   fullname
      # }
      createdAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;
