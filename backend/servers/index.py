import json
from typing import Dict, Any, List
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления Minecraft серверами
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
    
    servers_data: List[Dict[str, Any]] = [
        {
            'id': 1,
            'name': 'Survival Server',
            'status': 'online',
            'players': 8,
            'maxPlayers': 500,
            'ram': '4 GB',
            'version': '1.19.4',
            'ip': 'play.devraz.ru:25565',
            'uptime': '3 days 12 hours'
        },
        {
            'id': 2,
            'name': 'Creative World',
            'status': 'offline',
            'players': 0,
            'maxPlayers': 10,
            'ram': '2 GB',
            'version': '1.20.1',
            'ip': 'play.devraz.ru:25566',
            'uptime': '0 hours'
        },
        {
            'id': 3,
            'name': 'Skyblock',
            'status': 'online',
            'players': 15,
            'maxPlayers': 30,
            'ram': '4 GB',
            'version': '1.19.4',
            'ip': 'play.devraz.ru:25567',
            'uptime': '1 day 6 hours'
        }
    ]
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        server_id = params.get('id')
        
        if server_id:
            server = next((s for s in servers_data if s['id'] == int(server_id)), None)
            if server:
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
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'servers': servers_data}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        server_id = body_data.get('serverId')
        
        if action == 'toggle':
            server = next((s for s in servers_data if s['id'] == server_id), None)
            if server:
                new_status = 'offline' if server['status'] == 'online' else 'online'
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
            new_server = {
                'id': len(servers_data) + 1,
                'name': body_data.get('name', 'New Server'),
                'status': 'offline',
                'players': 0,
                'maxPlayers': body_data.get('maxPlayers', 20),
                'ram': body_data.get('ram', '2 GB'),
                'version': body_data.get('version', '1.20.4'),
                'ip': f'play.devraz.ru:{25565 + len(servers_data)}',
                'uptime': '0 hours'
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
