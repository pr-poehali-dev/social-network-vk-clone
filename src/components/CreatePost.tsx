import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CreatePostProps {
  newPost: string;
  setNewPost: (value: string) => void;
  selectedImage: string | null;
  setSelectedImage: (value: string | null) => void;
}

export default function CreatePost({ 
  newPost, 
  setNewPost, 
  selectedImage, 
  setSelectedImage 
}: CreatePostProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
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
            {selectedImage && (
              <div className="relative">
                <img src={selectedImage} alt="Preview" className="max-h-40 rounded-lg object-cover w-full" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => setSelectedImage(e.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <Button>Опубликовать</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}