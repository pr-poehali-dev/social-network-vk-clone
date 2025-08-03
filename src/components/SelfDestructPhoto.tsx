import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SelfDestructPhotoProps {
  onSendPhoto: (photo: string, timer: number) => void;
}

export default function SelfDestructPhoto({ onSendPhoto }: SelfDestructPhotoProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(10);
  const [isViewing, setIsViewing] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [isDestroyed, setIsDestroyed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const timerOptions = [
    { value: 5, label: '5 секунд' },
    { value: 10, label: '10 секунд' },
    { value: 30, label: '30 секунд' },
    { value: 60, label: '1 минута' },
    { value: 300, label: '5 минут' }
  ];

  useEffect(() => {
    if (isViewing && countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsDestroyed(true);
            setIsViewing(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isViewing, countdown]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedPhoto(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSendPhoto = () => {
    if (selectedPhoto) {
      onSendPhoto(selectedPhoto, timerSeconds);
      setSelectedPhoto(null);
      setTimerSeconds(10);
    }
  };

  const handleViewPhoto = () => {
    setIsViewing(true);
    setCountdown(timerSeconds);
    setIsDestroyed(false);
  };

  const resetPhoto = () => {
    setSelectedPhoto(null);
    setIsViewing(false);
    setCountdown(0);
    setIsDestroyed(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
          <Icon name="Timer" size={16} className="mr-1" />
          Фото с таймером
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Timer" size={20} className="text-orange-500" />
            Отправить фото с таймером самоуничтожения
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedPhoto ? (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Icon name="Upload" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Выберите фото для отправки</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Фото будет автоматически удалено после просмотра
              </p>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Icon name="Image" size={16} className="mr-2" />
                Выбрать фото
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoSelect}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Photo Preview */}
              <div className="relative">
                {!isDestroyed ? (
                  <div className="relative">
                    <img 
                      src={selectedPhoto} 
                      alt="Preview" 
                      className={`w-full max-h-96 object-cover rounded-lg ${
                        isViewing ? '' : 'blur-sm'
                      }`}
                    />
                    {!isViewing && (
                      <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                        <Button onClick={handleViewPhoto} size="lg">
                          <Icon name="Eye" size={20} className="mr-2" />
                          Просмотреть фото
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-96 bg-muted rounded-lg flex flex-col items-center justify-center">
                    <Icon name="X" size={64} className="text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-red-600 mb-2">Фото уничтожено</h3>
                    <p className="text-muted-foreground">Время просмотра истекло</p>
                  </div>
                )}

                {/* Countdown Timer */}
                {isViewing && countdown > 0 && (
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="Timer" size={16} />
                      <span className="font-mono text-lg">
                        {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <Progress 
                      value={(countdown / timerSeconds) * 100} 
                      className="w-20 h-1 mt-1"
                    />
                  </div>
                )}
              </div>

              {/* Timer Settings */}
              {!isViewing && !isDestroyed && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium">Время до уничтожения:</label>
                    <Select value={timerSeconds.toString()} onValueChange={(value) => setTimerSeconds(parseInt(value))}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timerOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Icon name="AlertTriangle" size={16} className="text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800 dark:text-yellow-200">
                        <p className="font-medium mb-1">Безопасность:</p>
                        <p>Фото будет безвозвратно удалено после истечения времени. Получатель не сможет сохранить изображение.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                {!isViewing && !isDestroyed && (
                  <>
                    <Button onClick={handleSendPhoto} className="flex-1">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить с таймером
                      <Badge variant="secondary" className="ml-2">
                        {timerOptions.find(opt => opt.value === timerSeconds)?.label}
                      </Badge>
                    </Button>
                    <Button variant="outline" onClick={resetPhoto}>
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Сбросить
                    </Button>
                  </>
                )}
                {isDestroyed && (
                  <Button onClick={resetPhoto} className="flex-1">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Выбрать новое фото
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}