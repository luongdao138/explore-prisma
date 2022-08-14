import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../../components/Comment';
import convertComments from '../../helpers/convertComments';
import {
  createComment,
  getPostDetail,
  PostComment,
  PostDetail,
} from '../../services/posts';
import './style.css';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getPostDetail(id || '').then((data) => {
      setPost(data.data);
    });
  }, [id]);

  const postComments = convertComments(post?.comments || []);

  const replyCommentSuccess = (newComment: PostComment) => {
    if (post) {
      setPost({ ...post, comments: post?.comments.concat(newComment) });
    }
  };

  const handleCreateComment = async () => {
    if (post) {
      const res = await createComment({
        message: message.trim(),
        parentId: null,
        postId: post.id,
      });

      setMessage('');
      replyCommentSuccess(res.data);
    }
  };

  if (!post) return null;
  return (
    <div style={{ padding: '1rem' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div>
        <div
          className='comment__reply-box'
          style={{ padding: 0, margin: 0, marginTop: '1rem', border: 'none' }}
        >
          <div className='comment__reply-box__content'>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='What are your thoughts?'
            />
            <div className='comment__reply-box__actions'>
              <button className='cancel-reply__btn'>Cancel</button>
              <button
                className='reply__btn'
                disabled={!message.trim()}
                onClick={handleCreateComment}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='comment-container'>
        {postComments.map((item) => (
          <Comment
            key={item.id}
            comment={item}
            postId={post.id}
            replyCommentSuccess={replyCommentSuccess}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetailPage;
