import json
from typing import Dict, Any, List
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для консоли сервера и выполнения команд
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict с логами и результатами команд
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        server_id = params.get('serverId', '1')
        
        console_logs: List[str] = [
            '[Server] Server started successfully',
            '[Server] Listening on port 25565',
            '[12:34:56] > op xDevrazLoLDx',
            '[12:34:56] Made xDevrazLoLDx a server operator',
            '[12:35:12] > online-mode false',
            '[12:35:12] Server online-mode set to false',
            '[12:35:12] Server will accept non-premium players'
        ]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'serverId': int(server_id),
                'logs': console_logs
            }),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        server_id = body_data.get('serverId', 1)
        command = body_data.get('command', '').strip()
        
        if not command:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Command is required'}),
                'isBase64Encoded': False
            }
        
        timestamp = datetime.now().strftime('%H:%M:%S')
        response_log = ''
        
        if command.startswith('op '):
            username = command[3:].strip()
            response_log = f'Made {username} a server operator'
        elif command.startswith('deop '):
            username = command[5:].strip()
            response_log = f'Made {username} no longer a server operator'
        elif command == 'list':
            response_log = 'There are 8/500 players online'
        elif command == 'save-all':
            response_log = 'Saved the game'
        elif command.startswith('gamemode '):
            parts = command.split()
            if len(parts) >= 3:
                response_log = f'Set {parts[2]} to game mode {parts[1]}'
            else:
                response_log = f'Set game mode to {parts[1]}'
        elif command.startswith('tp '):
            response_log = 'Teleported player'
        elif command == 'stop':
            response_log = 'Stopping server...'
        else:
            response_log = f'Command executed: {command}'
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'serverId': server_id,
                'command': command,
                'timestamp': timestamp,
                'response': response_log,
                'logs': [
                    f'[{timestamp}] > {command}',
                    f'[{timestamp}] {response_log}'
                ]
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
