import { createSSRApp } from 'vue'

export async function useLogin() {
    return createSSRApp({
        template: /*html*/`<header class="container">
                
            </header>
            <main class="container">
                <h1>Log in</h1>
                <form 
                    action="/login"
                    method="POST">
                    <div class="form-parent">
                        <div class="form-item">
                            <label for="title">Username</label>
                            <input type="text" 
                                inputmode="email"
                                id="username" 
                                name="username" />
                        </div>
                        <div class="form-item">
                            <label for="title">Password</label>
                            <input type="password" 
                                id="password" 
                                name="password" />
                        </div>
                        <div class="form-item form-controls">
                            <button type="submit" form="editTodo">Log in</button>
                        </div>
                    </div>
                </form>
            </main>`
    })
}