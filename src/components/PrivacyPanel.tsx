import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface PrivacySettings {
  profileVisible: boolean;
  messagesFromFriends: boolean;
  antiSpam: boolean;
  dataProtection: boolean;
}

interface PrivacyPanelProps {
  privacySettings: PrivacySettings;
  setPrivacySettings: React.Dispatch<React.SetStateAction<PrivacySettings>>;
}

export default function PrivacyPanel({ privacySettings, setPrivacySettings }: PrivacyPanelProps) {
  return (
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
  );
}