export function getRegisterContent() {
  return `
  <div class="min-h-screen flex items-center justify-center p-4 md:p-8 bg-surface text-on-surface font-body antialiased">
    <div class="w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_40px_40px_rgba(25,28,33,0.06)] min-h-[800px]">
      
      <!-- Left Pane - Image & Overlay -->
      <div class="relative hidden md:flex md:w-1/2 bg-surface-container-low flex-col justify-end p-12">
        <img 
          alt="Interior of a grand classical library with rows of ancient books, warm golden lighting, studying atmosphere" 
          class="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" 
          referrerPolicy="no-referrer"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9fn6cWJ7MhyJ34DFqBGwNkyHVPfe5wAnHr5McLE-6LdPbgXZJlUOzS7QTNm-8fE8J-_2LaMX6ZF36exrEChVLxgerNXVhfsj46jT6BEtbGY9taYeXQhuMLwSCISMreJhl-QxtYpYXiEHz59vwYLP_6OVO7sz6FzvqPjswLk9SwkHggH69E2rJpkMBaDypOP0760Cc58t1f49HiiQktVNAFAgUUOjk5qCVHJg3OSAcRasbGkaZeVM75E40N7gJp_UOD5IQIzQc2Vls" 
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#001b3d]/90 to-transparent"></div>
        <div class="relative z-10 space-y-6 max-w-md">
          <h1 class="font-headline text-5xl font-extrabold text-white tracking-tight leading-tight">
            Begin Your<br />Intellectual<br />Journey
          </h1>
          <p class="font-body text-lg text-primary-fixed-dim leading-relaxed">
            Join a curated community of dedicated learners and peers. Engage in collaborative learning, doubt discussion, and resource sharing.
          </p>
        </div>
      </div>
      
      <!-- Right Pane - Registration Form -->
      <div class="w-full md:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div class="mb-12">
          <a href="/" data-link class="font-headline text-2xl font-extrabold tracking-tighter bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent mb-8 inline-block hover:opacity-80 transition-opacity">
            The Intellectual Collective
          </a>
          <h2 class="font-headline text-3xl font-bold text-on-surface mb-2">Create an Account</h2>
          <p class="font-body text-on-surface-variant">Enter your details to register.</p>
        </div>
        
        <div id="register-global-error" class="hidden mb-6 text-error bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm"></div>

        <div class="space-y-4 mb-8">
          <button type="button" id="google-register-btn" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-outline-variant/30 hover:bg-surface-container transition-colors text-on-surface font-medium">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            Sign up with Google
          </button>
        </div>
        
        <!-- Manual Email Reg Hidden for Now -->
        <div class="hidden">
          <div class="relative flex items-center mb-8">
            <div class="flex-grow border-t border-outline-variant/30"></div>
            <span class="flex-shrink-0 mx-4 text-on-surface-variant text-sm font-medium">or register with email</span>
            <div class="flex-grow border-t border-outline-variant/30"></div>
          </div>
          
          <form class="space-y-6" id="register-form">
            <div id="register-error" class="hidden text-error bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm"></div>
            
            <div>
              <label for="fullName" class="block font-label text-sm font-medium text-on-surface mb-2">Full Name</label>
              <input 
                type="text" 
                id="fullName" 
                required
                placeholder="Jane Doe" 
                class="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors" 
              />
            </div>
            
            <div>
              <label for="email" class="block font-label text-sm font-medium text-on-surface mb-2">Institutional or Personal Email</label>
              <input 
                type="email" 
                id="email" 
                required
                placeholder="student@email.com or @university.edu" 
                class="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors" 
              />
            </div>
            
            <div>
              <label for="interest" class="block font-label text-sm font-medium text-on-surface mb-2">Primary Academic Interest</label>
              <div class="relative">
                <select 
                  id="interest" 
                  required
                  class="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 pr-10 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors appearance-none"
                >
                  <option disabled selected value="">Select an area of study...</option>
                  <option value="humanities">Humanities & Arts</option>
                  <option value="social_sciences">Social Sciences</option>
                  <option value="natural_sciences">Natural Sciences</option>
                  <option value="formal_sciences">Formal Sciences</option>
                  <option value="applied_sciences">Applied Sciences</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span class="material-symbols-outlined text-outline">expand_more</span>
                </div>
              </div>
            </div>
            
            <div>
              <label for="password" class="block font-label text-sm font-medium text-on-surface mb-2">Create Password</label>
              <div class="relative">
                <input 
                  type="password" 
                  id="password"
                  required
                  placeholder="••••••••" 
                  class="w-full bg-surface-container-low border-0 rounded-lg pl-4 pr-10 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors" 
                />
                <button type="button" id="toggle-password" class="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface transition-colors cursor-pointer focus:outline-none">
                  <span id="toggle-password-icon" class="material-symbols-outlined text-outline">visibility</span>
                </button>
              </div>
              <p class="font-label text-xs text-on-surface-variant mt-2">Must be at least 8 characters.</p>
            </div>
            
            <div class="pt-4">
              <button 
                type="submit" 
                id="register-submit-btn"
                class="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-full font-headline font-bold text-lg shadow-[0_8px_16px_rgba(0,72,141,0.15)] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        
        <div class="mt-8 text-center bg-surface-container-lowest">
          <p class="font-body text-on-surface-variant text-sm">
            Already have an account? 
            <a href="/login" data-link class="text-primary font-semibold hover:text-primary-container hover:underline underline-offset-4 decoration-2 transition-colors">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
}
