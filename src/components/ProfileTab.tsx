import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfileTab() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src="/img/ba58ae71-0a10-4506-9c6b-ef601bef01c5.jpg" />
            <AvatarFallback className="text-2xl">ВЫ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Ваш Профиль</h2>
            <p className="text-muted-foreground">Активный пользователь ViberaNet</p>
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
  );
}