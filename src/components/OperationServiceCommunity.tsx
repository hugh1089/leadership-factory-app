// 互动社区子模块
import React, { useState } from 'react';

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName?: string;
  content: string;
  createdAt: string;
  comments?: CommunityComment[];
  likes?: number;
  pinned?: boolean;
}

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName?: string;
  content: string;
  createdAt: string;
}

const initialPosts: CommunityPost[] = [
  {
    id: '1',
    authorId: '1',
    authorName: '张三',
    content: '欢迎大家参与领导力社区交流！',
    createdAt: '2025-06-07 09:00',
    likes: 2,
    pinned: true,
    comments: [
      { id: 'c1', postId: '1', authorId: '2', authorName: '李四', content: '支持！', createdAt: '2025-06-07 09:10' }
    ]
  },
  {
    id: '2',
    authorId: '2',
    authorName: '李四',
    content: '请问下期课程时间？',
    createdAt: '2025-06-07 10:00',
    likes: 0,
    pinned: false,
    comments: []
  }
];

const OperationServiceCommunity: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [commenting, setCommenting] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  // 发帖
  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      { id: Date.now().toString(), authorId: '1', authorName: '张三', content: newPost, createdAt: new Date().toLocaleString(), likes: 0, pinned: false, comments: [] },
      ...posts
    ]);
    setNewPost('');
  };
  // 评论
  const handleComment = (postId: string) => {
    if (!newComment.trim()) return;
    setPosts(posts.map(p => p.id === postId ? {
      ...p,
      comments: [...(p.comments || []), { id: Date.now().toString(), postId, authorId: '1', authorName: '张三', content: newComment, createdAt: new Date().toLocaleString() }]
    } : p));
    setCommenting(null);
    setNewComment('');
  };
  // 置顶
  const handlePin = (id: string) => {
    setPosts(posts.map(p => ({ ...p, pinned: p.id === id })));
  };
  // 点赞
  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
  };

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <textarea
          placeholder="发表新话题..."
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          style={{ width: '100%', minHeight: 48 }}
        />
        <button onClick={handlePost} style={{ marginTop: 4 }}>发帖</button>
      </div>
      <div>
        {posts.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.createdAt.localeCompare(a.createdAt)).map(post => (
          <div key={post.id} className="community-post" style={{ border: post.pinned ? '2px solid #1890ff' : '1px solid #e0e6ed', marginBottom: 16, padding: 12, background: post.pinned ? '#f0f6ff' : '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><b>{post.authorName}</b> <span style={{ color: '#888' }}>{post.createdAt}</span></span>
              <span>
                <button onClick={() => handleLike(post.id)}>👍{post.likes || 0}</button>
                <button onClick={() => setCommenting(post.id)}>评论</button>
                <button onClick={() => handlePin(post.id)} disabled={post.pinned}>置顶</button>
              </span>
            </div>
            <div style={{ margin: '8px 0' }}>{post.content}</div>
            <div style={{ fontSize: 13, color: '#888' }}>评论：</div>
            <ul style={{ paddingLeft: 16 }}>
              {(post.comments || []).map(c => (
                <li key={c.id}><b>{c.authorName}</b>：{c.content} <span style={{ color: '#aaa', fontSize: 12 }}>{c.createdAt}</span></li>
              ))}
            </ul>
            {commenting === post.id && (
              <div style={{ marginTop: 8 }}>
                <input
                  placeholder="写评论..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  style={{ width: '80%' }}
                />
                <button onClick={() => handleComment(post.id)}>提交</button>
                <button onClick={() => setCommenting(null)}>取消</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperationServiceCommunity;
