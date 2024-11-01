import { createSSRApp } from 'vue'
import { loadTodos, createTodo, updateTodo, deleteTodo } from '../db/todos.js'

export async function useEditTodo(todoId = null) {
    const data = {
        todo: {}
    }
    
    if (todoId) {
        const [ todo ] = await loadTodos(todoId)
        data.todo = todo
    }
    
    return createSSRApp({
        template: /*html*/`<header class="container">
            <a href="/">Go back</a>
        </header>
        <main class="container">
            <h1>{{ todo.todoId ? 'Edit' : 'Create' }} todo</h1>
            <form v-if="todo.todoId" id="deleteTodo" action="/delete" method="POST">
                <input type="hidden" 
                    name="todoId" 
                    :value="todo.todoId" />
            </form>
            <form :action="todo.todoId ? '/update' : '/create'" id="editTodo" method="POST">
                <input v-if="todo.todoId" 
                    type="hidden" 
                    name="todoId" 
                    :value="todo.todoId" />
                <input type="hidden" 
                    name="state" 
                    :value="todo.state" />
                <div class="form-parent">
                    <div class="form-item">
                        <label for="title">Title {{ todo.todoId ? '' : 'for your task' }}</label>
                        <input type="text" 
                            id="title" 
                            name="title" 
                            :value="todo.title" />
                    </div>
                    <div class="form-item">
                        <label for="description">Description</label>
                        <textarea id="description" 
                            name="description" 
                            :value="todo.description">
                        </textarea>
                    </div>
                    <div class="form-item form-controls">
                        <button class="outline"
                            v-if="todo.todoId" 
                            type="submit" 
                            form="deleteTodo">
                            Delete
                        </button>
                        <button type="submit" form="editTodo">Save</button>
                    </div>
                </div>
            </form>
        </main>`,
        data: () => data
    })
}

export async function useSaveTodo(req, res) {
    const { body } = req
    const success = await createTodo(body)

    res.redirect(`/?todo_save_success=${ success ? 1 : 0 }`)
}

export async function useUpdateTodo(req, res) {
    const { body } = req
    const success = await updateTodo(body)

    res.redirect(`/?todo_save_success=${ success ? 1 : 0 }`)
}

export async function useDeleteTodo(req, res) {
    const { body } = req
    const success = await deleteTodo(body)

    res.redirect(`/?todo_delete_success=${ success ? 1 : 0 }`)
}