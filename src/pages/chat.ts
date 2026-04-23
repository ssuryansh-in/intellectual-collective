export function getChatContent(userId: string) {
  return `
<!-- SideNavBar Component -->
<nav class="fixed left-0 top-0 h-full w-72 flex flex-col pt-20 pb-8 px-6 space-y-4 bg-surface-container-low border-r border-surface-container-highest z-40 hidden md:flex transition-all duration-300">
  <div class="flex-1 space-y-2">
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/dashboard" data-link>
      <span class="material-symbols-outlined text-xl">book_2</span>
      <span class="font-label font-semibold tracking-wide text-sm">Library</span>
    </a>
    <a class="flex items-center space-x-3 text-on-surface-variant hover:text-primary pl-4 py-3 hover:bg-surface-container-high rounded-l-lg transition-all duration-300" href="/matches" data-link>
      <span class="material-symbols-outlined text-xl">handshake</span>
      <span class="font-label font-semibold tracking-wide text-sm">Study Matches</span>
    </a>
  </div>
</nav>

<!-- Main Canvas -->
<main class="flex-1 ml-0 md:ml-72 h-screen flex flex-col bg-surface overflow-hidden">
  
  <header class="bg-surface-container-low px-6 py-4 flex items-center gap-4 border-b border-surface-container-highest shrink-0 shadow-sm z-10 pt-[72px] md:pt-4 transition-colors">
     <button id="chat-back" class="w-10 h-10 rounded-full hover:bg-surface-variant text-on-surface flex items-center justify-center transition-colors">
        <span class="material-symbols-outlined">arrow_back</span>
     </button>
     <div class="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-lg uppercase" id="chat-avatar">U</div>
     <div class="flex-1">
       <h1 class="font-headline font-bold text-lg text-on-surface leading-tight" id="chat-user-name">Loading...</h1>
       <div class="font-body text-xs text-on-surface-variant flex items-center gap-1">
         <span class="w-2 h-2 rounded-full bg-success inline-block"></span> Active
       </div>
     </div>
     <button id="block-user-btn" class="p-2 rounded-full hover:bg-error/10 text-error/60 hover:text-error transition-all" title="Block User">
        <span class="material-symbols-outlined">block</span>
     </button>
  </header>

  <div id="chat-messages" class="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-surface dark:bg-surface-container-lowest">
    <!-- Messages injected here -->
    <div class="flex justify-center"><p class="text-xs text-on-surface-variant">Loading conversation...</p></div>
  </div>

  <div class="shrink-0 p-4 bg-surface-container-lowest border-t border-surface-container-highest">
    <form id="chat-form" class="max-w-4xl mx-auto flex items-end gap-2 bg-surface-container-low p-2 py-2 pr-2 border-outline-variant/30 border rounded-2xl focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-sm">
      <textarea id="chat-input" rows="1" class="w-full bg-transparent resize-none py-2 px-3 text-sm font-body text-on-surface placeholder:text-outline outline-none" placeholder="Type a message..."></textarea>
      <button type="submit" class="shrink-0 bg-primary w-10 h-10 rounded-xl flex items-center justify-center text-on-primary hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
        <span class="material-symbols-outlined text-[20px] -ml-1">send</span>
      </button>
    </form>
  </div>
</main>
  `;
}
