import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type ViewType = 'home' | 'dashboard' | 'faq' | 'docs' | 'pricing' | 'support';

export default function HomePage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
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
              <Button onClick={() => onNavigate('dashboard')} size="lg" className="bg-white text-background hover:bg-white/90 hover-glow">
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
                <Button onClick={() => onNavigate('dashboard')} variant="outline" className="w-full">
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
                <Button onClick={() => onNavigate('dashboard')} className="w-full bg-primary hover:bg-primary/90">
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
                <Button onClick={() => onNavigate('dashboard')} variant="outline" className="w-full">
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
