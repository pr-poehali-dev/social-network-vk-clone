import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeTab, setActiveTab] = useState('feed');
  const [newPost, setNewPost] = useState('');
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
    { name: 'Дмитрий', status: 'online' },
    { name: 'Ольга', status: 'offline' },
    { name: 'Сергей', status: 'online' },
    { name: 'Мария', status: 'away' }
  ];

  const communities = [
    { name: 'Фотографы России', members: '12.5K', category: 'Искусство' },
    { name: 'IT Специалисты', members: '8.2K', category: 'Технологии' },
    { name: 'Путешественники', members: '15.7K', category: 'Путешествия' }
  ];

  const NavButton = ({ id, label, icon }: { id: string; label: string; icon: string }) => (
    <Button
      variant={activeTab === id ? "default" : "ghost"}
      className={`flex items-center gap-2 transition-all duration-200 ${
        activeTab === id 
          ? 'bg-primary text-primary-foreground shadow-lg' 
          : 'hover:bg-muted hover:scale-105'
      }`}
      onClick={() => setActiveTab(id)}
    >
      <Icon name={icon} size={20} />
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SocialNet
              </h1>
              <Badge variant="secondary" className="animate-pulse">
                Безопасная сеть
              </Badge>
            </div>
            
            <nav className="flex items-center gap-2">
              <NavButton id="feed" label="Лента" icon="Home" />
              <NavButton id="profile" label="Профиль" icon="User" />
              <NavButton id="friends" label="Друзья" icon="Users" />
              <NavButton id="messages" label="Сообщения" icon="MessageCircle" />
              <NavButton id="communities" label="Группы" icon="Users2" />
              <NavButton id="media" label="Медиа" icon="Image" />
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
                <AvatarFallback>ВЫ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Privacy & Security */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-accent" />
                <h3 className="font-semibold">Приватность и Безопасность</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Профиль виден всем</span>
                  <Switch 
                    checked={privacySettings.profileVisible}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, profileVisible: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Сообщения от друзей</span>
                  <Switch 
                    checked={privacySettings.messagesFromFriends}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, messagesFromFriends: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Защита от спама</span>
                  <Switch 
                    checked={privacySettings.antiSpam}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, antiSpam: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Защита данных</span>
                  <Switch 
                    checked={privacySettings.dataProtection}
                    onCheckedChange={(checked) => 
                      setPrivacySettings(prev => ({ ...prev, dataProtection: checked }))}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Статистика активности</h4>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <div className="text-lg font-bold text-primary">152</div>
                    <div className="text-xs text-muted-foreground">Друзей</div>
                  </div>
                  <div className="p-2 bg-secondary/10 rounded-lg">
                    <div className="text-lg font-bold text-secondary">27</div>
                    <div className="text-xs text-muted-foreground">Групп</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Create Post */}
            {activeTab === 'feed' && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
                      <AvatarFallback>ВЫ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Что у вас нового?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Icon name="Image" size={16} className="mr-1" />
                            Фото
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Video" size={16} className="mr-1" />
                            Видео
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Music" size={16} className="mr-1" />
                            Аудио
                          </Button>
                        </div>
                        <Button>Опубликовать</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts Feed */}
            {activeTab === 'feed' && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="pt-6">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                          </div>
                          <p className="mb-4 leading-relaxed">{post.content}</p>
                          {post.hasImage && (
                            <div className="mb-4 rounded-lg overflow-hidden bg-muted/50 h-48 flex items-center justify-center">
                              <Icon name="Image" size={48} className="text-muted-foreground" />
                            </div>
                          )}
                          <div className="flex items-center gap-6">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Icon name="Heart" size={16} className="mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Icon name="MessageCircle" size={16} className="mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                              <Icon name="Share2" size={16} className="mr-1" />
                              {post.shares}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
                      <AvatarFallback className="text-2xl">ВЫ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">Ваш Профиль</h2>
                      <p className="text-muted-foreground">Активный пользователь социальной сети</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">152</div>
                        <div className="text-sm text-muted-foreground">Друзей</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">89</div>
                        <div className="text-sm text-muted-foreground">Постов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">27</div>
                        <div className="text-sm text-muted-foreground">Групп</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} />
                    Личные сообщения
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {friends.slice(0, 2).map((friend, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <Avatar>
                          <AvatarFallback>{friend.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{friend.name}</span>
                            <div className={`w-2 h-2 rounded-full ${
                              friend.status === 'online' ? 'bg-green-500' : 
                              friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {index === 0 ? 'Привет! Как дела?' : 'Увидимся завтра!'}
                          </p>
                        </div>
                        <Badge variant="secondary">2</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Users" size={20} />
                Друзья онлайн
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {friends.map((friend, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm flex-1">{friend.name}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      friend.status === 'online' ? 'bg-green-500' : 
                      friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                  </div>
                ))}
              </div>
            </CardContent>
            
            <Separator />
            
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Icon name="Users2" size={20} />
                Популярные группы
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communities.map((community, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{community.name}</span>
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" size={12} />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{community.members} участников</span>
                      <Badge variant="secondary" className="text-xs">{community.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}