import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

type ViewType = 'home' | 'dashboard' | 'faq' | 'docs' | 'pricing' | 'support';

export default function FAQPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
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
