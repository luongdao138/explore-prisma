import { PostComment } from '../services/posts';

export interface NestedComment extends PostComment {
  children: PostComment[];
}

const buildComment = (
  comment: PostComment,
  comments: PostComment[]
): NestedComment => {
  let returnedComment: NestedComment = { ...comment, children: [] };
  comments.forEach((c) => {
    if (comment.id === c.parentId) {
      returnedComment.children.push(buildComment(c, comments));
    }
  });

  // sort the comments
  returnedComment.children.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return returnedComment;
};

export default function convertComments(
  comments: PostComment[]
): NestedComment[] {
  return comments.reduce((acc, currentComment) => {
    if (!currentComment.parentId) {
      return [...acc, buildComment(currentComment, comments)];
    } else {
      return acc;
    }
  }, [] as NestedComment[]);
}
