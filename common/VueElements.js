export const TodoAction = {
    props: ['todo'],
    template: /*html*/`<form action="/update" method="POST">
        <input type="hidden" name="todoId" :value="todo.todoId" />
        <input type="hidden" name="title" :value="todo.title" />
        <input type="hidden" name="description" :value="todo.description" />
        <input type="hidden" name="state" :value="todo.state ? 0 : 1" />
        <input type="submit" :value="actionLabel" />
    </form>`,
    computed: {
        actionLabel() {
            const { state } = this.todo

            return state ? 'Set undone' : 'Done'
        },
    },
}

export const TodoGoEdit = {
    props: ['todo'],
    template: /*html*/`<form :action="'/edit/' + todo.todoId" method="GET">
        <input type="submit" value="Edit" />
    </form>`,
}

export const TodoElement = {
    props: ['todo'],
    components: {
        TodoAction,
        TodoGoEdit,
    },
    template: /*html*/`<article class="todo-root">
        <header>
            <span class="todo-id">#{{ todo.todoId }} - </span>
            <span class="todo-title">{{ todo.title }}</span>
        </header>
        
        <div class="todo-description">{{ todo.description }}</div>
        
        <footer>
            <div class="todo-actions">
                <div class="todo-date">{{ todo.modified }}</div>
                <TodoGoEdit :todo="todo" />
                <TodoAction :todo="todo" />
            </div>
        </footer>
    </article>`,
}