CREATE TABLE IF NOT EXISTS servers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'offline',
    players INTEGER DEFAULT 0,
    max_players INTEGER DEFAULT 20,
    ram VARCHAR(50) DEFAULT '2 GB',
    version VARCHAR(50) DEFAULT '1.20.4',
    ip VARCHAR(255),
    port INTEGER DEFAULT 25565,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS console_logs (
    id SERIAL PRIMARY KEY,
    server_id INTEGER REFERENCES servers(id),
    log_entry TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO servers (name, status, players, max_players, ram, version, ip, port) VALUES
('Survival Server', 'online', 8, 500, '4 GB', '1.19.4', 'play.devraz.ru', 25565),
('Creative World', 'offline', 0, 10, '2 GB', '1.20.1', 'play.devraz.ru', 25566),
('Skyblock', 'online', 15, 30, '4 GB', '1.19.4', 'play.devraz.ru', 25567);

INSERT INTO console_logs (server_id, log_entry) VALUES
(1, '[Server] Server started successfully'),
(1, '[Server] Listening on port 25565'),
(1, '[12:34:56] > op xDevrazLoLDx'),
(1, '[12:34:56] Made xDevrazLoLDx a server operator'),
(1, '[12:35:12] > online-mode false'),
(1, '[12:35:12] Server online-mode set to false'),
(1, '[12:35:12] Server will accept non-premium players');