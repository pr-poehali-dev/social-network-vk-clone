import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Friend {
  name: string;
  status: 'online' | 'offline' | 'away';
}

interface MessagesTabProps {
  friends: Friend[];
}

export default function MessagesTab({ friends }: MessagesTabProps) {
  return (
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
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:scale-[1.02]">
              <Avatar>
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{friend.name}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    friend.status === 'online' ? 'bg-green-500 animate-pulse' : 
                    friend.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {index === 0 ? 'Привет! Как дела?' : 'Увидимся завтра!'}
                </p>
              </div>
              <Badge variant="secondary" className="animate-bounce">2</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}