import { transaction } from './transaction.js';
// Arrays of sample titles and descriptions
const titles = [
	'Complete project report',
	'Buy groceries',
	'Schedule meeting with client',
	'Call mom',
	'Finish coding assignment',
	'Read a book',
	'Go for a run',
	'Write blog post',
	'Clean the house',
	'Learn a new skill'
];

const descriptions = [
	'Prepare and finalize the project report for submission.',
	'Purchase essential items like milk, bread, and eggs.',
	'Arrange a suitable time to meet with the client to discuss the project.',
	'Catch up with mom and chat about recent events.',
	'Complete the remaining tasks for the coding assignment.',
	'Choose a book and spend time reading to relax.',
	'Engage in a short running session to stay fit.',
	'Draft an interesting blog post on a relevant topic.',
	'Tidy up and organize different areas of the house.',
	'Explore online tutorials to learn a new programming language.'
];

for (let i = 0; i < 10; i++) {
    const title = titles[i];
    const description = descriptions[i];
    const state = Math.random() < 0.5 ? 0 : 1; // Randomly assign state as 0 or 1
	const query = `INSERT INTO todo (title, description, extra, state) VALUES (?, ?, NULL, ?)`
	const data = [title, description, state]

	transaction(query, data)
		.then(({ rows, id }) => console.log('new todo created', id, rows))
		.catch(err => console.log('error:', err))
}