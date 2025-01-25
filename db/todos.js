import { transaction } from './transaction.js';
/**
 * 
 * @param {String} userId
 * @param {Number} todoId 
 * @param {String} search 
 * @returns {Array}
 */
export async function loadTodos(userId, todoId = null, search = null) {
    try {
        let where = 'WHERE deleted = 0'
        let data = []

        if (todoId) {
            where = 'WHERE todoId = ?'
            data = [ todoId ]
        }

        if (search) {
            where = 'WHERE LOWER(title) LIKE ? OR LOWER(description) LIKE ?'
            data = [
                `%${ search.trim().toLowerCase() }%`,
                `%${ search.trim().toLowerCase() }%`
            ]
        }

        data.push(userId)

        const { rows } = await transaction(
            `SELECT * FROM todo ${where} AND userId = ? ORDER BY state ASC, modified DESC`,
            data
        )
        
        return rows
    } catch (e) {
        console.log('error loading todos', e)
    }

    return []
}

export async function createTodo(user, { title, description }) {
    if (!title) {
        return false
    }

    const query = `INSERT INTO todo (userId, title, description, extra, state) VALUES (?, ?, ?, NULL, ?)`
	const data = [ user.user_id, title, description, 0 ]

    try {
        const { id } = await transaction(query, data)

        return id ? true : false
    } catch(e) {
        console.log('error creating a todo', e)
    }

    return false
}

export async function updateTodo({ todoId, title, description, state }) {
    if (!todoId) {
        return false
    }

    const query = `UPDATE todo 
        SET title = ?, description = ?, state = ?, modified = date('now')
        WHERE todoId = ?`
	const data = [title, description, state, todoId]

    try {
        const { changes } = await transaction(query, data)
        
        return changes ? true : false
    } catch(e) {
        console.log('error updating a todo', e)
    }

    return false
}

export async function deleteTodo({ todoId }) {
    if (!todoId) {
        return false
    }

    const query = `UPDATE todo 
        SET deleted = 1, modified = date('now')
        WHERE todoId = ?`
	const data = [todoId]

    try {
        const { changes } = await transaction(query, data)
        
        return changes ? true : false
    } catch(e) {
        console.log('error deleting a todo', e)
    }

    return false
}