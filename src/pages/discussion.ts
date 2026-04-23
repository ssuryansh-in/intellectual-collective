export function getDiscussionContent() {
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
    <a class="flex items-center space-x-3 text-primary font-bold border-r-4 border-primary pl-4 py-3 bg-surface-container-high rounded-l-lg transition-all duration-300" href="/discussion" data-link>
      <span class="material-symbols-outlined fill-icon text-xl" data-icon="forum">forum</span>
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
<main class="flex-1 ml-0 md:ml-72 min-h-screen bg-surface flex flex-col pt-8 md:pt-12 px-6 md:px-12 lg:px-16 overflow-y-auto">
  <!-- Mobile Top Nav -->
  <div class="md:hidden fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md z-30 px-6 py-4 flex justify-between items-center border-b border-surface-container-low">
    <h1 class="font-headline font-bold text-lg text-primary">Discussion</h1>
    <div id="mobile-nav-actions"></div>
  </div>

  <div class="max-w-5xl w-full mx-auto md:mx-0 mt-12 md:mt-0 flex flex-col h-full pb-24">
    <!-- Header Area -->
    <header class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
      <div>
        <h2 class="font-headline text-4xl font-extrabold text-on-background tracking-tight mb-2">Discussion</h2>
        <p class="font-body text-lg text-on-surface-variant max-w-2xl">Ask questions, share knowledge, and discuss topics with your peers.</p>
      </div>
      <button id="open-ask-modal-btn" class="bg-primary text-on-primary rounded-full px-6 py-3 font-label font-bold text-sm hover:scale-105 transition-transform shadow-[0_4px_14px_0_rgba(0,72,141,0.39)] flex flex-row items-center gap-2 w-full md:w-auto justify-center">
         <span class="material-symbols-outlined text-[20px]">add</span>
         Ask Question
      </button>
    </header>
    
    <!-- Utilities Bar -->
    <div class="flex flex-col sm:flex-row gap-4 mb-8">
      <div class="relative flex-1">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
        <input type="text" id="discussion-search-input" placeholder="Search discussions..." class="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-full py-3.5 pl-12 pr-4 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-on-surface-variant/70 shadow-sm" />
      </div>
      <div class="flex gap-2 shrink-0 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide" id="discussion-tabs">
         <button data-tab="all" class="px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface font-label text-sm font-semibold whitespace-nowrap active-tab">All Questions</button>
         <button data-tab="my" class="px-5 py-2.5 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors font-label text-sm font-semibold whitespace-nowrap">My Questions</button>
         <button data-tab="unanswered" class="px-5 py-2.5 rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors font-label text-sm font-semibold whitespace-nowrap">Unanswered</button>
      </div>
    </div>
    
    <!-- Discussion Threads -->
    <div id="discussion-list" class="flex-1 flex flex-col gap-4">
      <div class="flex items-center justify-center py-16">
         <span class="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
      </div>
    </div>

  </div>
</main>

<!-- Ask Question Modal -->
<div id="ask-question-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300">
  <div class="bg-surface relative w-full max-w-2xl rounded-[1.5rem] shadow-2xl flex flex-col max-h-[90vh] border border-outline-variant/20 transform scale-95 transition-transform duration-300" id="ask-modal-content">
    
    <!-- Header -->
    <div class="flex items-center justify-between p-6 border-b border-surface-container-high">
      <h3 class="font-headline text-2xl font-bold text-on-surface">Ask a Question</h3>
      <button id="close-ask-modal-btn" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>

    <!-- Form -->
    <form id="ask-question-form" class="p-6 overflow-y-auto flex-1 space-y-5">
      <div id="ask-error-msg" class="hidden text-error font-body text-sm bg-error-container p-3 rounded-lg flex items-center gap-2"></div>
      
      <div>
        <label class="block font-label text-sm font-semibold text-on-surface mb-1.5 ml-1">Title</label>
        <input type="text" id="ask-title" required placeholder="e.g. How does React hydration work?" class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 px-4 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" />
      </div>

      <div>
        <label class="block font-label text-sm font-semibold text-on-surface mb-1.5 ml-1">Subject / Topic</label>
        <input type="text" id="ask-subject" required placeholder="e.g. Computer Science, Physics" class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 px-4 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant" />
      </div>

      <div>
        <label class="block font-label text-sm font-semibold text-on-surface mb-1.5 ml-1">Question Details</label>
        <textarea id="ask-body" required rows="5" placeholder="Explain your problem, what you've tried, and what you're stuck on..." class="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl py-3 px-4 text-sm font-body text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-shadow placeholder:text-outline-variant resize-y"></textarea>
      </div>

      <!-- Image Upload Area -->
      <div>
         <label class="block font-label text-sm font-semibold text-on-surface mb-1.5 ml-1">Attach an Image (Optional)</label>
         <div id="ask-image-dropzone" class="border-2 border-dashed border-outline-variant/50 rounded-xl py-8 px-6 text-center hover:bg-surface-container-lowest transition-colors cursor-pointer relative group bg-surface-container-low/30">
            <input type="file" id="ask-image-input" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            <div id="ask-image-preview-container" class="hidden flex flex-col items-center gap-3">
               <img id="ask-image-preview" src="" class="max-h-32 rounded-lg border border-outline-variant/30 object-contain" />
               <span class="text-sm font-label text-primary font-medium hover:underline relative z-20" id="ask-image-remove">Remove image</span>
            </div>
            <div id="ask-image-prompt" class="flex flex-col items-center">
               <div class="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:scale-110 transition-transform mb-3">
                  <span class="material-symbols-outlined text-xl">image</span>
               </div>
               <p class="font-headline font-bold text-sm text-primary mb-1">Click or drag image to upload</p>
               <p class="font-body text-xs text-on-surface-variant">PNG, JPG,, GIF up to 5MB</p>
            </div>
         </div>
      </div>

      <!-- Footer -->
      <div class="pt-6 mt-4 flex items-center justify-end gap-3 shrink-0">
         <button type="button" id="cancel-ask-btn" class="px-5 py-2.5 rounded-full font-label text-sm font-semibold text-on-surface-variant hover:bg-surface-variant transition-colors">Cancel</button>
         <button id="submit-ask-btn" type="submit" class="px-6 py-2.5 rounded-full font-label text-sm font-bold bg-primary text-on-primary hover:scale-[1.02] active:scale-95 transition-all shadow-sm shadow-primary/20 flex items-center gap-2">
           Post Question
         </button>
      </div>
    </form>

  </div>
</div>
`;
}
