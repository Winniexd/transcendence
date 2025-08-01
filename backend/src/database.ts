const sqlite3 = require('sqlite3').verbose();
import { v4 } from 'uuid'

export const db = new sqlite3.Database('./transcendance.db', sqlite3.OPEN_READWRITE, (err: Error | null) => {
	if (err) {
		console.error(err.message)
		process.exit(1);
	}
})

export function initializeDatabase() {
  let sql = `CREATE TABLE IF NOT EXISTS users(
  			id INTEGER PRIMARY KEY,
			uuid TEXT UNIQUE,
			first_name TEXT,
			last_name TEXT,
			username TEXT,
			password TEXT)`;
  db.run(sql);
}

export function insertData(first_name: string, last_name:string, username:string, password:string): Promise<any> {
	const uuid = v4();
	let sql = `INSERT INTO users(first_name, last_name, username, password) VALUES (?, ?, ?, ?, ?)`;
	return new Promise((res, rej) => {
		db.run(sql, [uuid, first_name, last_name, username, password], (err: Error | null) => {
			if (err) rej(err);
			else res({ uuid })
		});
	})
}

export function queryUser(field: string, value: string): Promise<any> {
	let sql = `SELECT * FROM users WHERE ${field} = ?`;
	return new Promise((res, rej) => {
		db.get(sql, [value], (err: Error | null, row?: any) => {
			if (err) rej(err);
			else res(row);
		})
	})
}

export function deleteData() {

}