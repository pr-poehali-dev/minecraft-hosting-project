import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для консоли сервера и выполнения команд с сохранением в БД
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
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            server_id = params.get('serverId', '1')
            
            cur.execute('''
                SELECT log_entry 
                FROM console_logs 
                WHERE server_id = %s 
                ORDER BY timestamp ASC
                LIMIT 100
            ''', (int(server_id),))
            
            rows = cur.fetchall()
            logs = [row[0] for row in rows]
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'serverId': int(server_id),
                    'logs': logs
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
                cur.execute('''
                    SELECT players, max_players 
                    FROM servers 
                    WHERE id = %s
                ''', (server_id,))
                row = cur.fetchone()
                if row:
                    response_log = f'There are {row[0]}/{row[1]} players online'
                else:
                    response_log = 'Server not found'
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
            
            command_log = f'[{timestamp}] > {command}'
            response_log_full = f'[{timestamp}] {response_log}'
            
            cur.execute('''
                INSERT INTO console_logs (server_id, log_entry) 
                VALUES (%s, %s), (%s, %s)
            ''', (server_id, command_log, server_id, response_log_full))
            
            conn.commit()
            
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
                    'logs': [command_log, response_log_full]
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
    
    finally:
        cur.close()
        conn.close()
