import { createSSRApp } from 'vue'
import { loadTodos } from '../db/todos.js'
import { TodoElement } from '../common/VueElements.js'

export async function useFrontpage(search = null) {
    const todos = await loadTodos(null, search)

    return createSSRApp({
        components: {
            TodoElement,
        },
        template: /*html*/`<header class="container">
            <a href="/create">Add a task</a> 
        </header>
        <main class="container">
            <h1>Your tasks</h1>
            
            <form action="/" method="GET">
                <div class="row">
                    <div class="col-xs">
                        <input type="text" id="search" name="search" value="${ search || '' }" />
                    </div>
                    <div class="col-xs-2">
                        <input type="submit" value="Search" />
                    </div>
                </div>
            </form>
            
            <div class="row">
                <div class="col-xs-12 col-sm-6">
                    <h3>To-do</h3>
                    <TodoElement 
                        v-for="todo in tasksTodo" 
                        :todo="todo" />
                </div>
                <div class="col-xs-12 col-sm-6">
                    <h3>Done</h3>
                    <TodoElement 
                        v-for="todo in tasksDone" 
                        :todo="todo" />
                </div>
            </div>
        </main>`,
        data: () => ({
            todos,
        }),
        computed: {
            tasksTodo() {
                const todos = this.todos

                return todos.filter(row => row.state === 0)
            },
            tasksDone() {
                const todos = this.todos

                return todos.filter(row => row.state === 1)
            },
        },
    })
}