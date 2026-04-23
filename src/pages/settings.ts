export function getSettingsContent() {
  const user = JSON.parse(localStorage.getItem('peerlearn_user') || '{}');
  const initialName = user.fullName || '';
  const initialSkillsOffered = user.skillsOffered ? user.skillsOffered.join(', ') : '';
  const initialSkillsSought = user.skillsSought ? user.skillsSought.join(', ') : '';
  const isDark = document.documentElement.classList.contains('dark');

  return `
<!-- SideNavBar Component -->
<nav class="fixed left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 space-y-4 bg-surface-container-low border-r border-surface-container-highest z-40 hidden md:flex transition-all duration-300">
  <!-- Main Navigation -->
  <div class="flex-1 space-y-2">
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/dashboard" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="book_2">book_2</span>
      <span class="font-label font-semibold tracking-wide text-sm">Library</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/archives" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="auto_stories">auto_stories</span>
      <span class="font-label font-semibold tracking-wide text-sm">Archives</span>
    </a>

    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/saved" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="bookmark">bookmark</span>
      <span class="font-label font-semibold tracking-wide text-sm">Saved</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/discussion" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="forum">forum</span>
      <span class="font-label font-semibold tracking-wide text-sm">Discussion</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/matches" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="handshake">handshake</span>
      <span class="font-label font-semibold tracking-wide text-sm">Study Matches</span>
    </a>
  </div>
  <!-- CTA -->
  <div class="px-4 py-6" id="nav-actions">
     <!-- populated by js profile dropdown normally in header -->
  </div>
  <!-- Footer Navigation -->
  <div class="pt-4 mt-auto border-t border-surface-container-highest space-y-1">
    <a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-2 bg-surface-container-high rounded-lg transition-all duration-300" href="/settings" data-link>
      <span class="material-symbols-outlined fill-icon text-lg" data-icon="settings">settings</span>
      <span class="font-label text-sm">Settings</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-300" href="#">
      <span class="material-symbols-outlined text-lg" data-icon="help">help</span>
      <span class="font-label text-sm">Support</span>
    </a>
  </div>
</nav>

<!-- Main Canvas -->
<main class="flex-1 ml-0 md:ml-72 min-h-screen bg-surface flex flex-col pt-8 md:pt-12 px-6 md:px-12 lg:px-16 overflow-y-auto">
  <!-- Mobile Top Nav -->
  <div class="md:hidden fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md z-30 px-6 py-4 flex justify-between items-center border-b border-surface-container-low">
    <h1 class="font-headline font-bold text-lg text-primary">Settings</h1>
    <div id="mobile-nav-actions"></div>
  </div>

  <div class="max-w-3xl w-full mx-auto md:mx-0 mt-12 md:mt-0 pb-24">
    <header class="mb-10">
      <h2 class="font-headline text-4xl font-extrabold text-on-background tracking-tight mb-2">Settings</h2>
      <p class="font-body text-lg text-on-surface-variant">Manage your account preferences and application appearance.</p>
    </header>

    <!-- Profile Management -->
    <section class="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
      <h3 class="font-headline text-xl font-bold text-on-background mb-1">Profile Information</h3>
      <p class="font-body text-sm text-on-surface-variant mb-6">Update your display name and learning preferences to find matches.</p>
      
      <form id="settings-profile-form" class="space-y-4 max-w-md">
        <div id="settings-profile-error" class="hidden text-error font-body text-xs flex items-center gap-2 bg-error-container p-3 rounded-lg">
          <span class="material-symbols-outlined text-sm">error</span> <span class="error-msg"></span>
        </div>
        <div id="settings-profile-success" class="hidden text-primary font-body text-xs flex items-center gap-2 bg-primary-container p-3 rounded-lg">
          <span class="material-symbols-outlined text-sm">check_circle</span> <span>Profile updated successfully.</span>
        </div>

        <div>
          <label class="block font-label text-xs font-semibold text-on-background mb-1.5 ml-1">Full Name</label>
          <input type="text" id="settings-name" value="${initialName}" required class="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-3 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" placeholder="e.g. Jane Doe" />
        </div>
        
        <div>
          <label class="block font-label text-xs font-semibold text-on-background mb-1.5 ml-1">What I am good at (Skills Offered)</label>
          <input type="text" id="settings-skills-offered" value="${initialSkillsOffered}" class="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-3 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" placeholder="e.g. Java, Web Design, Math..." />
          <p class="text-xs text-on-surface-variant mt-1 ml-1">Comma-separated list of subjects you can teach.</p>
        </div>

        <div>
          <label class="block font-label text-xs font-semibold text-on-background mb-1.5 ml-1">What I want to learn (Skills Sought)</label>
          <input type="text" id="settings-skills-sought" value="${initialSkillsSought}" class="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg py-2.5 px-3 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" placeholder="e.g. Python, Physics, React..." />
          <p class="text-xs text-on-surface-variant mt-1 ml-1">Comma-separated list of subjects you need help with.</p>
        </div>
        
        <button type="submit" id="settings-profile-btn" class="w-full sm:w-auto bg-primary text-on-primary rounded-full py-2.5 px-6 font-label font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 mt-2">
           Save Changes
        </button>
      </form>
    </section>

    <!-- Appearance -->
    <section class="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
      <h3 class="font-headline text-xl font-bold text-on-background mb-1">Appearance</h3>
      <p class="font-body text-sm text-on-surface-variant mb-6">Customize the interface theme.</p>
      
      <div class="flex items-center justify-between py-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center">
            <span class="material-symbols-outlined">${isDark ? 'dark_mode' : 'light_mode'}</span>
          </div>
          <div>
            <h4 class="font-headline font-semibold text-on-background">Dark Mode</h4>
            <p class="font-body text-xs text-on-surface-variant">Toggle dark theme</p>
          </div>
        </div>
        <button id="theme-toggle-btn" class="w-12 h-6 rounded-full transition-colors duration-200 relative ${isDark ? 'bg-primary' : 'bg-surface-container-highest'} outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
           <span class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-on-primary shadow transition-all duration-200 ${isDark ? 'left-[26px]' : 'left-1'}"></span>
        </button>
      </div>
    </section>

    <!-- Blocked Users -->
    <section class="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
      <h3 class="font-headline text-xl font-bold text-on-background mb-1">Privacy & Blocked Users</h3>
      <p class="font-body text-sm text-on-surface-variant mb-6">Manage the list of people you have blocked from contacting you.</p>
      
      <div id="blocked-users-list" class="space-y-4">
        <!-- populated by js -->
        <div class="flex items-center justify-center py-8">
           <div class="animate-spin material-symbols-outlined text-primary">refresh</div>
        </div>
      </div>
    </section>

    <!-- Danger Zone -->
    <section class="border border-error/30 bg-error/5 rounded-2xl p-6 md:p-8">
      <h3 class="font-headline text-xl font-bold text-error mb-1">Danger Zone</h3>
      <p class="font-body text-sm text-on-surface-variant mb-6">Permanently delete your account and all associated resources.</p>
      
      <button id="delete-account-btn" class="w-full sm:w-auto border border-error text-error hover:bg-error hover:text-on-error rounded-full py-2.5 px-6 font-label font-bold text-sm transition-all focus:ring-2 focus:ring-error focus:ring-offset-2">
         Delete Account
      </button>
    </section>

  </div>
</main>
  `;
}
