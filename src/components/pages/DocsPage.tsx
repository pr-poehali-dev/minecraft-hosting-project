import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type ViewType = 'home' | 'dashboard' | 'faq' | 'docs' | 'pricing' | 'support';

export default function DocsPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
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
