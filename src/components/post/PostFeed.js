import { Avatar, Button, Card, Flex, Typography } from "antd";
import axios from "axios";
import "antd/dist/reset.css";
import "./post.css";
import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";

const PostFeed = () => {
  const [post, setpost] = useState({});
  const [showComments, setShowComments] = useState(true);

  const getPost = () => {
    axios
      .get("https://34272160e57042bc86965ae9b1d45a7f.api.mockbin.io/")
      .then(({ data }) => {
        setpost(data);
      });
  };
  
  useEffect(() => {
    getPost();
  }, []);

  const handleShowComments = () => setShowComments((prevState) => !prevState);
  return (
    <div className="post-card">
      <Card className="card-wrapper">
        <Flex justify="space-between" className="post-header">
          <Flex className="image-wrapper">
            <img
              src={post?.user?.profile_picture}
              alt={post?.user?.name}
              width={40}
            />
            <div>
              <Typography className="user-name">{post?.user?.name} </Typography>
              <Typography className="post-date">{post?.date} </Typography>
            </div>
          </Flex>
          <img src="assets/imgs/dots-vertical.png" alt="settings" />
        </Flex>
        <div className="post-content">
          <Typography>{post?.content}</Typography>
          <img alt="post-img" src={post?.image} />
        </div>
        <div className="social-numbers">
          <div>
            <img width={24} src="/assets/imgs/like.png" alt="likes" />
            {post?.likes_count}
          </div>
          <div>
            <button onClick={handleShowComments} className="display-comments">
              <Typography>{`${post?.comments_count} comments`}</Typography>
            </button>
            <Typography>{`${post?.shares_count} shares`}</Typography>
          </div>
        </div>
        <div className="like-share">
          <Button>
            {" "}
            <Avatar size={16} src="/assets/imgs/likes.png" />
            Like
          </Button>
          <Button icon={<Avatar size={16} src="/assets/imgs/share.png" />}>
            Share
          </Button>
        </div>
        <div className="add-comment">
          <Avatar src={"assets/imgs/user.png"} />
          <div className="input-wrapper">
            <input
              type="text"
              className="comment-input"
              placeholder="Write a comment..."
            />
            <img
              className="input-icon"
              src="assets/imgs/arrow.png"
              alt="icon"
            />
          </div>
        </div>
        <div className="comments-list">
          {showComments &&
            post?.comments?.map((comment) => (
              <div key={comment.id} className="comment-wrapper">
                <div className="user-info">
                  <div>
                    <img
                      src={comment.user.profile_picture}
                      alt="profile_picture"
                      width={44}
                      height={44}
                    />
                    <div>
                      <label className="user-name">{comment.user.name}</label>
                      <label className="user-title">{comment.user.title}</label>
                    </div>
                  </div>
                  <div className="setting-part">
                    <label className="comments-date">{comment.date}</label>
                    <button>
                      <img src="assets/imgs/dots-vertical.png" alt="setting" />
                    </button>
                  </div>
                </div>
                <label className="comment-content">{comment.content}</label>
                <div className="comment-action">
                  <button className="like-comment">Like</button>
                  <button>Reply</button>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};

export default PostFeed;
