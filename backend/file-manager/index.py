import json
import os
from typing import Dict, Any, List
from pathlib import Path

def get_server_path(server_id: int) -> str:
    base_path = os.environ.get('MINECRAFT_DATA_PATH', '/tmp/minecraft-servers')
    return f"{base_path}/server-{server_id}"

def list_files(server_id: int, path: str = '') -> List[Dict[str, Any]]:
    """List files and directories in server directory"""
    server_path = get_server_path(server_id)
    full_path = os.path.join(server_path, path.lstrip('/'))
    
    if not os.path.exists(full_path):
        return []
    
    files = []
    for item in os.listdir(full_path):
        item_path = os.path.join(full_path, item)
        relative_path = os.path.join(path, item).lstrip('/')
        
        stat = os.stat(item_path)
        files.append({
            'name': item,
            'path': relative_path,
            'type': 'directory' if os.path.isdir(item_path) else 'file',
            'size': stat.st_size if os.path.isfile(item_path) else 0,
            'modified': int(stat.st_mtime)
        })
    
    return sorted(files, key=lambda x: (x['type'] != 'directory', x['name'].lower()))

def read_file(server_id: int, file_path: str) -> tuple[bool, str]:
    """Read file content"""
    server_path = get_server_path(server_id)
    full_path = os.path.join(server_path, file_path.lstrip('/'))
    
    if not os.path.exists(full_path) or not os.path.isfile(full_path):
        return False, "File not found"
    
    try:
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()
        return True, content
    except Exception as e:
        return False, str(e)

def write_file(server_id: int, file_path: str, content: str) -> tuple[bool, str]:
    """Write file content"""
    server_path = get_server_path(server_id)
    full_path = os.path.join(server_path, file_path.lstrip('/'))
    
    try:
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, "File saved successfully"
    except Exception as e:
        return False, str(e)

def delete_file(server_id: int, file_path: str) -> tuple[bool, str]:
    """Delete file or directory"""
    server_path = get_server_path(server_id)
    full_path = os.path.join(server_path, file_path.lstrip('/'))
    
    if not os.path.exists(full_path):
        return False, "File not found"
    
    try:
        if os.path.isdir(full_path):
            import shutil
            shutil.rmtree(full_path)
        else:
            os.remove(full_path)
        return True, "Deleted successfully"
    except Exception as e:
        return False, str(e)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Файловый менеджер для управления конфигами Minecraft серверов
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response со списком файлов или содержимым
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            server_id = int(params.get('serverId', '1'))
            path = params.get('path', '')
            action = params.get('action', 'list')
            
            if action == 'read':
                file_path = params.get('file', '')
                success, content = read_file(server_id, file_path)
                
                return {
                    'statusCode': 200 if success else 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': success,
                        'content': content,
                        'file': file_path
                    }),
                    'isBase64Encoded': False
                }
            
            files = list_files(server_id, path)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'serverId': server_id,
                    'path': path,
                    'files': files
                }),
                'isBase64Encoded': False
            }
        
        if method == 'POST' or method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            server_id = body_data.get('serverId', 1)
            file_path = body_data.get('file', '')
            content = body_data.get('content', '')
            
            success, message = write_file(server_id, file_path, content)
            
            return {
                'statusCode': 200 if success else 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': success,
                    'message': message,
                    'file': file_path
                }),
                'isBase64Encoded': False
            }
        
        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            server_id = int(params.get('serverId', '1'))
            file_path = params.get('file', '')
            
            success, message = delete_file(server_id, file_path)
            
            return {
                'statusCode': 200 if success else 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': success,
                    'message': message
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
