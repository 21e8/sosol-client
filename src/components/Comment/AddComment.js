import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
// import { useQuery, useMutation } from "@apollo/client";
import useInput from "../../hooks/useInput";
import Button from "../../styles/Button";
import { displayError } from "../../utils";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import { TWEET } from "../../queries/tweet";
import { ADD_COMMENT } from "../../queries/comment";
import { USER } from "../../queries/user";
import { createComment } from '../../graphql/mutations';
import { API } from "aws-amplify";

const Wrapper = styled.div`
	display: flex;
	padding: 1rem 1rem;
	border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};

	textarea {
		width: 100%;
		background: inherit;
		border: none;
		font-size: 1.23rem;
		font-family: ${(props) => props.theme.font};
		color: ${(props) => props.theme.primaryColor};
		margin-bottom: 1.4rem;
	}

	.add-comment {
		display: flex;
		flex-direction: column;
	}

	.add-comment-action
		display: flex;
		align-items: center;
	}

	@media screen and (max-width: 530px) {
		textarea {
		  font-size: 0.9rem;
		}
	}
`;

const AddComment = ({ id }) => {
  const comment = useInput("");

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!comment.value) return toast("Reply something");

    try {
      const commentDetails = {
        tweetId: id,
        text: comment.value,
      };
      await API.graphql({ query: createComment, variables: { input: commentDetails }});

      toast.success("Your reply has been added");
    } catch (err) {
      return displayError(err);
    }

    comment.setValue("");
  };

  // const {
  //   data: { user },
  // } = useQuery(USER);

  return (
    <Wrapper>
      {/* <Avatar size="large" icon={user && user.avatar} /> */}
      <Avatar>
        <PersonIcon />
      </Avatar>

      <form onSubmit={handleAddComment}>
        <div className="add-comment">
          <TextareaAutosize
            cols="48"
            placeholder="Tweet your reply"
            type="text"
            value={comment.value}
            onChange={comment.onChange}
          />

          <div className="add-comment-action">
            <Button sm /* disabled={loading} */>
              Reply
            </Button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddComment;
