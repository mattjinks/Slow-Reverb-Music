-- Create the Albums table
CREATE TABLE Albums (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    genre VARCHAR(255),
    release_year INT,
    cover VARCHAR(255)
);

-- Create the Songs table
CREATE TABLE Songs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    album_id INT,  -- Reference to Albums table
    genre VARCHAR(255),
    release_year INT,
    file_path VARCHAR(255),
    FOREIGN KEY (album_id) REFERENCES Albums(id)
);

INSERT INTO Songs (title, artist, album_id, genre, release_year, file_path) VALUES
('Intro', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Lost Ones', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Ex-Factor', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('To Zion', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Doo Wop', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Superstar', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Final Hour', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('When it Hurts So Bad', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('I Used to Love Him', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Forgive Them Father', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Every Ghetto, Every City', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Nothing Even Matters', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Everything is Everything', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('The Miseducation of Lauryn Hill', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Can''t Take My Eyes Off You', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3'),
('Tell Him', 'Lauryn Hill', 17, '', 1998, 'https://musicstorage2024.blob.core.windows.net/albums/slow-reverb-albums/Diary of Alicia Keys/01 Harlem''s Nocturne.mp3');
