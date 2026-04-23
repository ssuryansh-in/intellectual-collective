export function getLoginContent() {
  return `
  <div class="bg-background text-on-surface min-h-screen flex items-center justify-center p-4 lg:p-0">
    <div class="w-full max-w-7xl h-full min-h-[800px] flex flex-col lg:flex-row bg-surface-container-lowest rounded-xl lg:rounded-none overflow-hidden shadow-2xl lg:shadow-none lg:w-screen lg:h-screen lg:max-w-none relative">
      
      <!-- Left Column - Branding (Hidden on Mobile) -->
      <div class="hidden lg:flex w-1/2 relative bg-surface-container-low flex-col justify-between overflow-hidden">
        <!-- Background Imagery -->
        <div class="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIoYE3uHouVyzSbgWyznkCuqA1vzP5aBFdfgN2oIyFI0hYoKkvxyVStBocGW7f2vxF4cK-xXPc4df4zzlX_TlfY2HIHi8YXpxr3AJLdwx8P0YkKkJFc_9ZN3jn5yqmtNVK5Jj6n3C3MBaaI8HSTpp949MXFYdT8QcGdbHvcbxI8Mt-cwDJCG0U5MW327577uNF5_NurRzD2iAvvC4al8OqS8nqHpXUXNLtvXroMKLlXgGohND5TfR9VQkk9N37hfijjWTp3W6IdBYT" 
            alt="Library Architecture" 
            class="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent"></div>
        </div>
        
        <!-- Top Branding -->
        <div class="relative z-10 p-12 lg:p-20">
          <a href="/" data-link class="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
            <span class="material-symbols-outlined text-4xl text-on-primary">school</span>
            <span class="font-headline text-2xl font-extrabold text-on-primary tracking-tight">The Intellectual Collective</span>
          </a>
        </div>
        
        <!-- Bottom Content -->
        <div class="relative z-10 p-12 lg:p-20 mt-auto">
          <h1 class="font-headline text-4xl lg:text-5xl font-bold text-on-primary mb-6 leading-tight">
            Cultivating <br /> Global Knowledge.
          </h1>
          <p class="font-body text-lg text-on-primary-container max-w-md mb-8">
            Join a community of scholars, researchers, and lifelong learners dedicated to the pursuit of intellectual excellence and collaborative discovery.
          </p>
        </div>
      </div>

      <!-- Right Column - Login Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 bg-surface">
        <div class="w-full max-w-md">
          
          <!-- Mobile Branding -->
          <div class="lg:hidden flex items-center justify-center gap-3 mb-12">
            <span class="material-symbols-outlined text-3xl text-primary">school</span>
            <span class="font-headline text-xl font-extrabold text-primary tracking-tight">The Intellectual Collective</span>
          </div>
          
          <div class="mb-10 text-center lg:text-left">
            <h2 class="font-headline text-3xl font-bold text-on-surface mb-3">Continue Your Scholarly Journey</h2>
            <p class="font-body text-on-surface-variant text-base">Sign in to access your library, collaborate, and discover new resources.</p>
          </div>
          
          <div id="login-global-error" class="hidden mb-6 text-error bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm"></div>

          <!-- Social Login -->
          <div class="flex flex-col gap-4 mb-8">
            <button type="button" id="google-login-btn" class="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container-low transition-colors duration-200 shadow-sm">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span class="font-body font-medium text-on-surface">Continue with Google</span>
            </button>
          </div>
          
          <!-- Divider -->
          <div class="hidden">
            <div class="relative flex items-center py-5">
              <div class="flex-grow border-t border-outline-variant/30"></div>
              <span class="flex-shrink-0 mx-4 text-on-surface-variant font-body text-sm">or sign in with email</span>
              <div class="flex-grow border-t border-outline-variant/30"></div>
            </div>
            
            <!-- Email Form -->
            <form class="space-y-6 mt-4" id="login-form">
              <div id="login-error" class="hidden text-error bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm"></div>

              <div class="space-y-2">
                <label for="email" class="block font-body text-sm font-medium text-on-surface">Institutional or Personal Email</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="material-symbols-outlined text-outline">mail</span>
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    placeholder="scholar@university.edu" 
                    class="block w-full pl-10 pr-3 py-3 border border-outline-variant/50 rounded-lg bg-surface-container-lowest text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow font-body"
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label for="password" class="block font-body text-sm font-medium text-on-surface">Password</label>
                  <a href="#" class="font-body text-sm font-medium text-primary hover:text-primary-container transition-colors">Forgot Password?</a>
                </div>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="material-symbols-outlined text-outline">lock</span>
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    required
                    placeholder="••••••••" 
                    class="block w-full pl-10 pr-10 py-3 border border-outline-variant/50 rounded-lg bg-surface-container-lowest text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow font-body"
                  />
                  <button type="button" id="toggle-password" class="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors cursor-pointer focus:outline-none">
                    <span id="toggle-password-icon" class="material-symbols-outlined text-outline">visibility</span>
                  </button>
                </div>
              </div>
              
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="remember-me" 
                  class="h-4 w-4 text-primary focus:ring-primary border-outline-variant/50 rounded bg-surface-container-lowest"
                />
                <label for="remember-me" class="ml-2 block text-sm font-body text-on-surface-variant">
                  Remember me on this device
                </label>
              </div>
              
              <button 
                type="submit" 
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-[0_4px_14px_0_rgba(0,72,141,0.39)] text-base font-semibold text-on-primary bg-gradient-to-br from-primary to-primary-container hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-headline"
              >
                Sign In
              </button>
            </form>
          </div>
          
          <!-- Footer / Sign Up Link -->
          <div class="mt-10 text-center">
            <p class="text-sm font-body text-on-surface-variant">
              Don't have an account? 
              <a href="/register" data-link class="font-medium text-primary hover:text-primary-container underline decoration-primary/30 underline-offset-4 transition-all">Apply for Access</a>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  `;
}
