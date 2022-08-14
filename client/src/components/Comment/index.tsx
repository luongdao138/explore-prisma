import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NestedComment } from '../../helpers/convertComments';
import './style.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import useBoolean from '../../hooks/useBoolean';
import { createComment, PostComment } from '../../services/posts';

interface Props {
  comment: NestedComment;
  postId: string;
  replyCommentSuccess: (newComment: PostComment) => void;
}

const Comment: React.FC<Props> = ({ comment, postId, replyCommentSuccess }) => {
  const {
    value: isReplying,
    setFalse: closeReply,
    toggle: toggleReply,
  } = useBoolean(false);
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState<string>('');

  const handleCreateComment = async () => {
    const res = await createComment({
      message: message.trim(),
      parentId: comment.id,
      postId,
    });

    setMessage('');
    replyCommentSuccess(res.data);
    closeReply();
  };

  useEffect(() => {
    if (isReplying) {
      replyInputRef.current?.focus();
    }
  }, [isReplying]);

  return (
    <div className='comment'>
      <div className='comment__author'>
        <Link
          className='comment__author__avatar'
          to={`/user/${comment.user.id}`}
        >
          <img src={comment.user.avatar} alt={comment.user.name} />
        </Link>
        <Link
          className='comment__author__username'
          to={`/user/${comment.user.id}`}
        >
          {comment.user.name}
        </Link>
        <p className='comment__author__seperate'></p>
        <span className='comment__created-at'>
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>

      <div className='comment__main'>
        <div className='comment__body'>
          <p className='comment__message'>{comment.message}</p>

          <div className='comment__actions'>
            <button className='comment__likes'>
              <AiOutlineHeart />
              <span>20</span>
            </button>

            <button className='comment__action' onClick={toggleReply}>
              <FaRegCommentAlt style={{ fontSize: '16px' }} />
              <span>Reply</span>
            </button>
            <button className='comment__action'>
              <BiEdit />
              <span>Edit</span>
            </button>
            <button className='comment__action'>
              <MdDelete />
              <span>Delete</span>
            </button>
          </div>

          {isReplying && (
            <div className='comment__reply-box'>
              <div className='comment__reply-box__content'>
                <textarea
                  ref={replyInputRef}
                  placeholder='What are your thoughts?'
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <div className='comment__reply-box__actions'>
                  <button className='cancel-reply__btn' onClick={closeReply}>
                    Cancel
                  </button>
                  <button
                    className='reply__btn'
                    onClick={handleCreateComment}
                    disabled={!message.trim()}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='comment__children'>
          {comment.children.map((child) => (
            <Comment
              comment={child}
              postId={postId}
              replyCommentSuccess={replyCommentSuccess}
              key={child.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
