import { createSSRApp } from 'vue'

export async function useRegister() {
    return createSSRApp({
        template: /*html*/`<header class="container">
                
            </header>
            <main class="container">
                <h1>Create an account</h1>
                <form 
                    action="/register"
                    method="POST">
                    <div class="form-parent">
                        <div class="form-item">
                            <label for="title">Username</label>
                            <input type="text" 
                                inputmode="email"
                                id="username-account" 
                                name="username-account" />
                        </div>
                        <div class="form-item">
                            <label for="title">Email</label>
                            <input type="text" 
                                inputmode="email"
                                id="email-account" 
                                name="email-account" />
                        </div>
                        <div class="form-item">
                            <label for="title">Password</label>
                            <input type="password" 
                                id="password-account" 
                                name="password-account" />
                        </div>
                        <div class="form-item">
                            <label for="title">Confirm password</label>
                            <input type="password" 
                                id="password-confirmation" 
                                name="password-confirmation" />
                        </div>
                        <div class="form-item form-controls">
                            <button type="submit" form="editTodo">Log in</button>
                        </div>
                    </div>
                </form>
            </main>`
    })
}