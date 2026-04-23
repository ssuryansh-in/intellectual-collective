export const fetchSavedLogic = `  // Define data fetcher for saved resources
  if (path === '/saved' && isLoggedIn) {
    const savedList = document.getElementById('saved-list');
    
    // We don't have search implemented efficiently for saved on backend, so we'll do client-side filtering if needed, 
    // but a basic search input might exist in nav. Let's assume no search or basic fetch for now.
    const fetchSaved = () => {
      if (!savedList) return;
      
      fetch('/api/resources/saved', {
        headers: { 'Authorization': \`Bearer \${token}\` }
      })
      .then(res => res.json())
      .then(data => {
        if(data.length === 0) {
          savedList.innerHTML = \`<p class="font-body text-on-surface-variant p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/10">You haven't saved any resources yet.</p>\`;
        } else {
          savedList.innerHTML = data.map((r: any) => \`
            <article class="group bg-surface-container-lowest rounded-xl p-5 hover:bg-surface-container-low transition-colors duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center gap-5 relative border border-outline-variant/10">
              <div class="w-12 h-12 rounded-lg bg-primary-fixed flex-shrink-0 flex items-center justify-center text-on-primary-fixed">
                <span class="material-symbols-outlined">description</span>
              </div>
              <div class="flex-1">
                <h4 class="font-headline text-lg font-bold text-primary mb-1 group-hover:text-primary-container transition-colors">\${r.title}</h4>
                <div class="flex flex-wrap items-center gap-3 text-xs font-label text-on-surface-variant">
                  <span class="flex items-center"><span class="material-symbols-outlined text-[14px] mr-1">person</span> \${r.uploader ? r.uploader.fullName : 'Unknown'}</span>
                  <span>•</span>
                  <span>Added \${new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div class="flex items-center gap-2 mt-4 sm:mt-0 z-10 relative">
                <span class="px-2.5 py-1 rounded bg-tertiary-container/10 text-tertiary text-xs font-medium mr-2">\${r.subject}</span>
                <button class="preview-resource-btn w-8 h-8 rounded-full hover:bg-surface-variant flex items-center justify-center text-outline transition-colors" data-url="\${r.fileUrl}" data-title="\${r.title}" title="Preview Resource">
                  <span class="material-symbols-outlined text-sm">visibility</span>
                </button>
                <a href="\${r.fileUrl}" target="_blank" class="w-8 h-8 rounded-full hover:bg-surface-variant flex items-center justify-center text-outline transition-colors" title="Download Resource">
                  <span class="material-symbols-outlined text-sm">download</span>
                </a>
                <button class="toggle-save-btn w-8 h-8 rounded-full flex items-center justify-center transition-colors text-primary bg-primary-container hover:bg-primary-container/80" data-id="\${r._id}" title="Remove from Bookmarks">
                  <span class="material-symbols-outlined text-sm fill-icon">bookmark</span>
                </button>
              </div>
            </article>
          \`).join('');

          // Re-attach preview and download listeners
          const newPreviewBtns = savedList.querySelectorAll('.preview-resource-btn');
          newPreviewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
               e.stopPropagation();
               const parentDataset = (btn as HTMLElement).dataset;
               const url = parentDataset.url || '';
               const title = parentDataset.title || 'Resource';
               openPreviewModal(url, title);
            });
          });

          // Un-save button logic
          const saveBtns = savedList.querySelectorAll('.toggle-save-btn');
          saveBtns.forEach(btn => {
            btn.addEventListener('click', async (e) => {
              e.stopPropagation();
              const resourceId = (btn as HTMLElement).dataset.id;
              if (resourceId) {
                try {
                  const res = await fetch(\`/api/resources/\${resourceId}/save\`, {
                    method: 'POST',
                    headers: { 'Authorization': \`Bearer \${token}\` }
                  });
                  if (res.ok) {
                    const data = await res.json();
                    localStorage.setItem('peerlearn_user', JSON.stringify(data.user));
                    fetchSaved(); // re-fetch the list
                  }
                } catch (err) {
                  console.error("Failed to toggle save", err);
                }
              }
            });
          });
        }
      })
      .catch(e => {
        savedList.innerHTML = \`<p class="text-error font-body">Failed to load saved resources.</p>\`;
      });
    };

    fetchSaved();
  }
`;
