import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

type ViewType = 'home' | 'dashboard' | 'faq' | 'docs' | 'pricing' | 'support';

export default function Index() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  return (
    <div className="min-h-screen">
      {currentView === 'home' && <HomePage onNavigate={setCurrentView} />}
      {currentView === 'dashboard' && <DashboardPage onNavigate={setCurrentView} />}
      {currentView === 'faq' && <FAQPage onNavigate={setCurrentView} />}
      {currentView === 'docs' && <DocsPage onNavigate={setCurrentView} />}
      {currentView === 'pricing' && <PricingPage onNavigate={setCurrentView} />}
      {currentView === 'support' && <SupportPage onNavigate={setCurrentView} />}
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
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
            <button onClick={() => onNavigate('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => onNavigate('docs')} className="text-sm font-medium hover:text-primary transition-colors">Документация</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => onNavigate('support')} className="text-sm font-medium hover:text-primary transition-colors">Поддержка</button>
            <Button onClick={() => onNavigate('dashboard')} variant="outline" size="sm">
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

function DashboardPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [servers, setServers] = useState([
    { id: 1, name: 'Survival Server', status: 'online', players: 8, maxPlayers: 500, ram: '4 GB', version: '1.19.4' },
    { id: 2, name: 'Creative World', status: 'offline', players: 0, maxPlayers: 10, ram: '2 GB', version: '1.20.1' },
    { id: 3, name: 'Skyblock', status: 'online', players: 15, maxPlayers: 30, ram: '4 GB', version: '1.19.4' },
  ]);
  const [selectedServer, setSelectedServer] = useState<number | null>(1);
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '[Server] Server started successfully',
    '[Server] Listening on port 25565',
    '[12:34:56] > op xDevrazLoLDx',
    '[12:34:56] Made xDevrazLoLDx a server operator',
  ]);

  const toggleServer = (id: number) => {
    setServers(servers.map(server => 
      server.id === id 
        ? { ...server, status: server.status === 'online' ? 'offline' : 'online', players: server.status === 'online' ? 0 : server.players }
        : server
    ));
  };

  const executeCommand = (serverId: number, command: string) => {
    if (!command.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString('ru-RU');
    setConsoleOutput(prev => [...prev, `[${timestamp}] > ${command}`]);
    
    if (command.startsWith('op ')) {
      const username = command.substring(3).trim();
      setConsoleOutput(prev => [...prev, `[${timestamp}] Made ${username} a server operator`]);
    } else if (command.startsWith('deop ')) {
      const username = command.substring(5).trim();
      setConsoleOutput(prev => [...prev, `[${timestamp}] Made ${username} no longer a server operator`]);
    } else if (command === 'list') {
      setConsoleOutput(prev => [...prev, `[${timestamp}] There are 8/30 players online`]);
    } else {
      setConsoleOutput(prev => [...prev, `[${timestamp}] Command executed: ${command}`]);
    }
    
    setConsoleInput('');
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
            <button onClick={() => onNavigate('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => onNavigate('docs')} className="text-sm font-medium hover:text-primary transition-colors">Документация</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => onNavigate('support')} className="text-sm font-medium hover:text-primary transition-colors">Поддержка</button>
            <Button onClick={() => onNavigate('home')} variant="ghost" size="sm">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
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
            <div key={server.id} className="space-y-4">
              <Card className="hover-glow border-border/50">
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
                          <div className="flex items-center gap-2">
                            <Icon name="Globe" size={14} />
                            <span className="font-mono">play.devraz.ru:{25565 + server.id - 1}</span>
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
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setSelectedServer(selectedServer === server.id ? null : server.id)}
                        className={selectedServer === server.id ? 'bg-primary/10 border-primary' : ''}
                      >
                        <Icon name="Terminal" size={18} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Icon name="Settings" size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedServer === server.id && (
                <Card className="border-primary/50 animate-in slide-in-from-top-4">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Terminal" size={20} className="text-primary" />
                      Консоль сервера
                    </CardTitle>
                    <CardDescription>Управление через команды</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 mb-4 h-64 overflow-y-auto font-mono text-sm">
                      {consoleOutput.map((line, idx) => (
                        <div key={idx} className="text-muted-foreground mb-1">{line}</div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Введите команду (например: op xDevrazLoLDx)"
                        value={consoleInput}
                        onChange={(e) => setConsoleInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            executeCommand(server.id, consoleInput);
                          }
                        }}
                        className="font-mono"
                      />
                      <Button 
                        onClick={() => executeCommand(server.id, consoleInput)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Icon name="Send" size={18} className="mr-2" />
                        Выполнить
                      </Button>
                    </div>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setConsoleInput('op xDevrazLoLDx');
                          executeCommand(server.id, 'op xDevrazLoLDx');
                        }}
                      >
                        op xDevrazLoLDx
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setConsoleInput('list')}
                      >
                        list
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setConsoleInput('save-all')}
                      >
                        save-all
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-glow">MINECRAFT HOSTING</h1>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => onNavigate('docs')} className="text-sm font-medium hover:text-primary transition-colors">Документация</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => onNavigate('support')} className="text-sm font-medium hover:text-primary transition-colors">Поддержка</button>
            <Button onClick={() => onNavigate('dashboard')} variant="outline" size="sm">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Icon name="HelpCircle" size={14} className="mr-1" />
              Часто задаваемые вопросы
            </Badge>
            <h1 className="text-5xl font-bold mb-4">FAQ</h1>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Как быстро запускается сервер?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Сервер запускается автоматически в течение 60 секунд после оплаты. Вы получите доступ к панели управления и сможете сразу начать игру.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Какие версии Minecraft поддерживаются?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы поддерживаем все версии Minecraft от 1.8 до последней 1.20.4, включая Forge, Fabric, Paper и Spigot. Вы можете легко переключаться между версиями через панель управления.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли установить моды и плагины?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да! В панели управления есть встроенный маркетплейс с тысячами модов и плагинов. Установка происходит в один клик без необходимости вручную загружать файлы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Как работают бэкапы?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Автоматические бэкапы создаются каждые 24 часа и хранятся 7 дней. Вы также можете создавать ручные бэкапы в любой момент. Восстановление мира занимает 2-3 минуты.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Защищены ли серверы от DDoS-атак?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Все серверы защищены многоуровневой системой от DDoS с автоматическим обнаружением и блокировкой атак. Мы гарантируем 99.9% uptime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Можно ли увеличить мощность сервера?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, вы можете в любой момент повысить тариф. Переход происходит мгновенно без потери данных. При понижении тарифа пересчёт производится пропорционально.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Есть ли FTP-доступ к файлам?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, у каждого сервера есть FTP-доступ для прямой работы с файлами. Также доступен встроенный файловый менеджер в веб-панели.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border border-border/50 rounded-lg px-6 hover-glow">
              <AccordionTrigger className="text-lg font-semibold">
                Как связаться с поддержкой?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Техподдержка доступна 24/7 через чат на сайте, Telegram и Discord. Среднее время ответа — 5 минут. Для срочных вопросов есть приоритетная линия для клиентов Pro и Ultimate.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <Card className="border-primary/50 hover-glow">
              <CardContent className="p-8">
                <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Не нашли ответ?</h3>
                <p className="text-muted-foreground mb-6">Напишите нам, и мы ответим в течение 5 минут</p>
                <Button onClick={() => onNavigate('support')} size="lg" className="bg-primary hover:bg-primary/90">
                  Связаться с поддержкой
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocsPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-glow">MINECRAFT HOSTING</h1>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => onNavigate('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            <button onClick={() => onNavigate('support')} className="text-sm font-medium hover:text-primary transition-colors">Поддержка</button>
            <Button onClick={() => onNavigate('dashboard')} variant="outline" size="sm">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
              <Icon name="BookOpen" size={14} className="mr-1" />
              База знаний
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Документация</h1>
            <p className="text-muted-foreground text-lg">Полное руководство по работе с сервером</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Rocket" size={24} className="text-secondary" />
                </div>
                <CardTitle>Быстрый старт</CardTitle>
                <CardDescription>Запуск сервера за 5 минут</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span className="text-muted-foreground">Выберите тариф и оплатите</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span className="text-muted-foreground">Получите доступ к панели</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span className="text-muted-foreground">Выберите версию Minecraft</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span className="text-muted-foreground">Нажмите "Запустить"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary font-bold">5.</span>
                  <span className="text-muted-foreground">Подключитесь по IP-адресу</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <CardTitle>Настройка сервера</CardTitle>
                <CardDescription>Основные параметры</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Изменение server.properties</p>
                <p>• Настройка whitelist/blacklist</p>
                <p>• Управление операторами</p>
                <p>• Настройка портов</p>
                <p>• Конфигурация миров</p>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Package" size={24} className="text-secondary" />
                </div>
                <CardTitle>Моды и плагины</CardTitle>
                <CardDescription>Расширение функционала</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Установка из маркетплейса</p>
                <p>• Загрузка своих модов</p>
                <p>• Обновление плагинов</p>
                <p>• Совместимость версий</p>
                <p>• Решение конфликтов</p>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Database" size={24} className="text-primary" />
                </div>
                <CardTitle>Бэкапы и восстановление</CardTitle>
                <CardDescription>Защита данных</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Автоматические бэкапы</p>
                <p>• Ручное создание копий</p>
                <p>• Восстановление мира</p>
                <p>• Скачивание бэкапов</p>
                <p>• Планирование резервирования</p>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Terminal" size={24} className="text-secondary" />
                </div>
                <CardTitle>Консоль и команды</CardTitle>
                <CardDescription>Управление через терминал</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Основные команды сервера</p>
                <p>• Права игроков (op/deop)</p>
                <p>• Телепортация и gamemode</p>
                <p>• Управление временем/погодой</p>
                <p>• Логи и отладка</p>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Folder" size={24} className="text-primary" />
                </div>
                <CardTitle>FTP и файлы</CardTitle>
                <CardDescription>Прямой доступ к данным</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Подключение через FileZilla</p>
                <p>• Структура папок сервера</p>
                <p>• Редактирование конфигов</p>
                <p>• Загрузка карт и датапаков</p>
                <p>• Права доступа к файлам</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/50 hover-glow">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Lightbulb" size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Видеоуроки</h3>
                  <p className="text-muted-foreground mb-4">
                    Подробные видеогайды по всем аспектам работы с хостингом. От создания сервера до настройки сложных модпаков.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Icon name="Play" size={18} className="mr-2" />
                    Смотреть уроки
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PricingPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-glow">MINECRAFT HOSTING</h1>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => onNavigate('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => onNavigate('docs')} className="text-sm font-medium hover:text-primary transition-colors">Документация</button>
            <button onClick={() => onNavigate('support')} className="text-sm font-medium hover:text-primary transition-colors">Поддержка</button>
            <Button onClick={() => onNavigate('dashboard')} variant="outline" size="sm">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
            <Icon name="Zap" size={14} className="mr-1" />
            Гибкие тарифы
          </Badge>
          <h1 className="text-5xl font-bold mb-4">Выберите свой план</h1>
          <p className="text-muted-foreground text-lg">Без скрытых комиссий. Отмена в любой момент.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
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
                <span className="text-sm">10 GB SSD хранилище</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Защита от DDoS</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Автобэкапы (7 дней)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Поддержка 24/7</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => onNavigate('dashboard')} variant="outline" className="w-full">
                Выбрать план
              </Button>
            </CardFooter>
          </Card>

          <Card className="hover-glow border-primary/50 relative scale-105">
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
                <span className="text-sm">25 GB SSD хранилище</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Усиленная защита DDoS</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Автобэкапы (14 дней)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Приоритетная поддержка</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => onNavigate('dashboard')} className="w-full bg-primary hover:bg-primary/90">
                Выбрать план
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
                <span className="text-sm">50 GB SSD хранилище</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Максимальная защита DDoS</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Автобэкапы (30 дней)</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">VIP-поддержка</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" size={18} className="text-secondary" />
                <span className="text-sm">Выделенный IP-адрес</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => onNavigate('dashboard')} variant="outline" className="w-full">
                Выбрать план
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Сравнение тарифов</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold">Характеристика</th>
                      <th className="text-center py-3 font-semibold">Starter</th>
                      <th className="text-center py-3 font-semibold">Pro</th>
                      <th className="text-center py-3 font-semibold">Ultimate</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3">Оперативная память</td>
                      <td className="text-center">2 GB</td>
                      <td className="text-center">4 GB</td>
                      <td className="text-center">8 GB</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Максимум игроков</td>
                      <td className="text-center">10</td>
                      <td className="text-center">30</td>
                      <td className="text-center">100</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">SSD хранилище</td>
                      <td className="text-center">10 GB</td>
                      <td className="text-center">25 GB</td>
                      <td className="text-center">50 GB</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Хранение бэкапов</td>
                      <td className="text-center">7 дней</td>
                      <td className="text-center">14 дней</td>
                      <td className="text-center">30 дней</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">FTP-доступ</td>
                      <td className="text-center">✓</td>
                      <td className="text-center">✓</td>
                      <td className="text-center">✓</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3">Выделенный IP</td>
                      <td className="text-center">−</td>
                      <td className="text-center">−</td>
                      <td className="text-center">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/50 hover-glow">
            <CardContent className="p-8 text-center">
              <Icon name="Gift" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Первый месяц −30%</h3>
              <p className="text-muted-foreground mb-6">
                Для новых клиентов действует скидка 30% на первый месяц любого тарифа. Используйте промокод <span className="font-mono bg-primary/20 text-primary px-2 py-1 rounded">FIRSTMONTH</span>
              </p>
              <Button onClick={() => onNavigate('dashboard')} size="lg" className="bg-secondary hover:bg-secondary/90 text-background">
                Активировать скидку
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SupportPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
              <span className="text-2xl">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-glow">MINECRAFT HOSTING</h1>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="text-sm font-medium hover:text-primary transition-colors">Главная</button>
            <button onClick={() => onNavigate('faq')} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => onNavigate('docs')} className="text-sm font-medium hover:text-primary transition-colors">Документация</button>
            <button onClick={() => onNavigate('pricing')} className="text-sm font-medium hover:text-primary transition-colors">Тарифы</button>
            <Button onClick={() => onNavigate('dashboard')} variant="outline" size="sm">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Панель
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
              <Icon name="Headphones" size={14} className="mr-1" />
              Мы всегда на связи
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Поддержка 24/7</h1>
            <p className="text-muted-foreground text-lg">Ответим в течение 5 минут</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover-glow border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="MessageCircle" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Онлайн-чат</h3>
                <p className="text-muted-foreground text-sm mb-4">Самый быстрый способ связи</p>
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                  Открыть чат
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Send" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Telegram</h3>
                <p className="text-muted-foreground text-sm mb-4">Пишите в любое время</p>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  @minecraft_support
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-glow border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={32} className="text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground text-sm mb-4">Для сложных вопросов</p>
                <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                  support@mchost.ru
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/50 hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Форма обратной связи</CardTitle>
              <CardDescription>Опишите свою проблему, и мы свяжемся с вами</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ваше имя</label>
                    <Input 
                      placeholder="Иван Петров" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email" 
                      placeholder="ivan@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тема обращения</label>
                  <Input 
                    placeholder="Не запускается сервер"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <Textarea 
                    placeholder="Подробно опишите вашу проблему или вопрос..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="border-primary/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Clock" size={32} className="text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">Время ответа</h3>
                    <p className="text-muted-foreground text-sm">
                      Стандартная поддержка: до 15 минут<br />
                      Приоритетная (Pro/Ultimate): до 5 минут
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Users" size={32} className="text-secondary flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold mb-1">Наша команда</h3>
                    <p className="text-muted-foreground text-sm">
                      15+ специалистов с опытом работы<br />
                      в Minecraft серверах более 5 лет
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}