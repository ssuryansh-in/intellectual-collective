export function getLandingContent(isLoggedIn = false) {
  return `
  <div class="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col">
      <!-- Header -->
      <header class="fixed top-0 w-full z-50 shadow-sm border-b border-outline-variant/10 font-headline font-medium tracking-tight bg-surface/80 backdrop-blur-xl">
        <div class="flex justify-between items-center px-6 md:px-12 py-4 w-full max-w-[1440px] mx-auto">
          <a href="/" data-link class="text-xl md:text-2xl font-extrabold tracking-tighter text-primary">The Intellectual Collective</a>
          
          <!-- Navigation -->
          <nav class="hidden md:flex space-x-8">
            <a class="text-primary-container border-b-2 border-primary-container pb-1 cursor-pointer active:scale-95 transition-all" href="/" data-link>Explore</a>
            <a class="text-on-surface-variant hover:text-primary-container hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer active:scale-95" href="${isLoggedIn ? '/dashboard' : '/login'}" data-link>Resources</a>
            <a class="text-on-surface-variant hover:text-primary-container hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer active:scale-95" href="${isLoggedIn ? '/discussion' : '/login'}" data-link>Questions</a>
          </nav>
          
          <!-- Actions -->
          <div class="hidden md:flex items-center space-x-4 header-actions">
            ${!isLoggedIn ? `
              <a href="/login" data-link class="text-on-surface-variant hover:text-primary-container hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer active:scale-95">Login</a>
              <a href="/register" data-link class="hero-gradient text-on-primary px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer active:scale-95 shadow-[0_4px_14px_0_rgba(0,72,141,0.39)] bg-gradient-to-br from-primary to-primary-container">Sign Up</a>
            ` : `
              <!-- Logged-in Header will be populated by main.ts -->
            `}
          </div>
        </div>
      </header>

      <main class="flex-grow pt-24">
        <!-- Hero Section -->
        <section class="relative w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-32 flex flex-col lg:flex-row items-center overflow-hidden">
          <div class="lg:w-1/2 z-10 space-y-8 pr-0 lg:pr-12 text-left ml-0 lg:ml-20">
            <h1 class="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-tight tracking-tight">
              Learn Together,<br>
              <span class="text-secondary">Grow Together</span>
            </h1>
            <p class="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Join a premier digital atheneum where knowledge is shared, not hoarded. Connect with peers, share high-quality resources, and elevate your academic journey through collaborative excellence.
            </p>
            <div class="flex flex-wrap gap-4 pt-4">
              ${!isLoggedIn ? `
                <a href="/register" data-link class="hero-gradient text-on-primary px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg shadow-primary/20 text-lg bg-gradient-to-br from-primary to-primary-container">
                  Get Started
                </a>
              ` : `
                <a href="/dashboard" data-link class="hero-gradient text-on-primary px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg shadow-primary/20 text-lg bg-gradient-to-br from-primary to-primary-container">
                  Go To Dashboard
                </a>
              `}
              <a href="${isLoggedIn ? '/dashboard' : '/login'}" data-link class="border border-outline-variant/20 bg-transparent text-primary px-8 py-4 rounded-full font-semibold hover:bg-surface-container-low transition-colors duration-200 text-lg">
                Browse Resources
              </a>
            </div>
          </div>
          
          <div class="lg:w-1/2 mt-16 lg:mt-0 relative z-0">
            <div class="relative w-full aspect-square max-w-lg mx-auto">
              <!-- Glow -->
              <div class="absolute inset-0 bg-surface-container-high rounded-full opacity-50 blur-3xl transform translate-x-10 translate-y-10"></div>
              
              <!-- Hotlinked image from user -->
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmDi_TqMRwlkyM2dkIivjZdWb-2bDk0sWwYlgTXxWU3x1hbR2U7Jp9Jp-in-Zkok86P_LG1qZ1EwQnH9EKtvvcwIjE2t5woHm9uR0EXMXdJHAgegQQ8mmW_rzM2k24Dg89Ua7e1iwiuFkN-zLpX5nSfJJixr2d2vM266Whse-RvdqQA7Vd-0yyqIDnq93V_4U-o-Ut9ZHNhsjLvSHmsrfYpg6gM8oL31wiOGQA12ohr4ZicerfskVJWhkLb5lnYywJF_-MXF2H63Y_" alt="Students collaborating digitally" class="rounded-[2rem] object-cover w-full h-full shadow-2xl shadow-primary/10 relative z-10" referrerpolicy="no-referrer" />
              
              <div class="absolute -bottom-6 -left-6 bg-surface-container-lowest p-4 rounded-xl shadow-xl shadow-on-surface/5 flex items-center space-x-4 z-20 border border-outline-variant/10">
                <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                  <span class="material-symbols-outlined text-2xl">trending_up</span>
                </div>
                <div>
                  <p class="font-headline font-bold text-lg text-primary">Top 1%</p>
                  <p class="font-body text-sm text-on-surface-variant">Resource Quality</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="bg-surface-container-low py-16 md:py-24 border-y border-outline-variant/10">
          <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
            <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 class="font-headline text-3xl md:text-4xl font-bold text-primary tracking-tight">
                The Pillars of Our Atheneum
              </h2>
              <p class="font-body text-lg text-on-surface-variant">
                Designed to foster deep understanding and genuine peer connection.
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Feature 1 -->
              <div class="bg-surface-container-lowest rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300">
                <div class="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center text-primary mb-6">
                  <span class="material-symbols-outlined text-3xl">library_books</span>
                </div>
                <h3 class="font-headline text-xl font-bold text-primary mb-3">Resource Sharing</h3>
                <p class="font-body text-on-surface-variant leading-relaxed">
                  Access a curated, high-quality repository of study materials, lecture notes, and academic guides uploaded by top-performing peers.
                </p>
              </div>
              
              <!-- Feature 2 -->
              <div class="bg-surface-container-lowest rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300">
                <div class="w-14 h-14 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary mb-6">
                   <span class="material-symbols-outlined text-3xl">forum</span>
                </div>
                <h3 class="font-headline text-xl font-bold text-primary mb-3">Doubt Discussion</h3>
                <p class="font-body text-on-surface-variant leading-relaxed">
                  Post your academic queries and receive clear, concise answers from high-performing peers and mentors. Never stay stuck on a difficult concept again.
                </p>
              </div>
              
              <!-- Feature 3 -->
              <div class="bg-surface-container-lowest rounded-xl p-8 hover:-translate-y-2 transition-transform duration-300">
                <div class="w-14 h-14 rounded-full bg-tertiary-container/10 flex items-center justify-center text-tertiary mb-6">
                  <span class="material-symbols-outlined text-3xl">handshake</span>
                </div>
                <h3 class="font-headline text-xl font-bold text-primary mb-3">Study Matches</h3>
                <p class="font-body text-on-surface-variant leading-relaxed">
                  Connect with experienced students who have mastered the coursework. Request a connection and start collaborating once accepted.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        ${!isLoggedIn ? `
        <section class="py-16 md:py-24 px-6 md:px-12 bg-surface">
          <div class="max-w-5xl mx-auto rounded-[2rem] p-10 md:p-20 text-center relative overflow-hidden bg-surface-container-high border border-outline-variant/10 shadow-2xl shadow-primary/5">
            <!-- Background element -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-10"></div>
            
            <div class="relative z-10 space-y-8">
              <h2 class="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
                Start Your Collaborative Journey Today
              </h2>
              <p class="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
                Don't navigate academia alone. Become part of a collective dedicated to shared success and deeper understanding.
              </p>
              <a href="/register" data-link class="inline-block hero-gradient text-on-primary px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg shadow-primary/20 text-xl mt-4 bg-gradient-to-br from-primary to-primary-container">
                Join for Free
              </a>
            </div>
          </div>
        </section>
        ` : ''}
      </main>

      <!-- Footer -->
      <footer class="bg-surface-container-low w-full py-12 border-t border-outline-variant/10">
        <div class="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 space-y-6 md:space-y-0 max-w-[1440px] mx-auto text-center md:text-left">
          <div class="text-lg font-bold text-primary">
            The Intellectual Collective
          </div>
          
          <div class="font-body text-sm tracking-wide text-on-surface-variant md:ml-auto">
            &copy; 2026 The Intellectual Collective. All knowledge is shared.
          </div>
        </div>
      </footer>
  </div>
  `;
}
