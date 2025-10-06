import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type ViewType = 'home' | 'dashboard' | 'faq' | 'docs' | 'pricing' | 'support';

export default function PricingPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
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
