import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size: number;
  modified: number;
}

interface Props {
  serverId: number;
}

export default function FileManager({ serverId }: Props) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [saving, setSaving] = useState(false);

  const loadFiles = async (path: string = '') => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://functions.poehali.dev/d1f738ad-2b37-4fbf-b50a-72a6505d843c?serverId=${serverId}&path=${encodeURIComponent(path)}`
      );
      const data = await response.json();
      setFiles(data.files || []);
      setCurrentPath(path);
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  const openFile = async (file: FileItem) => {
    if (file.type === 'directory') {
      loadFiles(file.path);
      return;
    }

    try {
      const response = await fetch(
        `https://functions.poehali.dev/d1f738ad-2b37-4fbf-b50a-72a6505d843c?serverId=${serverId}&action=read&file=${encodeURIComponent(file.path)}`
      );
      const data = await response.json();
      if (data.success) {
        setFileContent(data.content);
        setEditingFile(file.path);
      }
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  };

  const saveFile = async () => {
    if (!editingFile) return;

    try {
      setSaving(true);
      const response = await fetch(
        'https://functions.poehali.dev/d1f738ad-2b37-4fbf-b50a-72a6505d843c',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serverId,
            file: editingFile,
            content: fileContent
          })
        }
      );
      const data = await response.json();
      if (data.success) {
        setEditingFile(null);
        setFileContent('');
      }
    } catch (error) {
      console.error('Failed to save file:', error);
    } finally {
      setSaving(false);
    }
  };

  const goBack = () => {
    const parentPath = currentPath.split('/').slice(0, -1).join('/');
    loadFiles(parentPath);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString('ru-RU');
  };

  useEffect(() => {
    loadFiles();
  }, [serverId]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Icon name="FolderOpen" size={20} />
            Файловый менеджер
            {currentPath && (
              <Badge variant="secondary" className="ml-auto font-mono text-xs">
                /{currentPath}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {currentPath && (
              <Button
                variant="ghost"
                size="sm"
                onClick={goBack}
                className="w-full justify-start"
              >
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                Загрузка...
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-1">
                  {files.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <Icon name="FolderX" size={32} className="mx-auto mb-2 opacity-50" />
                      Директория пуста или сервер не создан
                    </div>
                  ) : (
                    files.map((file) => (
                      <button
                        key={file.path}
                        onClick={() => openFile(file)}
                        className="w-full flex items-center gap-3 p-2 hover:bg-accent rounded-lg transition-colors text-left"
                      >
                        <Icon
                          name={file.type === 'directory' ? 'Folder' : 'FileText'}
                          size={20}
                          className={file.type === 'directory' ? 'text-blue-500' : 'text-muted-foreground'}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{file.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {file.type === 'file' && `${formatSize(file.size)} • `}
                            {formatDate(file.modified)}
                          </div>
                        </div>
                        {file.type === 'directory' && (
                          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={editingFile !== null} onOpenChange={() => setEditingFile(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="FileEdit" size={20} />
              {editingFile}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="font-mono text-sm min-h-[400px]"
              placeholder="Содержимое файла..."
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditingFile(null)}>
                Отмена
              </Button>
              <Button onClick={saveFile} disabled={saving}>
                {saving ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Icon name="Save" className="mr-2" size={16} />
                    Сохранить
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
