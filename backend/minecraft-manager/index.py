import json
import os
from typing import Dict, Any, List, Optional
import subprocess
import psycopg2
from datetime import datetime

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def run_docker_command(cmd: List[str]) -> tuple[str, str, int]:
    """Execute docker command and return stdout, stderr, returncode"""
    env = os.environ.copy()
    if 'DOCKER_HOST' in env:
        env['DOCKER_HOST'] = env['DOCKER_HOST']
    
    result = subprocess.run(cmd, capture_output=True, text=True, env=env)
    return result.stdout, result.stderr, result.returncode

def get_container_name(server_id: int) -> str:
    return f"minecraft-server-{server_id}"

def get_container_stats(container_name: str) -> Optional[Dict[str, Any]]:
    """Get real-time container resource usage"""
    stdout, stderr, code = run_docker_command([
        'docker', 'stats', container_name, 
        '--no-stream', '--format', '{{.CPUPerc}}|{{.MemUsage}}|{{.NetIO}}'
    ])
    
    if code != 0:
        return None
    
    parts = stdout.strip().split('|')
    if len(parts) >= 3:
        mem_parts = parts[1].split('/')
        return {
            'cpu': parts[0].strip(),
            'memory_used': mem_parts[0].strip() if len(mem_parts) > 0 else '0',
            'memory_total': mem_parts[1].strip() if len(mem_parts) > 1 else '0',
            'network': parts[2].strip()
        }
    return None

def start_minecraft_server(server_id: int, version: str, port: int, ram: str, max_players: int) -> tuple[bool, str]:
    """Start Minecraft server in Docker container"""
    container_name = get_container_name(server_id)
    data_path = os.environ.get('MINECRAFT_DATA_PATH', '/tmp/minecraft-servers')
    server_path = f"{data_path}/server-{server_id}"
    
    run_docker_command(['docker', 'stop', container_name])
    run_docker_command(['docker', 'rm', container_name])
    
    os.makedirs(server_path, exist_ok=True)
    
    ram_value = ram.replace(' GB', 'G').replace(' ', '')
    
    cmd = [
        'docker', 'run', '-d',
        '--name', container_name,
        '-p', f'{port}:25565',
        '-v', f'{server_path}:/data',
        '-e', 'EULA=TRUE',
        '-e', f'VERSION={version}',
        '-e', f'MEMORY={ram_value}',
        '-e', f'MAX_PLAYERS={max_players}',
        '-e', 'TYPE=VANILLA',
        '--restart', 'unless-stopped',
        'itzg/minecraft-server:latest'
    ]
    
    stdout, stderr, code = run_docker_command(cmd)
    
    if code == 0:
        return True, f"Server started with container ID: {stdout.strip()[:12]}"
    else:
        return False, f"Failed to start: {stderr}"

def stop_minecraft_server(server_id: int) -> tuple[bool, str]:
    """Stop Minecraft server container"""
    container_name = get_container_name(server_id)
    
    stdout, stderr, code = run_docker_command(['docker', 'stop', container_name])
    
    if code == 0:
        return True, "Server stopped successfully"
    else:
        return False, f"Failed to stop: {stderr}"

def get_server_status(server_id: int) -> str:
    """Check if container is running"""
    container_name = get_container_name(server_id)
    
    stdout, stderr, code = run_docker_command([
        'docker', 'inspect', '-f', '{{.State.Running}}', container_name
    ])
    
    if code == 0 and stdout.strip() == 'true':
        return 'online'
    return 'offline'

def execute_server_command(server_id: int, command: str) -> tuple[bool, str]:
    """Execute command in running Minecraft server"""
    container_name = get_container_name(server_id)
    
    stdout, stderr, code = run_docker_command([
        'docker', 'exec', container_name,
        'rcon-cli', command
    ])
    
    if code == 0:
        return True, stdout.strip()
    else:
        return False, f"Command failed: {stderr}"

