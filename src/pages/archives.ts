export function getArchivesContent() {
  return `
<!-- SideNavBar Component -->
<nav class="fixed left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 space-y-4 bg-surface-container-low border-r border-surface-container-highest z-40 hidden md:flex transition-all duration-300">
  <!-- Main Navigation -->
  <div class="flex-1 space-y-2">
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/dashboard" data-link>
      <span class="material-symbols-outlined text-xl" data-icon="book_2">book_2</span>
      <span class="font-label font-semibold tracking-wide text-sm">Library</span>
    </a>
    <a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-3 bg-surface-container-high rounded-l-lg transition-all duration-300" href="/archives" data-link>
      <span class="material-symbols-outlined fill-icon text-xl" data-icon="auto_stories">auto_stories</span>
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
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-300" href="/settings" data-link>
      <span class="material-symbols-outlined text-lg" data-icon="settings">settings</span>
      <span class="font-label text-sm">Settings</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-300" href="#">
      <span class="material-symbols-outlined text-lg" data-icon="help">help</span>
      <span class="font-label text-sm">Support</span>
    </a>
  </div>
</nav>

<!-- Main Canvas -->
<main class="flex-1 ml-0 md:ml-72 min-h-screen bg-surface flex flex-col lg:flex-row relative">
  <!-- Mobile Top Nav -->
  <div class="md:hidden sticky top-0 bg-surface/80 backdrop-blur-md z-30 px-6 py-4 flex justify-between items-center border-b border-surface-container-low">
    <h1 class="font-headline font-bold text-lg text-primary">Archives</h1>
    <div id="mobile-nav-actions"></div>
  </div>

  <!-- Center Content Area -->
  <div class="flex-1 px-6 md:px-12 lg:px-16 py-8 md:py-12 max-w-5xl overflow-y-auto w-full">
    <!-- Header & Search -->
    <header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 class="font-headline text-4xl md:text-5xl font-extrabold text-on-background tracking-tight mb-2">Your Archives</h2>
        <p class="font-body text-lg text-on-surface-variant max-w-xl">A private vault of your contributed documents, notes, and uploaded literature.</p>
      </div>
      <div class="relative w-full md:w-80 group">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
        <input id="archives-search-input" class="w-full bg-surface-container-low border-none rounded-full py-3.5 pl-12 pr-4 text-sm font-body text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-shadow" placeholder="Search your archives..." type="text"/>
      </div>
    </header>

    <!-- Recent Resources List -->
    <section>
      <div id="archives-list" class="space-y-4">
        <!-- Skeleton -->
        <div class="animate-pulse flex space-x-4 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
          <div class="rounded-full bg-surface-container-high h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-surface-container-high rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-surface-container-high rounded"></div>
              <div class="h-4 bg-surface-container-high rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
  `;
}
