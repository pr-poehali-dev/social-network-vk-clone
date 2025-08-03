import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  hasImage?: boolean;
}

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: number) => void;
}

export default function PostCard({ post, isLiked, onLike }: PostCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
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
              <Button 
                variant="ghost" 
                size="sm" 
                className={`transition-all duration-300 ${
                  isLiked
                    ? 'text-red-500 scale-110'
                    : 'text-muted-foreground hover:text-red-500 hover:scale-105'
                }`}
                onClick={() => onLike(post.id)}
              >
                <Icon 
                  name="Heart" 
                  size={16} 
                  className={`mr-1 ${isLiked ? 'animate-pulse' : ''}`}
                  style={{ fill: isLiked ? 'currentColor' : 'none' }}
                />
                {post.likes + (isLiked ? 1 : 0)}
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-200">
                    <Icon name="MessageCircle" size={16} className="mr-1" />
                    {post.comments}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Комментарии к посту</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                      <Avatar>
                        <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                        </div>
                        <p className="leading-relaxed">{post.content}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>И</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm"><span className="font-medium">Иван Петров:</span> Отличный пост! Полностью согласен с вашим мнением.</p>
                          <span className="text-xs text-muted-foreground">1 час назад</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>М</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm"><span className="font-medium">Мария Козлова:</span> Спасибо за полезную информацию!</p>
                          <span className="text-xs text-muted-foreground">30 минут назад</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4 border-t">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
                        <AvatarFallback>ВЫ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex gap-2">
                        <Input placeholder="Написать комментарий..." className="flex-1" />
                        <Button size="sm">Отправить</Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:scale-105 transition-all duration-200">
                <Icon name="Share2" size={16} className="mr-1" />
                {post.shares}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}