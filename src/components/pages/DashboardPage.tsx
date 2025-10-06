import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import funcUrls from '../../../backend/func2url.json';

type ViewType = 'home' | 'dashboard' | 'faq' | 'docs' | 'pricing' | 'support';

interface Server {
  id: number;
  name: string;
  status: string;
  players: number;
  maxPlayers: number;
  ram: string;
  version: string;
  ip?: string;
}

export default function DashboardPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const [servers, setServers] = useState<Server[]>([]);
  const [selectedServer, setSelectedServer] = useState<number | null>(1);
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadServers();
    loadConsoleLogs(1);
  }, []);

  const loadServers = async () => {
    try {
      const response = await fetch(funcUrls.servers);
      const data = await response.json();
      if (data.servers) {
        setServers(data.servers);
      }
    } catch (error) {
      console.error('Failed to load servers:', error);
    }
  };

  const loadConsoleLogs = async (serverId: number) => {
    try {
      const response = await fetch(`${funcUrls.console}?serverId=${serverId}`);
      const data = await response.json();
      if (data.logs) {
        setConsoleOutput(data.logs);
      }
    } catch (error) {
      console.error('Failed to load console logs:', error);
    }
  };

  const toggleServer = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(funcUrls.servers, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', serverId: id })
      });
      const data = await response.json();
      
      if (data.success) {
        setServers(servers.map(server => 
          server.id === id 
            ? { ...server, status: data.newStatus, players: data.newStatus === 'offline' ? 0 : server.players }
            : server
        ));
      }
    } catch (error) {
      console.error('Failed to toggle server:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeCommand = async (serverId: number, command: string) => {
    if (!command.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(funcUrls.console, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serverId, command })
      });
      const data = await response.json();
      
      if (data.success && data.logs) {
        setConsoleOutput(prev => [...prev, ...data.logs]);
      }
    } catch (error) {
      console.error('Failed to execute command:', error);
    } finally {
      setLoading(false);
      setConsoleInput('');
    }
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
                            <span className="font-mono">{server.ip || `play.devraz.ru:${25565 + server.id - 1}`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        onClick={() => toggleServer(server.id)}
                        variant={server.status === 'online' ? 'destructive' : 'default'}
                        className={server.status === 'offline' ? 'bg-secondary hover:bg-secondary/90 text-background' : ''}
                        disabled={loading}
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
                        disabled={loading}
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