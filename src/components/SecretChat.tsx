import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface SecretMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  isEncrypted: boolean;
}

interface SecretChatProps {
  friendName: string;
}

export default function SecretChat({ friendName }: SecretChatProps) {
  const [messages, setMessages] = useState<SecretMessage[]>([
    {
      id: '1',
      text: 'Привет! Это зашифрованный чат 🔐',
      sender: 'other',
      timestamp: '14:30',
      isEncrypted: true
    },
    {
      id: '2', 
      text: 'Отлично! Теперь наша переписка защищена',
      sender: 'me',
      timestamp: '14:32',
      isEncrypted: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isEncryptionEnabled, setIsEncryptionEnabled] = useState(true);
  const [keyExchangeComplete, setKeyExchangeComplete] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: SecretMessage = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString('ru-RU', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        isEncrypted: isEncryptionEnabled
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const simulateKeyExchange = () => {
    setKeyExchangeComplete(false);
    setTimeout(() => {
      setKeyExchangeComplete(true);
      setIsEncryptionEnabled(true);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
          <Icon name="Lock" size={16} className="mr-1" />
          Секретный чат
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Lock" size={20} className="text-purple-500" />
              Секретный чат с {friendName}
            </div>
            <div className="flex items-center gap-2">
              {keyExchangeComplete ? (
                <>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Icon name="Shield" size={12} className="mr-1" />
                    Защищено
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    End-to-End
                  </Badge>
                </>
              ) : (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 animate-pulse">
                  <Icon name="Key" size={12} className="mr-1" />
                  Синхронизация...
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Security Notice */}
        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-lg p-3 flex-shrink-0">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={16} className="text-purple-600 mt-0.5" />
            <div className="text-sm text-purple-800 dark:text-purple-200">
              <p className="font-medium mb-1">Безопасное общение:</p>
              <p>Сообщения зашифрованы и недоступны третьим лицам. Чат автоматически удаляется при закрытии.</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 w-full" ref={scrollAreaRef}>
          <div className="space-y-3 p-2">
            {/* System Message */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs">
                <Icon name="Shield" size={12} />
                Секретный чат активирован
              </div>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-[70%] ${
                  message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {message.sender === 'me' ? 'Я' : friendName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`relative px-3 py-2 rounded-lg ${
                    message.sender === 'me'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    <div className="flex items-center gap-1 mb-1">
                      {message.isEncrypted && (
                        <Icon name="Lock" size={10} className="opacity-70" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="flex-shrink-0" />

        {/* Input Area */}
        <div className="space-y-3 flex-shrink-0">
          {/* Encryption Controls */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEncryptionEnabled(!isEncryptionEnabled)}
                className={isEncryptionEnabled ? 'text-green-600' : 'text-gray-500'}
              >
                <Icon name={isEncryptionEnabled ? 'Lock' : 'Unlock'} size={14} className="mr-1" />
                {isEncryptionEnabled ? 'Шифрование ВКЛ' : 'Шифрование ВЫКЛ'}
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" onClick={simulateKeyExchange}>
              <Icon name="RotateCw" size={14} className="mr-1" />
              Обновить ключи
            </Button>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Введите секретное сообщение..."
              className="flex-1"
              disabled={!keyExchangeComplete}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || !keyExchangeComplete}>
              <Icon name="Send" size={16} />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Timer" size={14} className="mr-1" />
              Исчезающие сообщения
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Image" size={14} className="mr-1" />
              Зашифрованное фото
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="FileText" size={14} className="mr-1" />
              Безопасная заметка
            </Button>
          </div>
        </div>

        {/* Warning Footer */}
        <div className="text-xs text-muted-foreground text-center flex-shrink-0 pt-2 border-t">
          <div className="flex items-center justify-center gap-1">
            <Icon name="AlertTriangle" size={12} />
            Чат будет автоматически удален при закрытии окна
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}