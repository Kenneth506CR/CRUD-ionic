import { TestBed } from '@angular/core/testing';
import { DbService } from './db.service';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';

describe('DbService', () => {
  let dbService: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DbService,
        Platform,
        SQLite,
        SQLitePorter,
        HttpClient
      ]
    });
    dbService = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(dbService).toBeTruthy();
  });


});
