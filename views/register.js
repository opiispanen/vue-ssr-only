import { createSSRApp } from 'vue'

export async function useRegister() {
    return createSSRApp({
        template: /*html*/`<header class="container">
                <a href="/login">Have an account already?</a>
            </header>
            <main class="container">
                <h1>Create an account</h1>
                <form 
                    action="/register"
                    method="POST">
                    <div class="form-parent">
                        <div class="form-item">
                            <label for="username-account">Username</label>
                            <input type="text" 
                                inputmode="email" 
                                id="username-account" 
                                name="username-account" 
                                required 
                                minlength="3" 
                                maxlength="20" 
                                pattern="[A-Za-z0-9]+"
                                title="Username must be 3-20 characters long and contain only letters and numbers." />
                        </div>
                        <div class="form-item">
                            <label for="email-account">Email</label>
                            <input type="email" 
                                id="email-account" 
                                name="email-account" 
                                required 
                                title="Please enter a valid email address." />
                        </div>
                        <div class="form-item">
                            <label for="password-account">Password</label>
                            <input type="password" 
                                id="password-account" 
                                name="password-account" 
                                required 
                                minlength="8" 
                                title="Password must be at least 8 characters long." />
                        </div>
                        <div class="form-item">
                            <label for="password-confirmation">Confirm password</label>
                            <input type="password" 
                                id="password-confirmation" 
                                name="password-confirmation" 
                                required 
                                title="Please confirm your password." />
                        </div>
                        <div class="form-item form-controls">
                            <button type="submit">Register</button>
                        </div>
                    </div>
                </form>
            </main>`
    })
}