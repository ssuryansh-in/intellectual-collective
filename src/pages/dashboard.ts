export function getDashboardContent() {
  return `
<!-- SideNavBar Component -->
<nav class="fixed left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 space-y-4 bg-surface-container-low border-r border-surface-container-highest z-40 hidden md:flex transition-all duration-300">
  <!-- Main Navigation -->
  <div class="flex-1 space-y-2">
    <a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-3 bg-surface-container-high rounded-l-lg transition-all duration-300" href="/dashboard" data-link>
      <span class="material-symbols-outlined fill-icon text-xl" data-icon="book_2">book_2</span>
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
    <h1 class="font-headline font-bold text-lg text-primary">Library</h1>
    <div id="mobile-nav-actions"></div>
  </div>

  <!-- Center Content Area -->
  <div class="flex-1 px-6 md:px-12 lg:px-16 py-8 md:py-12 max-w-5xl overflow-y-auto">
    <!-- Header & Search -->
    <header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h2 class="font-headline text-4xl md:text-5xl font-extrabold text-on-background tracking-tight mb-2">The Atheneum</h2>
        <p class="font-body text-lg text-on-surface-variant max-w-xl">Curated literature and foundational texts for the undergraduate collective.</p>
      </div>
      <div class="relative w-full md:w-80 group">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
        <input id="dashboard-search-input" class="w-full bg-surface-container-low border-none rounded-full py-3.5 pl-12 pr-4 text-sm font-body text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 transition-shadow" placeholder="Search the archives..." type="text"/>
      </div>
    </header>

    <!-- Highlighted Action Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
       <a href="/matches" data-link class="group bg-primary text-on-primary p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
          <div>
            <h4 class="font-headline font-bold text-xl mb-1">Find Study Partners</h4>
            <p class="font-body text-sm opacity-90">Matched based on your skills</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-on-primary/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span class="material-symbols-outlined text-3xl">handshake</span>
          </div>
       </a>
       <a href="/discussion" data-link class="group bg-secondary-container text-on-secondary-container p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all">
          <div>
            <h4 class="font-headline font-bold text-xl mb-1">Join the Collective</h4>
            <p class="font-body text-sm opacity-90">Discuss & answer questions</p>
          </div>
          <div class="w-12 h-12 rounded-full bg-on-secondary-container/10 flex items-center justify-center group-hover:-rotate-12 transition-transform">
            <span class="material-symbols-outlined text-3xl">forum</span>
          </div>
       </a>
    </div>

    <!-- Recent Resources List -->
    <section>
      <h3 class="font-headline text-2xl font-bold text-on-background mb-8">Recently Added</h3>
      <div id="resources-list" class="space-y-4">
        <!-- Skeleton -->
        <div class="animate-pulse flex space-x-4 bg-surface-container-lowest p-6 rounded-xl">
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

  <!-- Right Sidebar: Contribute Form -->
  <aside class="w-full lg:w-96 bg-surface-container-low lg:border-l border-surface-container-highest flex-shrink-0 min-h-screen">
    <div class="sticky top-0 p-8 lg:p-10 h-screen overflow-y-auto">
      <div class="mb-10">
        <h3 class="font-headline text-xl font-bold text-on-background mb-2">Contribute to the Atheneum</h3>
        <p class="font-body text-sm text-on-surface-variant">Upload scholarly articles, lecture notes, or textbook excerpts to expand the collective knowledge base.</p>
      </div>

      <form id="upload-form" class="space-y-6">
        <div id="upload-error" class="hidden text-error font-body text-[13px] bg-error-container p-3 rounded-lg"></div>
        <div id="upload-success" class="hidden text-on-secondary-container font-body text-[13px] bg-secondary-container p-3 rounded-lg"></div>

        <!-- Dropzone / File Label -->
        <label for="resource-file" class="block border-2 border-dashed border-outline-variant rounded-xl p-8 text-center hover:bg-surface-container-lowest transition-colors cursor-pointer group">
          <div class="w-12 h-12 rounded-full bg-surface-variant text-on-surface-variant mx-auto flex items-center justify-center mb-4 group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
            <span class="material-symbols-outlined">upload</span>
          </div>
          <p class="font-label text-sm font-semibold text-on-background mb-1">Click to upload or drag & drop</p>
          <p id="file-name-display" class="font-body text-xs text-on-surface-variant">PDF, EPUB, or DOCX (max. 50MB)</p>
          <input type="file" id="resource-file" required class="hidden" />
        </label>

        <!-- Form Fields -->
        <div class="space-y-4">
          <div>
            <label class="block font-label text-xs font-semibold text-on-background mb-1.5 ml-1">Resource Title</label>
            <input id="resource-title" required class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg py-2.5 px-3 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" placeholder="e.g., The Wealth of Nations" type="text"/>
          </div>
          <div>
            <label class="block font-label text-xs font-semibold text-on-background mb-1.5 ml-1">Discipline</label>
            <div class="relative">
              <select id="resource-subject" required class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg py-2.5 pl-3 pr-10 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow appearance-none">
                <option disabled selected value="">Select discipline...</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Engineering">Engineering</option>
                <option value="History">History</option>
                <option value="Humanities">Humanities</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Natural Sciences">Natural Sciences</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Psychology">Psychology</option>
                <option value="Political Science">Political Science</option>
                <option value="Sociology">Sociology</option>
                <option value="Other">Other</option>
              </select>
              <span class="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-sm">expand_more</span>
            </div>
            <div id="resource-subject-other-container" class="mt-2 hidden">
              <input id="resource-subject-other" class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg py-2.5 px-3 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" placeholder="Type discipline..." type="text"/>
            </div>
          </div>
          <div>
            <label class="block font-label text-xs font-semibold text-on-background mb-1.5 ml-1">Abstract / Notes (Optional)</label>
            <textarea id="resource-desc" class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg py-2.5 px-3 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant resize-none" placeholder="Brief description of the text..." rows="3"></textarea>
          </div>
        </div>

        <button type="submit" id="upload-btn" class="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full py-3 px-4 font-label font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-[0_4px_20px_rgba(0,72,141,0.15)] flex items-center justify-center gap-2">
           Submit Resource
        </button>
        <p class="text-center font-body text-[10px] text-on-surface-variant mt-3 px-4">By submitting, you confirm you have the right to share this material within the collective.</p>
      </form>
    </div>
  </aside>
</main>
  `;
}
