import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  return (
    <div className="min-h-screen">
      {currentView === 'home' ? (
        <HomePage onNavigate={() => setCurrentView('dashboard')} />
      ) : (
        <DashboardPage onNavigate={() => setCurrentView('home')} />
      )}
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-glow">MINECRAFT HOSTING</h1>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Возможности</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Тарифы</a>
            <Button onClick={onNavigate} variant="outline" size="sm">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden py-20 md:py-32 bg-minecraft-gradient">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
              ⚡ Мгновенный запуск за 60 секунд
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white text-glow">
              Построй свой<br />игровой мир
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Мощный хостинг Minecraft серверов с защитой от DDoS, 
              автоматическими бэкапами и техподдержкой 24/7
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button onClick={onNavigate} size="lg" className="bg-white text-background hover:bg-white/90 hover-glow">
                <Icon name="Zap" size={20} className="mr-2" />
                Создать сервер
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Icon name="PlayCircle" size={20} className="mr-2" />
                Демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-muted-foreground text-lg">Всё для комфортной игры</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <CardTitle>Мгновенный старт</CardTitle>
                <CardDescription>Запуск сервера за 60 секунд без настройки</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Server" size={24} className="text-secondary" />
                </div>
                <CardTitle>SSD накопители</CardTitle>
                <CardDescription>Быстрая загрузка миров и нулевые лаги</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <CardTitle>Защита DDoS</CardTitle>
                <CardDescription>Многоуровневая защита от атак</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Database" size={24} className="text-secondary" />
                </div>
                <CardTitle>Автобэкапы</CardTitle>
                <CardDescription>Ежедневное сохранение прогресса</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <CardTitle>Моды и плагины</CardTitle>
                <CardDescription>Установка в один клик</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Headphones" size={24} className="text-secondary" />
                </div>
                <CardTitle>Поддержка 24/7</CardTitle>
                <CardDescription>Ответ в течение 5 минут</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Тарифы</h2>
            <p className="text-muted-foreground text-lg">Выбери подходящий план</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Для небольших серверов</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">299₽</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">2 GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">До 10 игроков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">10 GB SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">DDoS защита</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={onNavigate} variant="outline" className="w-full">
                  Выбрать
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover-glow border-primary/50 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white">
                Популярный
              </Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Оптимальный выбор</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">599₽</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">4 GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">До 30 игроков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">25 GB SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">Приоритетная поддержка</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={onNavigate} className="w-full bg-primary hover:bg-primary/90">
                  Выбрать
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardHeader>
                <CardTitle>Ultimate</CardTitle>
                <CardDescription>Максимальная мощность</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">999₽</span>
                  <span className="text-muted-foreground">/месяц</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">8 GB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">До 100 игроков</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">50 GB SSD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={18} className="text-secondary" />
                  <span className="text-sm">Выделенный IP</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={onNavigate} variant="outline" className="w-full">
                  Выбрать
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Minecraft Hosting. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

function DashboardPage({ onNavigate }: { onNavigate: () => void }) {
  const [servers, setServers] = useState([
    { id: 1, name: 'Survival Server', status: 'online', players: 8, maxPlayers: 30, ram: '4 GB', version: '1.20.4' },
    { id: 2, name: 'Creative World', status: 'offline', players: 0, maxPlayers: 10, ram: '2 GB', version: '1.20.1' },
    { id: 3, name: 'Skyblock', status: 'online', players: 15, maxPlayers: 30, ram: '4 GB', version: '1.19.4' },
  ]);

  const toggleServer = (id: number) => {
    setServers(servers.map(server => 
      server.id === id 
        ? { ...server, status: server.status === 'online' ? 'offline' : 'online', players: server.status === 'online' ? 0 : server.players }
        : server
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-glow">ПАНЕЛЬ УПРАВЛЕНИЯ</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={onNavigate} variant="ghost" size="sm">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Server" size={16} />
                Всего серверов
              </CardDescription>
              <CardTitle className="text-3xl">{servers.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Activity" size={16} />
                Активных
              </CardDescription>
              <CardTitle className="text-3xl text-secondary">
                {servers.filter(s => s.status === 'online').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Users" size={16} />
                Онлайн игроков
              </CardDescription>
              <CardTitle className="text-3xl text-primary">
                {servers.reduce((sum, s) => sum + s.players, 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Icon name="Cpu" size={16} />
                Использование RAM
              </CardDescription>
              <CardTitle className="text-3xl">
                {servers.filter(s => s.status === 'online').reduce((sum, s) => sum + parseInt(s.ram), 0)} GB
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Мои серверы</h2>
            <Button className="bg-secondary hover:bg-secondary/90 text-background">
              <Icon name="Plus" size={18} className="mr-2" />
              Создать сервер
            </Button>
          </div>

          {servers.map(server => (
            <Card key={server.id} className="hover-glow border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center text-3xl">
                      ⛏️
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{server.name}</h3>
                        <Badge variant={server.status === 'online' ? 'default' : 'secondary'} 
                               className={server.status === 'online' ? 'bg-secondary text-background' : ''}>
                          {server.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Icon name="Users" size={14} />
                          <span>{server.players}/{server.maxPlayers} игроков</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Cpu" size={14} />
                          <span>{server.ram} RAM</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Package" size={14} />
                          <span>v{server.version}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={() => toggleServer(server.id)}
                      variant={server.status === 'online' ? 'destructive' : 'default'}
                      className={server.status === 'offline' ? 'bg-secondary hover:bg-secondary/90 text-background' : ''}
                    >
                      <Icon name={server.status === 'online' ? 'Square' : 'Play'} size={18} className="mr-2" />
                      {server.status === 'online' ? 'Остановить' : 'Запустить'}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Settings" size={18} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="MoreVertical" size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}