import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tokens } from '../data/tokens';
import { getDiscussions, createDiscussion, addComment } from '../services/discussion';
import { MessageSquarePlus, MessageCircle, ArrowLeft } from 'lucide-react';

export const DiscussionPage = () => {
  const { tokenId } = useParams();
  const token = tokens.find(t => t.id.toLowerCase() === tokenId?.toLowerCase());
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');
  const [selectedDiscussion, setSelectedDiscussion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tokenId) {
      loadDiscussions();
    }
  }, [tokenId]);

  const loadDiscussions = async () => {
    if (!tokenId) return;
    setIsLoading(true);
    try {
      const data = await getDiscussions(tokenId);
      setDiscussions(data);
    } catch (err) {
      setError('Failed to load discussions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenId || !newDiscussion.title || !newDiscussion.content) return;

    try {
      await createDiscussion(tokenId, newDiscussion.title, newDiscussion.content);
      setNewDiscussion({ title: '', content: '' });
      await loadDiscussions();
    } catch (err) {
      setError('Failed to create discussion');
    }
  };

  const handleAddComment = async (discussionId: string) => {
    if (!newComment) return;

    try {
      await addComment(discussionId, newComment);
      setNewComment('');
      await loadDiscussions();
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#09131b] text-[#cfd0d1] p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#00ffee] mb-4">Token Not Found</h1>
          <Link to="/" className="text-[#00ffee] hover:text-[#37fffc]">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09131b] text-[#cfd0d1] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link 
            to={`/${tokenId}`}
            className="flex items-center text-[#00ffee] hover:text-[#37fffc] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {token.name}
          </Link>
          <h1 className="text-3xl font-bold text-[#00ffee]">{token.name} Discussions</h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Create New Discussion */}
        <div className="bg-black/30 border border-[rgba(0,255,238,0.2)] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-[#00ffee] mb-4 flex items-center">
            <MessageSquarePlus className="w-5 h-5 mr-2" />
            Start a New Discussion
          </h2>
          <form onSubmit={handleCreateDiscussion} className="space-y-4">
            <input
              type="text"
              placeholder="Discussion Title"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-black/20 border border-[rgba(0,255,238,0.2)] rounded p-2 text-[#cfd0d1] focus:border-[#00ffee] transition-colors"
            />
            <textarea
              placeholder="Discussion Content"
              value={newDiscussion.content}
              onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-black/20 border border-[rgba(0,255,238,0.2)] rounded p-2 text-[#cfd0d1] focus:border-[#00ffee] transition-colors h-32"
            />
            <button
              type="submit"
              className="bg-[#00ffee] text-black px-6 py-2 rounded hover:bg-[#37fffc] transition-colors"
            >
              Create Discussion
            </button>
          </form>
        </div>

        {/* Discussions List */}
        {isLoading ? (
          <div className="text-center py-8">Loading discussions...</div>
        ) : discussions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No discussions yet. Be the first to start one!
          </div>
        ) : (
          <div className="space-y-6">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-black/30 border border-[rgba(0,255,238,0.2)] rounded-lg p-6"
              >
                <h3 className="text-xl font-bold text-[#00ffee] mb-2">{discussion.title}</h3>
                <p className="text-gray-300 mb-4">{discussion.content}</p>
                <div className="text-sm text-gray-400 mb-4">
                  Posted {new Date(discussion.created_at).toLocaleDateString()}
                </div>

                {/* Comments */}
                <div className="ml-8 space-y-4">
                  {discussion.comments?.map((comment: any) => (
                    <div
                      key={comment.id}
                      className="bg-black/20 border border-[rgba(0,255,238,0.1)] rounded p-4"
                    >
                      <p className="text-gray-300">{comment.content}</p>
                      <div className="text-sm text-gray-400 mt-2">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-4">
                  {selectedDiscussion === discussion.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 bg-black/20 border border-[rgba(0,255,238,0.2)] rounded p-2 text-[#cfd0d1]"
                      />
                      <button
                        onClick={() => handleAddComment(discussion.id)}
                        className="bg-[#00ffee] text-black px-4 py-2 rounded hover:bg-[#37fffc] transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedDiscussion(discussion.id)}
                      className="flex items-center text-[#00ffee] hover:text-[#37fffc] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Add Comment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};