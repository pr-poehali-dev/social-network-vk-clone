import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/context/ThemeContext';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavButton = ({ 
  id, 
  label, 
  icon, 
  activeTab, 
  onClick 
}: { 
  id: string; 
  label: string; 
  icon: string;
  activeTab: string;
  onClick: (id: string) => void;
}) => (
  <Button
    variant={activeTab === id ? "default" : "ghost"}
    className={`flex items-center gap-2 transition-all duration-200 ${
      activeTab === id 
        ? 'bg-primary text-primary-foreground shadow-lg' 
        : 'hover:bg-muted hover:scale-105'
    }`}
    onClick={() => onClick(id)}
  >
    <Icon name={icon} size={20} />
    {label}
  </Button>
);

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ViberaNet
            </h1>
            <Badge variant="secondary" className="animate-pulse">
              Живое общение
            </Badge>
          </div>
          
          <nav className="flex items-center gap-2">
            <NavButton id="feed" label="Лента" icon="Home" activeTab={activeTab} onClick={setActiveTab} />
            <NavButton id="profile" label="Профиль" icon="User" activeTab={activeTab} onClick={setActiveTab} />
            <NavButton id="friends" label="Друзья" icon="Users" activeTab={activeTab} onClick={setActiveTab} />
            <NavButton id="messages" label="Сообщения" icon="MessageCircle" activeTab={activeTab} onClick={setActiveTab} />
            <NavButton id="communities" label="Группы" icon="Users2" activeTab={activeTab} onClick={setActiveTab} />
            <NavButton id="media" label="Медиа" icon="Image" activeTab={activeTab} onClick={setActiveTab} />
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={16} />
            </Button>
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
  );
}