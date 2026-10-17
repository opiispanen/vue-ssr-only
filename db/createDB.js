import sqlite3 from 'sqlite3';

// Connect to SQLite database (or create if it doesn't exist)
const db = new sqlite3.Database(process.env.VIIXET_SSR_TODOS || 'ssr_vue_todos.db');

// Create the 'todo' table
db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS todo (
		todoId INTEGER PRIMARY KEY AUTOINCREMENT,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		modified DATETIME DEFAULT CURRENT_TIMESTAMP,
		title TEXT,
		description TEXT,
		extra TEXT,
		state INTEGER DEFAULT 0,
		deleted INTEGER DEFAULT 0,
        userId TEXT
	)`);

	// Create the 'folder' table
	db.run(`CREATE TABLE IF NOT EXISTS folder (
		folderId INTEGER PRIMARY KEY AUTOINCREMENT,
		created DATETIME DEFAULT CURRENT_TIMESTAMP,
		modified DATETIME DEFAULT CURRENT_TIMESTAMP,
		name TEXT,
		todos TEXT,
		deleted INTEGER DEFAULT 0,
        userId TEXT
	)`);
});

// Close the database connection
db.close((err) => {
	if (err) {
		return console.error(err.message)
	}
	console.log('Database created successfully')
})
