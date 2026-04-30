'use client';
import { useState } from 'react';
import Link from 'next/link';
import Pill from '@/components/ui/Pill';

interface Post {
  id: string; text: string; url: string | null; source: string;
  engagement_json: Record<string, unknown>; created_at: string; author: string | null;
}
interface Cluster {
  id: string; label: string; category: string; industry: string;
  problem_type: string; post_count: number;
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function PostCard({ post, isTop }: { post: Post; isTop: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const eng        = post.engagement_json as { score?: number; num_comments?: number; subreddit?: string };
  const truncLen   = 150;
  const needsTrunc = post.text.length > truncLen;
  const displayText = expanded ? post.text : post.text.slice(0, truncLen);

  return (
    <div className={`bg-surface border border-border rounded-md mb-1.5 md:mb-2 overflow-hidden ${isTop ? 'border-l-[3px] border-l-accent' : ''}`}>
      <div className="px-3 py-3 md:px-4 md:py-3.5">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {post.source === 'hackernews' ? (
            <span className="font-mono text-[10px] text-[#FF6600] bg-[#1A0E00] px-1.5 py-[1px] rounded-[2px] border border-[#FF660033]">
              HN
            </span>
          ) : eng.subreddit ? (
            <span className="font-mono text-[10px] text-accent bg-accent-muted px-1.5 py-[1px] rounded-[2px]">
              r/{eng.subreddit}
            </span>
          ) : null}
          <span className="font-mono text-[10px] text-muted">
            ↑ {(eng.score ?? 0).toLocaleString()} · {eng.num_comments ?? 0} comments · {timeAgo(post.created_at)}
          </span>
        </div>

        {/* Text — truncated on mobile, full on desktop */}
        <p className="text-[13px] text-[#FAFAFA] m-0 leading-relaxed">
          <span className="md:hidden">
            {displayText}{needsTrunc && !expanded ? '…' : ''}
          </span>
          <span className="hidden md:inline">{post.text}</span>
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center mt-2">
          {needsTrunc && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="md:hidden bg-transparent border-none text-muted font-mono text-[10px] cursor-pointer p-0 tracking-[0.04em] hover:text-[#FAFAFA] transition-colors"
            >
              {expanded ? 'SHOW LESS' : 'SHOW MORE'}
            </button>
          )}
          {post.url && (
            <a href={post.url} target="_blank" rel="noreferrer" className="text-[10px] text-accent font-mono no-underline ml-auto tracking-[0.04em]">
              VIEW POST ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClusterClient({ cluster, posts }: { cluster: Cluster; posts: Post[] }) {
  const totalScore    = posts.reduce((s, p) => s + ((p.engagement_json as { score?: number }).score ?? 0), 0);
  const totalComments = posts.reduce((s, p) => s + ((p.engagement_json as { num_comments?: number }).num_comments ?? 0), 0);

  return (
    <div className="bg-bg min-h-screen font-sans">
      <div className="px-4 py-4 md:px-8 md:py-8 md:max-w-[860px]">
        {/* Back */}
        <Link href="/today" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted no-underline mb-5 tracking-[0.06em] hover:text-[#FAFAFA] transition-colors">
          ← TODAY'S IDEAS
        </Link>

        {/* Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex gap-1.5 mb-2 flex-wrap">
            {[cluster.category, cluster.industry, cluster.problem_type].filter(Boolean).map(tag => (
              <Pill key={tag} color="muted">{tag}</Pill>
            ))}
          </div>
          <h1 className="font-mono text-[15px] md:text-[18px] font-bold text-[#FAFAFA] m-0 mb-1 tracking-[0.03em]">
            {cluster.label}
          </h1>
          <p className="text-[12px] text-muted m-0 font-mono">
            {cluster.post_count} complaint posts · sorted by upvotes
          </p>
        </div>

        {/* Mobile engagement summary bar */}
        <div className="flex md:hidden border border-border rounded-md mb-3 overflow-hidden bg-surface">
          {[
            { label: 'Total ↑', value: totalScore.toLocaleString() },
            { label: 'Comments', value: totalComments.toLocaleString() },
            { label: 'Posts',    value: String(cluster.post_count) },
          ].map((s, i) => (
            <div key={s.label} className={`flex-1 py-2 text-center ${i < 2 ? 'border-r border-border' : ''}`}>
              <div className="font-mono text-[14px] font-bold text-[#FAFAFA]">{s.value}</div>
              <div className="font-mono text-[8px] text-muted uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Posts */}
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} isTop={i === 0} />
        ))}
      </div>
    </div>
  );
}
