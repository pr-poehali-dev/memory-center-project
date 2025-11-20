import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface MemoryStory {
  id: number;
  name: string;
  photo: string;
  story: string;
  date: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function Index() {
  const { toast } = useToast();
  const [isStoryDialogOpen, setIsStoryDialogOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryStory | null>(null);

  const memoryStories: MemoryStory[] = [
    {
      id: 1,
      name: 'Иванов Петр Михайлович',
      photo: '/placeholder.svg',
      story: 'Ветеран Великой Отечественной войны, участник обороны Москвы. Награжден орденом Красной Звезды за мужество и героизм.',
      date: '1920-2005'
    },
    {
      id: 2,
      name: 'Смирнова Анна Васильевна',
      photo: '/placeholder.svg',
      story: 'Труженица тыла, работала на оборонном заводе. Внесла огромный вклад в победу над фашизмом.',
      date: '1925-2010'
    },
    {
      id: 3,
      name: 'Кузнецов Владимир Иванович',
      photo: '/placeholder.svg',
      story: 'Участник освобождения Европы, дошел до Берлина. Награжден медалью "За отвагу".',
      date: '1922-2008'
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'День Победы',
      date: '9 мая 2025',
      description: 'Торжественное возложение цветов к мемориалу'
    },
    {
      id: 2,
      title: 'День памяти и скорби',
      date: '22 июня 2025',
      description: 'Минута молчания и вечер памяти'
    },
    {
      id: 3,
      title: 'Выставка "Лица войны"',
      date: '15 февраля 2025',
      description: 'Открытие новой виртуальной экспозиции'
    }
  ];

  const handleStorySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "История отправлена",
      description: "Спасибо за ваш вклад в сохранение памяти",
    });
    setIsStoryDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Flame" className="text-primary" size={32} />
            <span className="text-2xl font-serif font-bold text-foreground">Символ Памяти</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#about" className="story-link text-sm text-muted-foreground hover:text-foreground transition-colors">О центре</a>
            <a href="#gallery" className="story-link text-sm text-muted-foreground hover:text-foreground transition-colors">Галерея</a>
            <a href="#events" className="story-link text-sm text-muted-foreground hover:text-foreground transition-colors">Мероприятия</a>
            <a href="#archive" className="story-link text-sm text-muted-foreground hover:text-foreground transition-colors">Архив</a>
            <Button variant="default" size="sm">Поддержать</Button>
          </div>
          <button className="md:hidden">
            <Icon name="Menu" size={24} />
          </button>
        </nav>
      </header>

      <main>
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-foreground leading-tight">
                Храним память.<br />Чтим подвиг.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                АНО "Центр мемориальных проектов "Символ памяти" сохраняет историю героев и передаёт её будущим поколениям
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog open={isStoryDialogOpen} onOpenChange={setIsStoryDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-base">
                      <Icon name="PenLine" className="mr-2" size={20} />
                      Поделиться историей
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Поделитесь историей</DialogTitle>
                      <DialogDescription>
                        Расскажите о вашем герое. Каждая история важна для сохранения памяти.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleStorySubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="story-name">Имя героя</Label>
                        <Input id="story-name" placeholder="Фамилия Имя Отчество" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="story-dates">Годы жизни</Label>
                        <Input id="story-dates" placeholder="1920-2005" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="story-text">История</Label>
                        <Textarea 
                          id="story-text" 
                          placeholder="Расскажите о жизни, подвиге, достижениях..."
                          className="min-h-[150px]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="story-email">Ваш email</Label>
                        <Input id="story-email" type="email" placeholder="your@email.com" required />
                      </div>
                      <Button type="submit" className="w-full">Отправить историю</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="text-base">
                  <Icon name="BookOpen" className="mr-2" size={20} />
                  Исследовать архив
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">О Центре</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <Card className="hover-scale border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Users" className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-serif">15 000+</CardTitle>
                    <CardDescription>Историй сохранено</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover-scale border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Image" className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-serif">50 000+</CardTitle>
                    <CardDescription>Фотографий в архиве</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover-scale border-border/50">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Calendar" className="text-primary" size={24} />
                    </div>
                    <CardTitle className="font-serif">120+</CardTitle>
                    <CardDescription>Мероприятий ежегодно</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Галерея Памяти</h2>
                <p className="text-muted-foreground text-lg">Лица героев, истории подвигов</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {memoryStories.map((memory, index) => (
                  <Card 
                    key={memory.id} 
                    className="hover-scale cursor-pointer border-border/50 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <CardHeader className="p-0">
                      <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                        <img 
                          src={memory.photo} 
                          alt={memory.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="font-serif mb-2">{memory.name}</CardTitle>
                      <CardDescription className="text-sm mb-3">{memory.date}</CardDescription>
                      <p className="text-sm text-muted-foreground line-clamp-3">{memory.story}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Смотреть все истории
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Dialog open={selectedMemory !== null} onOpenChange={() => setSelectedMemory(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedMemory && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">{selectedMemory.name}</DialogTitle>
                  <DialogDescription>{selectedMemory.date}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={selectedMemory.photo} 
                      alt={selectedMemory.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{selectedMemory.story}</p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <section id="events" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Календарь событий</h2>
                <p className="text-muted-foreground text-lg">Памятные даты и мероприятия</p>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card 
                    key={event.id} 
                    className="hover-scale border-border/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
                        <Icon name="Calendar" className="text-primary" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-bold mb-1">{event.title}</h3>
                        <p className="text-sm text-primary mb-2">{event.date}</p>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <Icon name="ChevronRight" size={20} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="archive" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Архив и выставки</h2>
                <p className="text-muted-foreground text-lg">Виртуальные экспозиции и исторические материалы</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="hover-scale border-border/50 group cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                      <Icon name="Image" className="text-primary" size={48} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="font-serif mb-2">Фотоархив войны</CardTitle>
                    <CardDescription className="mb-4">
                      Уникальная коллекция фотографий времен Великой Отечественной войны
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Открыть выставку
                      <Icon name="ExternalLink" className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover-scale border-border/50 group cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-t-lg flex items-center justify-center">
                      <Icon name="BookOpen" className="text-primary" size={48} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="font-serif mb-2">Документальные свидетельства</CardTitle>
                    <CardDescription className="mb-4">
                      Письма, документы и личные вещи участников событий
                    </CardDescription>
                    <Button variant="outline" className="w-full">
                      Изучить материалы
                      <Icon name="ExternalLink" className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Icon name="Heart" className="mx-auto text-primary mb-6" size={48} />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Поддержите нашу миссию</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Ваша помощь позволяет нам сохранять память о героях и создавать новые мемориальные проекты
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Icon name="DollarSign" className="mr-2" size={20} />
                  Сделать пожертвование
                </Button>
                <Button size="lg" variant="outline">
                  <Icon name="HandHeart" className="mr-2" size={20} />
                  Стать волонтёром
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Flame" className="text-primary" size={24} />
                <span className="text-lg font-serif font-bold">Символ Памяти</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Сохраняем память о героях прошлого для будущих поколений
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">О центре</a></li>
                <li><a href="#gallery" className="text-muted-foreground hover:text-foreground transition-colors">Галерея</a></li>
                <li><a href="#events" className="text-muted-foreground hover:text-foreground transition-colors">События</a></li>
                <li><a href="#archive" className="text-muted-foreground hover:text-foreground transition-colors">Архив</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@symbol-pamyati.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  г. Москва
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Социальные сети</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 АНО "Центр мемориальных проектов "Символ памяти". Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
