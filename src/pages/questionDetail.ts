export function getQuestionDetailContent() {
  return `
<!-- SideNavBar Component -->
<nav class="fixed left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 space-y-4 bg-surface-container-low border-r border-surface-container-highest z-40 hidden md:flex transition-all duration-300">
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
  <div class="px-4 py-6" id="nav-actions"></div>
  <div class="pt-4 mt-auto border-t border-surface-container-highest space-y-1">
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-2 hover:bg-surface-container-high rounded-lg transition-all duration-300" href="/settings" data-link>
      <span class="material-symbols-outlined text-lg">settings</span>
      <span class="font-label text-sm">Settings</span>
    </a>
  </div>
</nav>

<!-- Main Canvas -->
<main class="flex-1 ml-0 md:ml-72 min-h-screen bg-surface flex flex-col pt-8 md:pt-12 px-6 md:px-12 lg:px-16 overflow-y-auto">
  <!-- Mobile Top Nav -->
  <div class="md:hidden fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md z-30 px-6 py-4 flex justify-between items-center border-b border-surface-container-low">
    <a href="/discussion" data-link class="flex items-center text-primary font-bold">
      <span class="material-symbols-outlined mr-2">arrow_back</span> Back
    </a>
  </div>

  <div class="max-w-4xl w-full mx-auto md:mx-0 mt-12 md:mt-0 flex flex-col h-full pb-24">
    <!-- Back Link -->
    <a href="/discussion" data-link class="hidden md:inline-flex items-center text-on-surface-variant hover:text-primary transition-colors font-label font-semibold text-sm mb-6 w-max">
      <span class="material-symbols-outlined text-lg mr-1.5">arrow_back</span>
      Back to Discussions
    </a>

    <!-- Container for dynamic content -->
    <div id="question-detail-container" class="flex flex-col gap-8">
       <div class="flex items-center justify-center py-24">
         <span class="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
       </div>
    </div>
  </div>
</main>
`;
}
