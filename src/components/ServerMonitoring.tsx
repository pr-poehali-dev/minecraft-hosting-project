import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ServerStats {
  cpu: string;
  memory_used: string;
  memory_total: string;
  network: string;
}

interface Props {
  serverId: number;
  isOnline: boolean;
}

export default function ServerMonitoring({ serverId, isOnline }: Props) {
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setStats(null);
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://functions.poehali.dev/915aabc8-07a4-48a0-b549-6cb6b4952cf5?serverId=${serverId}&action=stats`
        );
        const data = await response.json();
        if (data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, [serverId, isOnline]);

  if (!isOnline) {
    return (
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="Activity" className="text-destructive" size={20} />
            Мониторинг сервера
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="PowerOff" size={16} />
            Сервер выключен
          </div>
        </CardContent>
      </Card>
    );
  }

  if (loading && !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="Activity" className="text-primary" size={20} />
            Мониторинг сервера
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Loader2" className="animate-spin" size={16} />
            Загрузка статистики...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Icon name="Activity" className="text-green-500" size={20} />
          Мониторинг сервера
          <Badge variant="outline" className="ml-auto">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Cpu" size={16} />
              CPU
            </div>
            <div className="text-2xl font-bold">
              {stats?.cpu || '0%'}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MemoryStick" size={16} />
              RAM
            </div>
            <div className="text-2xl font-bold">
              {stats?.memory_used || '0'}
            </div>
            <div className="text-xs text-muted-foreground">
              из {stats?.memory_total || '0'}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Network" size={16} />
            Сеть
          </div>
          <div className="text-sm font-mono">
            {stats?.network || '0B / 0B'}
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Обновляется каждые 5 секунд
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
