const sqlite3 = require('sqlite3').verbose();

export const db = new sqlite3.Database('./transcendance.db', sqlite3.OPEN_READWRITE, (err: Error | null) => {
	if (err) {
		console.error(err.message)
		process.exit(1);
	}
})

export function initializeDatabase() {
  let sql = `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, first_name, last_name, username, password)`;
  db.run(sql);
}

export function insertData(first_name: string, last_name:string, username:string, password:string) {
	let sql = `INSERT INTO users(first_name, last_name, username, password) VALUES (?, ?, ?, ?)`;
	db.run(sql, [first_name, last_name, username, password], (err: Error | null) => {
		if (err) console.error(`Error while inserting data: ${err.message}`);
	})
}

export function queryUser(field: string, value: string, callback: (err: Error | null, row?: any) => void) {
	let sql = `SELECT * FROM users WHERE ${field} = ?`;
	db.get(sql, [value], (err: Error | null, row?: any) => {
		callback(err, row);
	})
}

export function deleteData() {

}