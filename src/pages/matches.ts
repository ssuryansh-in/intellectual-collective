export function getMatchesContent() {
  return `
<!-- SideNavBar Component -->
<nav class="fixed left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 space-y-4 bg-surface-container-low border-r border-surface-container-highest z-40 hidden md:flex transition-all duration-300">
  <!-- Main Navigation -->
  <div class="flex-1 space-y-2">
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/dashboard" data-link>
      <span class="material-symbols-outlined text-xl">book_2</span>
      <span class="font-label font-semibold tracking-wide text-sm">Library</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/archives" data-link>
      <span class="material-symbols-outlined text-xl">auto_stories</span>
      <span class="font-label font-semibold tracking-wide text-sm">Archives</span>
    </a>

    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/saved" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="bookmark">bookmark</span>
      <span class="font-label font-semibold tracking-wide text-sm">Saved</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/discussion" data-link>
      <span class="material-symbols-outlined text-xl">forum</span>
      <span class="font-label font-semibold tracking-wide text-sm">Discussion</span>
    </a>
    <a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-3 bg-surface-container-high rounded-l-lg transition-all duration-300" href="/matches" data-link>
      <span class="material-symbols-outlined fill-icon text-xl text-primary">handshake</span>
      <span class="font-label font-semibold tracking-wide text-sm text-primary">Study Matches</span>
    </a>
  </div>
  <!-- CTA -->
  <div class="px-4 py-6" id="nav-actions">
     <!-- populated by js profile dropdown normally in header -->
  </div>
  <!-- Footer Navigation -->
  <div class="pt-4 mt-auto border-t border-surface-container-highest space-y-1">
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-300" href="/settings" data-link>
      <span class="material-symbols-outlined text-lg">settings</span>
      <span class="font-label text-sm">Settings</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-300" href="#">
      <span class="material-symbols-outlined text-lg">help</span>
      <span class="font-label text-sm">Support</span>
    </a>
  </div>
</nav>

<!-- Main Canvas -->
<main class="flex-1 ml-0 md:ml-72 min-h-screen border-l border-surface-container-low bg-surface flex flex-col pt-8 md:pt-12 px-6 md:px-12 overflow-y-auto">
  <!-- Mobile Top Nav -->
  <div class="md:hidden fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md z-30 px-6 py-4 flex justify-between items-center border-b border-surface-container-low">
    <h1 class="font-headline font-bold text-lg text-primary">Peer Matches</h1>
    <div id="mobile-nav-actions"></div>
  </div>

  <div class="max-w-4xl w-full mx-auto md:mx-0 mt-12 md:mt-0 pb-24">
    <header class="mb-10">
      <h2 class="font-headline text-4xl font-extrabold text-on-background tracking-tight mb-2">Mutual Matches</h2>
      <p class="font-body text-lg text-on-surface-variant">Connect with peers who share complementary skills. <a href="/settings" data-link class="text-primary hover:underline">Edit your profile</a> to find more matches.</p>
    </header>

    <!-- Requests Section -->
    <div id="requests-section" class="mb-12 hidden">
       <h3 class="font-headline text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
         <span class="material-symbols-outlined text-primary">pending_actions</span>
         Incoming Requests
       </h3>
       <div id="requests-list" class="grid gap-6 sm:grid-cols-2"></div>
       <div class="h-px bg-surface-container-highest my-8"></div>
    </div>

    <div id="matches-list" class="grid gap-6 sm:grid-cols-2">
      <div class="col-span-full py-10 flex flex-col items-center justify-center bg-surface-container-lowest/50 rounded-xl border border-dashed border-outline-variant/30">
         <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-2">sync</span>
         <p class="text-on-surface-variant font-label text-sm">Loading matches...</p>
      </div>
    </div>
  </div>
</main>
  `;
}
