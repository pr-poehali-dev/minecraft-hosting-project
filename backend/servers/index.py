import json
import os
from typing import Dict, Any
import psycopg2

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления Minecraft серверами с сохранением в БД
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict
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
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            server_id = params.get('id')
            
            if server_id:
                cur.execute('''
                    SELECT id, name, status, players, max_players, ram, version, 
                           CONCAT(ip, ':', port) as full_ip
                    FROM servers 
                    WHERE id = %s
                ''', (int(server_id),))
                row = cur.fetchone()
                
                if row:
                    server = {
                        'id': row[0],
                        'name': row[1],
                        'status': row[2],
                        'players': row[3],
                        'maxPlayers': row[4],
                        'ram': row[5],
                        'version': row[6],
                        'ip': row[7]
                    }
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps(server),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Server not found'}),
                    'isBase64Encoded': False
                }
            
            cur.execute('''
                SELECT id, name, status, players, max_players, ram, version,
                       CONCAT(ip, ':', port) as full_ip
                FROM servers 
                ORDER BY id
            ''')
            rows = cur.fetchall()
            
            servers = []
            for row in rows:
                servers.append({
                    'id': row[0],
                    'name': row[1],
                    'status': row[2],
                    'players': row[3],
                    'maxPlayers': row[4],
                    'ram': row[5],
                    'version': row[6],
                    'ip': row[7]
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'servers': servers}),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            server_id = body_data.get('serverId')
            
            if action == 'toggle':
                cur.execute('SELECT status FROM servers WHERE id = %s', (server_id,))
                row = cur.fetchone()
                
                if row:
                    current_status = row[0]
                    new_status = 'offline' if current_status == 'online' else 'online'
                    new_players = 0 if new_status == 'offline' else None
                    
                    if new_players is not None:
                        cur.execute('''
                            UPDATE servers 
                            SET status = %s, players = %s, updated_at = CURRENT_TIMESTAMP 
                            WHERE id = %s
                        ''', (new_status, new_players, server_id))
                    else:
                        cur.execute('''
                            UPDATE servers 
                            SET status = %s, updated_at = CURRENT_TIMESTAMP 
                            WHERE id = %s
                        ''', (new_status, server_id))
                    
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
                            'newStatus': new_status,
                            'message': f'Server {new_status}'
                        }),
                        'isBase64Encoded': False
                    }
            
            if action == 'create':
                name = body_data.get('name', 'New Server')
                max_players = body_data.get('maxPlayers', 20)
                ram = body_data.get('ram', '2 GB')
                version = body_data.get('version', '1.20.4')
                
                cur.execute('''
                    INSERT INTO servers (name, status, players, max_players, ram, version, ip, port)
                    VALUES (%s, 'offline', 0, %s, %s, %s, 'play.devraz.ru', 
                            (SELECT COALESCE(MAX(port), 25564) + 1 FROM servers))
                    RETURNING id, name, status, players, max_players, ram, version, 
                              CONCAT(ip, ':', port) as full_ip
                ''', (name, max_players, ram, version))
                
                row = cur.fetchone()
                conn.commit()
                
                new_server = {
                    'id': row[0],
                    'name': row[1],
                    'status': row[2],
                    'players': row[3],
                    'maxPlayers': row[4],
                    'ram': row[5],
                    'version': row[6],
                    'ip': row[7]
                }
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'server': new_server
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
