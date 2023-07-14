/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export interface PostProps {
  post: PostType
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(["Post Muito bom, parabéns!"]);
  const [newComment, setNewComment] = useState("");

  const publishedDateFormatted: string = format(
    post.publishedAt,
    "d 'de' LLLL 'ás' HH:mm'h'",
  );
  
  const publishedDateRelativeToNow: string = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(ev: FormEvent) {
    ev.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  }

  function handleNewCommentChange(ev: ChangeEvent<HTMLTextAreaElement>) {
    ev.target.setCustomValidity("");
    setNewComment(ev.target.value);
  }

  function deleteComment(comment: string) {
    //criar uma nova lista de cometários
    const commentsWithoutDeletedOne = comments.filter((c) => c !== comment);
    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(ev: InvalidEvent<HTMLTextAreaElement>) {
    return ev.target.setCustomValidity("Esse campo é obrigatório");
  }

  const isNewCommentEmpty = newComment.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}> {line.content} </p>;
          } else {
            return (
              <a key={line.content} href="#">
                {" "}
                {line.content}{" "}
              </a>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feddback</strong>

        <textarea
          name="comment"
          required
          onInvalid={handleNewCommentInvalid}
          onChange={handleNewCommentChange}
          value={newComment}
          placeholder="Dexe um comentário"
        ></textarea>
        <footer>
          <button disabled={isNewCommentEmpty} type="submit">
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
