import { useState } from 'react';
import Header from '@/components/Header';
import PrivacyPanel from '@/components/PrivacyPanel';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import ProfileTab from '@/components/ProfileTab';
import MessagesTab from '@/components/MessagesTab';
import RightSidebar from '@/components/RightSidebar';

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    messagesFromFriends: true,
    antiSpam: true,
    dataProtection: true
  });

  const posts = [
    {
      id: 1,
      author: 'Анна Смирнова',
      content: 'Сегодня отличный день для новых знакомств! 🌟 Присоединяйтесь к нашему сообществу фотографов.',
      timestamp: '2 часа назад',
      likes: 24,
      comments: 8,
      shares: 3,
      hasImage: true
    },
    {
      id: 2,
      author: 'Максим Петров',
      content: 'Запустил новый проект по изучению искусственного интеллекта. Кто хочет присоединиться к исследованиям?',
      timestamp: '4 часа назад',
      likes: 18,
      comments: 12,
      shares: 7
    },
    {
      id: 3,
      author: 'Елена Кузнецова',
      content: 'Важно помнить о безопасности в интернете! Проверьте свои настройки приватности.',
      timestamp: '6 часов назад',
      likes: 45,
      comments: 23,
      shares: 15
    }
  ];

  const friends = [
    { name: 'Дмитрий', status: 'online' as const },
    { name: 'Ольга', status: 'offline' as const },
    { name: 'Сергей', status: 'online' as const },
    { name: 'Мария', status: 'away' as const }
  ];

  const communities = [
    { name: 'Фотографы России', members: '12.5K', category: 'Искусство' },
    { name: 'IT Специалисты', members: '8.2K', category: 'Технологии' },
    { name: 'Путешественники', members: '15.7K', category: 'Путешествия' }
  ];

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <PrivacyPanel 
            privacySettings={privacySettings}
            setPrivacySettings={setPrivacySettings}
          />

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Feed Tab */}
            {activeTab === 'feed' && (
              <>
                <CreatePost
                  newPost={newPost}
                  setNewPost={setNewPost}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                />

                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      isLiked={likedPosts.has(post.id)}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && <ProfileTab />}

            {/* Messages Tab */}
            {activeTab === 'messages' && <MessagesTab friends={friends} />}
          </div>

          <RightSidebar friends={friends} communities={communities} />
        </div>
      </div>
    </div>
  );
}