def get_server_logs(server_id: int, lines: int = 100) -> List[str]:
    """Get container logs"""
    container_name = get_container_name(server_id)
    
    stdout, stderr, code = run_docker_command([
        'docker', 'logs', '--tail', str(lines), container_name
    ])
    
    if code == 0:
        return stdout.strip().split('\n')
    return []

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление реальной инфраструктурой Minecraft серверов через Docker
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response с данными о серверах и операциях
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
            server_id = params.get('serverId')
            action = params.get('action')
            
            if action == 'stats' and server_id:
                container_name = get_container_name(int(server_id))
                stats = get_container_stats(container_name)
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'serverId': int(server_id),
                        'stats': stats
                    }),
                    'isBase64Encoded': False
                }
            
            if action == 'logs' and server_id:
                logs = get_server_logs(int(server_id))
                
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
            
            cur.execute('''
                SELECT id, name, status, players, max_players, ram, version, ip, port 
                FROM servers 
                ORDER BY id
            ''')
            
            rows = cur.fetchall()
            servers = []
            
            for row in rows:
                server_id_db = row[0]
                actual_status = get_server_status(server_id_db)
                
                if actual_status != row[2]:
                    cur.execute(
                        'UPDATE servers SET status = %s WHERE id = %s',
                        (actual_status, server_id_db)
                    )
                    conn.commit()
                
                servers.append({
                    'id': server_id_db,
                    'name': row[1],
                    'status': actual_status,
                    'players': row[3],
                    'maxPlayers': row[4],
                    'ram': row[5],
                    'version': row[6],
                    'ip': row[7],
                    'port': row[8] if len(row) > 8 else 25565
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
            
            if action == 'start':
                cur.execute('''
                    SELECT version, port, ram, max_players 
                    FROM servers WHERE id = %s
                ''', (server_id,))
                
                row = cur.fetchone()
                if not row:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Server not found'}),
                        'isBase64Encoded': False
                    }
                
                version, port, ram, max_players = row
                success, message = start_minecraft_server(server_id, version, port, ram, max_players)
                
                if success:
                    cur.execute(
                        'UPDATE servers SET status = %s WHERE id = %s',
                        ('online', server_id)
                    )
                    conn.commit()
                    
                    log_entry = f"[{datetime.now().strftime('%H:%M:%S')}] Server started via Docker"
                    cur.execute(
                        'INSERT INTO console_logs (server_id, log_entry) VALUES (%s, %s)',
                        (server_id, log_entry)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200 if success else 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': success,
                        'message': message,
                        'serverId': server_id
                    }),
                    'isBase64Encoded': False
                }
            
            if action == 'stop':
                success, message = stop_minecraft_server(server_id)
                
                if success:
                    cur.execute(
                        'UPDATE servers SET status = %s, players = %s WHERE id = %s',
                        ('offline', 0, server_id)
                    )
                    conn.commit()
                    
                    log_entry = f"[{datetime.now().strftime('%H:%M:%S')}] Server stopped"
                    cur.execute(
                        'INSERT INTO console_logs (server_id, log_entry) VALUES (%s, %s)',
                        (server_id, log_entry)
                    )
                    conn.commit()
                
                return {
                    'statusCode': 200 if success else 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': success,
                        'message': message,
                        'serverId': server_id
                    }),
                    'isBase64Encoded': False
                }
            
            if action == 'command':
                command = body_data.get('command', '').strip()
                success, output = execute_server_command(server_id, command)
                
                timestamp = datetime.now().strftime('%H:%M:%S')
                command_log = f"[{timestamp}] > {command}"
                response_log = f"[{timestamp}] {output}"
                
                cur.execute('''
                    INSERT INTO console_logs (server_id, log_entry) 
                    VALUES (%s, %s), (%s, %s)
                ''', (server_id, command_log, server_id, response_log))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': success,
                        'output': output,
                        'logs': [command_log, response_log]
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
