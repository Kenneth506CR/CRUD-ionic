import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Song } from './song';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private storage: SQLiteObject;
  songsList: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'kenneth_db.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
  }

  dbState(): Observable<boolean> {
    return this.isDbReady.asObservable();
  }

  fetchSongs(): Observable<Song[]> {
    return this.songsList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_) => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch((error) => console.error(error));
      });
  }

  // Get list
  getSongs() {
    return this.storage
      .executeSql('SELECT * FROM songtable', [])
      .then((res) => {
        let items: Song[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              artist_name: res.rows.item(i).artist_name,
              song_name: res.rows.item(i).song_name,
              cedula: res.rows.item(i).cedula,
              year: res.rows.item(i).year,
            });
          }
        }
        this.songsList.next(items);
      });
  }

  // Add
  addSong(
    artist_name: string,
    song_name: string,
    cedula: string,
    year: number
  ) {
    let data = [artist_name, song_name, cedula, year];
    return this.storage
      .executeSql(
        'INSERT INTO songtable (artist_name, song_name, cedula, year) VALUES (?, ?, ?, ?)',
        data
      )
      .then((res) => {
        this.getSongs();
      });
  }

  // Get single object
  getSong(id: number): Promise<Song> {
    return this.storage
      .executeSql('SELECT * FROM songtable WHERE id = ?', [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          artist_name: res.rows.item(0).artist_name,
          song_name: res.rows.item(0).song_name,
          cedula: res.rows.item(0).cedula,
          year: res.rows.item(0).year,
        };
      });
  }

  // Update
  updateSong(id: number, song: Song) {
    let data = [song.artist_name, song.song_name, song.cedula, song.year];
    return this.storage
      .executeSql(
        'UPDATE songtable SET artist_name = ?, song_name = ?, cedula = ?, year = ? WHERE id = ?',
        [...data, id]
      )
      .then((data) => {
        this.getSongs();
      });
  }

  // Delete
  deleteSong(id: number) {
    return this.storage
      .executeSql('DELETE FROM songtable WHERE id = ?', [id])
      .then((_) => {
        this.getSongs();
      });
  }
}
