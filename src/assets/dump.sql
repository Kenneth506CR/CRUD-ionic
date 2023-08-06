CREATE TABLE IF NOT EXISTS songtable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT, 
    song_name TEXT,
    cedula TEXT,
    year INTEGER
);

INSERT or IGNORE INTO songtable(id, artist_name, song_name, cedula, year) VALUES (1, 'Kenneth Rodríguez', 'Ingenieria en Sistemas', '504260921', 4);
INSERT or IGNORE INTO songtable(id, artist_name, song_name, cedula, year) VALUES (2, 'Roberto Gonzales', 'Administracion', '50983023', 3);
INSERT or IGNORE INTO songtable(id, artist_name, song_name, cedula, year) VALUES (3, 'Jhonsue Galan', 'Ingles', '456789123', 1);
INSERT or IGNORE INTO songtable(id, artist_name, song_name, cedula, year) VALUES (4, 'Franklin Gutierrez', 'Turismo', '789012346', 2);

