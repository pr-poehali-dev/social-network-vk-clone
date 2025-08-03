import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface BlockedUser {
  id: string;
  name: string;
  reason: string;
  blockedDate: string;
}

export default function BlockUserDialog() {
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
    { id: '1', name: 'Спамер123', reason: 'Отправлял спам сообщения', blockedDate: '2 дня назад' },
    { id: '2', name: 'Токсик_Пользователь', reason: 'Нарушение правил общения', blockedDate: '1 неделю назад' }
  ]);
  const [newBlockReason, setNewBlockReason] = useState('');
  const [isBlocking, setIsBlocking] = useState(false);

  const handleBlockUser = () => {
    if (newBlockReason.trim()) {
      const newUser: BlockedUser = {
        id: Date.now().toString(),
        name: 'Новый_Пользователь',
        reason: newBlockReason.trim(),
        blockedDate: 'только что'
      };
      setBlockedUsers(prev => [newUser, ...prev]);
      setNewBlockReason('');
      setIsBlocking(false);
    }
  };

  const handleUnblockUser = (userId: string) => {
    setBlockedUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Icon name="Shield" size={16} className="mr-1" />
          Блокировка
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} className="text-red-500" />
            Управление блокировками
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Block New User Section */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="UserX" size={16} />
              Заблокировать пользователя
            </h3>
            
            {!isBlocking ? (
              <Button onClick={() => setIsBlocking(true)} className="w-full">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить в черный список
              </Button>
            ) : (
              <div className="space-y-3">
                <Textarea
                  placeholder="Укажите причину блокировки..."
                  value={newBlockReason}
                  onChange={(e) => setNewBlockReason(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button onClick={handleBlockUser} className="flex-1">
                    <Icon name="Shield" size={16} className="mr-2" />
                    Заблокировать
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsBlocking(false);
                    setNewBlockReason('');
                  }}>
                    Отмена
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Blocked Users List */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Users" size={16} />
              Заблокированные пользователи ({blockedUsers.length})
            </h3>
            
            {blockedUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="UserCheck" size={48} className="mx-auto mb-3 opacity-50" />
                <p>Нет заблокированных пользователей</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {blockedUsers.map((user) => (
                  <div key={user.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-red-100 text-red-600">
                        {user.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{user.name}</span>
                        <Badge variant="destructive" className="text-xs">
                          Заблокирован
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {user.reason}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {user.blockedDate}
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnblockUser(user.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Icon name="UserCheck" size={14} className="mr-1" />
                      Разблокировать
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
              <Icon name="Info" size={16} />
              Советы по безопасности
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Блокируйте пользователей, которые нарушают правила общения</li>
              <li>• Заблокированные пользователи не смогут писать вам сообщения</li>
              <li>• Вы можете разблокировать пользователя в любое время</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}