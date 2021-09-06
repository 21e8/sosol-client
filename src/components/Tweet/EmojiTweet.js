import React, { useState, useContext } from "react";
import _ from "lodash";
import styled from "styled-components";
import { a, API } from "aws-amplify";
import { Emoji, Picker } from "emoji-mart";
import { Loader } from "../Loader";
import { SmilePlusIcon } from "../Icons";
import { ThemeContext } from "styled-components";
import { createReaction } from "../../graphql/mutations";
import { displayError } from "../../utils";
import { toast } from "react-toastify";

import "emoji-mart/css/emoji-mart.css";
import { LocalDrinkSharp } from "@material-ui/icons";

const Wrapper = styled.div`
  .emoji-mart {
    position: absolute;
  }
  .emoji-mart-preview {
    display: none;
  }
  .emoji-mart-dark {
    border-color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.background};
  }
  .emoji-mart-scroll::-webkit-scrollbar {
    width: 0.25rem;
  }
  .emoji-mart-scroll::-webkit-scrollbar-track {
    background: ${(props) => props.theme.background};
  }
  .emoji-mart-scroll::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.accentColor};
  }
  .emoji-pick {
    margin-left: 8px;
  }
  .emoji-count {
    border-radius: 7px;
    padding: 4px 4px 0;
    margin-right: 4px;
    cursor: pointer;
  }
  .emoji-count.mine {
    border: 1px solid ${(props) => props.theme.tertiaryColor};
    background: ${(props) => props.theme.tertiaryColor2};
  }
  .emoji-number {
    font-size: 14px;
    margin-left: 2px;
    vertical-align: text-bottom;
    color: ${(props) => props.theme.secondaryColor};
  }
  @media screen and (max-width: 430px) {
    .emoji-mart {
      position: fixed;
      bottom: 5em;
    }
  }
`;

export const EmojiTweet = ({ tweetId, reactions }) => {
  const theme = useContext(ThemeContext);
  const [picker, togglePicker] = useState(false);
  const [emoji, setEmoji] = useState({});

  const handleReaction = async ({ emojiId, skin }) => {
    try {
      setEmoji({ emojiId, skin });
      const emojiDetails = {
        tweetId,
        emojiId: emoji?.emojiId,
        skin: emoji?.skin,
      };
      await API.graphql({
        query: createReaction,
        variables: { input: emojiDetails },
      });
      toast.success("Reaction updated");
    } catch (err) {
      return displayError(err);
    }
  };

  const ReactionList = ({ reactions }) => {
    const r = _.chain(reactions)
      .map((R, i, arr) => {
        // TODO: set isMine from userID
        // Set the count of emojis
        R.count = arr.filter((r) => r.emojiId === R.emojiId).length;
        return R;
      })
      .uniqBy("emojiId")
      .map(({ id, emojiId, skin, count, isMine = false }) => {
        return (
          <span
            className={`emoji-count ${isMine ? "mine" : ""}`}
            onClick={() => handleReaction({ emojiId, skin })}
            key={id}
          >
            <Emoji emoji={{ id: emojiId, skin }} size={16} />
            <span className="emoji-number">{count > 0 && count}</span>
          </span>
        );
      })
      .sortBy(['emojiId'])
      .value();
    // const r = reactions.map((R, i, arr) => {
    //     R.count = arr.filter(r => r.emojiId === R.emojiId).length;
    //     return R;
    //   })
    //   // .filter((i) => i.count === 1 || (i.count > 1 && i.isMine))
    //   // .sort((a, b) => a.emojiId.localeCompare(b.emojiId))
    //   .map(({ id, emojiId, skin, count, isMine }) => {
    //     return (
    //       <span
    //         className={`emoji-count ${isMine ? "mine" : ""}`}
    //         onClick={() => handleReaction({ emojiId, skin })}
    //         key={id}
    //       >
    //         <Emoji emoji={{ id: emojiId, skin }} size={16} />
    //         <span className="emoji-number">{count > 0 && count}</span>
    //       </span>
    //     );
    //   });
    return r;
  };

  // if (loading) return <Loader />;

  return (
    <Wrapper>
      <span>
        {reactions && <ReactionList reactions={reactions} />}
        <span className="emoji-pick" onClick={() => togglePicker(!picker)}>
          <SmilePlusIcon />
        </span>
        {picker && (
          <Picker
            theme={theme.background === "#15202b" ? "dark" : "light"}
            onSelect={(pickedEmoji) => {
              handleReaction({
                emojiId: pickedEmoji.id,
                skin: pickedEmoji.skin,
              });
              togglePicker(!picker);
            }}
          />
        )}
      </span>
    </Wrapper>
  );
};
