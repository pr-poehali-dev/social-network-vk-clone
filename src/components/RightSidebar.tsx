import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Friend {
  name: string;
  status: 'online' | 'offline' | 'away';
}

interface Community {
  name: string;
  members: string;
  category: string;
}

interface RightSidebarProps {
  friends: Friend[];
  communities: Community[];
}

export default function RightSidebar({ friends, communities }: RightSidebarProps) {
  return (
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
            <div key={index} className="flex items-center gap-2 hover:bg-muted/50 p-2 rounded-lg transition-all duration-200 cursor-pointer">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs">{friend.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm flex-1">{friend.name}</span>
              <div className={`w-2 h-2 rounded-full ${
                friend.status === 'online' ? 'bg-green-500 animate-pulse' : 
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
            <div key={index} className="space-y-2 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{community.name}</span>
                <Button variant="outline" size="sm" className="hover:scale-110 transition-transform duration-200">
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
  );
}