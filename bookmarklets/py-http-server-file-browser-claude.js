javascript:(function(){
  // Remove existing content and styles
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  
  // Add viewport meta tag
  const meta = document.createElement('meta');
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', 'width=device-width, initial-scale=1');
  document.head.appendChild(meta);
  
  // CSS Styles
  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f7;
      color: #1d1d1f;
      overflow: hidden;
    }
    
    .toolbar {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      z-index: 100;
    }
    
    .nav-buttons {
      display: flex;
      gap: 8px;
    }
    
    .nav-btn {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .nav-btn:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    
    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    
    .breadcrumb {
      flex: 1;
      font-size: 14px;
      color: #666;
    }
    
    .search-container {
      position: relative;
      width: 240px;
    }
    
    .search-input {
      width: 100%;
      padding: 8px 36px 8px 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.8);
      font-size: 14px;
      outline: none;
    }
    
    .search-input:focus {
      border-color: #007AFF;
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
    }
    
    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
    
    .view-toggle {
      display: flex;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      padding: 2px;
    }
    
    .view-btn {
      padding: 6px 12px;
      border: none;
      background: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .view-btn.active {
      background: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    
    .main-content {
      margin-top: 60px;
      height: calc(100vh - 60px);
      overflow-y: auto;
      padding: 20px;
    }
    
    .file-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 16px;
    }
    
    .file-list {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    
    .file-item {
      background: white;
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid rgba(0, 0, 0, 0.05);
      text-decoration: none;
      color: inherit;
      display: block;
    }
    
    .file-grid .file-item {
      text-align: center;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .file-list .file-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 8px;
    }
    
    .file-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    .file-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
    
    .file-list .file-icon {
      font-size: 24px;
      margin-bottom: 0;
    }
    
    .file-name {
      font-size: 12px;
      font-weight: 500;
      text-align: center;
      word-break: break-word;
      line-height: 1.3;
    }
    
    .file-list .file-name {
      font-size: 14px;
      text-align: left;
      flex: 1;
    }
    
    .file-size {
      font-size: 11px;
      color: #666;
      margin-top: 4px;
    }
    
    .file-list .file-size {
      font-size: 12px;
      margin-top: 0;
      min-width: 60px;
      text-align: right;
    }
    
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    }
    
    .modal.show {
      display: flex;
    }
    
    .modal-content {
      background: white;
      border-radius: 16px;
      max-width: 90vw;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      position: relative;
    }
    
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .modal-title {
      font-weight: 600;
      font-size: 16px;
    }
    
    .modal-close {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    
    .modal-close:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    
    .modal-body {
      padding: 20px;
      max-height: 70vh;
      overflow: auto;
    }
    
    .preview-content {
      text-align: center;
    }
    
    .preview-content img {
      max-width: 100%;
      max-height: 60vh;
      object-fit: contain;
      border-radius: 8px;
    }
    
    .preview-content video {
      max-width: 100%;
      max-height: 60vh;
      border-radius: 8px;
    }
    
    .preview-content audio {
      width: 100%;
      max-width: 400px;
    }
    
    .preview-content pre {
      text-align: left;
      background: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      overflow: auto;
      max-height: 50vh;
      font-family: 'SF Mono', Monaco, monospace;
      font-size: 13px;
      line-height: 1.4;
    }
    
    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }
    
    .empty-state .icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }
  `;
  
  const styleEl = document.createElement('style');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
  
  // Global state
  let currentPath = '';
  let allFiles = [];
  let filteredFiles = [];
  let isListView = false;
  let history = [];
  let historyIndex = -1;
  
  // File type icons and preview support
  const fileTypes = {
    folder: { icon: '📁', preview: false },
    // Images
    jpg: { icon: '🖼️', preview: true, type: 'image' },
    jpeg: { icon: '🖼️', preview: true, type: 'image' },
    png: { icon: '🖼️', preview: true, type: 'image' },
    gif: { icon: '🖼️', preview: true, type: 'image' },
    webp: { icon: '🖼️', preview: true, type: 'image' },
    svg: { icon: '🖼️', preview: true, type: 'image' },
    // Videos
    mp4: { icon: '🎬', preview: true, type: 'video' },
    webm: { icon: '🎬', preview: true, type: 'video' },
    mov: { icon: '🎬', preview: true, type: 'video' },
    avi: { icon: '🎬', preview: true, type: 'video' },
    // Audio
    mp3: { icon: '🎵', preview: true, type: 'audio' },
    wav: { icon: '🎵', preview: true, type: 'audio' },
    ogg: { icon: '🎵', preview: true, type: 'audio' },
    // Text
    txt: { icon: '📝', preview: true, type: 'text' },
    md: { icon: '📝', preview: true, type: 'text' },
    js: { icon: '📄', preview: true, type: 'text' },
    html: { icon: '🌐', preview: true, type: 'text' },
    css: { icon: '🎨', preview: true, type: 'text' },
    json: { icon: '📋', preview: true, type: 'text' },
    py: { icon: '🐍', preview: true, type: 'text' },
    // Documents
    pdf: { icon: '📕', preview: true, type: 'pdf' },
    // Default
    default: { icon: '📄', preview: false }
  };
  
  function getFileInfo(name, isDir) {
    if (isDir) return fileTypes.folder;
    const ext = name.split('.').pop().toLowerCase();
    return fileTypes[ext] || fileTypes.default;
  }
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
  
  function createToolbar() {
    return `
      <div class="toolbar">
        <div class="nav-buttons">
          <button class="nav-btn" id="back-btn">←</button>
          <button class="nav-btn" id="forward-btn">→</button>
          <button class="nav-btn" id="up-btn">↑</button>
        </div>
        <div class="breadcrumb" id="breadcrumb"></div>
        <div class="search-container">
          <input type="text" class="search-input" id="search-input" placeholder="Search files...">
          <span class="search-icon">🔍</span>
        </div>
        <div class="view-toggle">
          <button class="view-btn" id="grid-btn">⊞</button>
          <button class="view-btn" id="list-btn">☰</button>
        </div>
      </div>
    `;
  }
  
  function createModal() {
    return `
      <div class="modal" id="preview-modal">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="modal-title"></div>
            <button class="modal-close" id="modal-close">×</button>
          </div>
          <div class="modal-body">
            <div class="preview-content" id="preview-content"></div>
          </div>
        </div>
      </div>
    `;
  }
  
  function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    const parts = currentPath.split('/').filter(p => p);
    breadcrumb.innerHTML = '🏠 ' + (parts.length ? parts.join(' / ') : 'Home');
  }
  
  function updateNavButtons() {
    document.getElementById('back-btn').disabled = historyIndex <= 0;
    document.getElementById('forward-btn').disabled = historyIndex >= history.length - 1;
    document.getElementById('up-btn').disabled = !currentPath || currentPath === '/';
  }
  
  function addToHistory(path) {
    if (history[historyIndex] !== path) {
      history = history.slice(0, historyIndex + 1);
      history.push(path);
      historyIndex = history.length - 1;
    }
  }
  
  function navigateToPath(path, addHistory = true) {
    if (addHistory) {
      addToHistory(path);
    }
    currentPath = path;
    window.location.hash = encodeURIComponent(path);
    loadDirectory();
  }
  
  async function searchFiles(query) {
    if (!query.trim()) {
      filteredFiles = allFiles;
      renderFiles();
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Search current directory
    let searchResults = allFiles.filter(file => 
      file.name.toLowerCase().includes(lowerQuery)
    );
    
    // Search subdirectories
    const searchSubfolders = async (basePath) => {
      try {
        const url = basePath ? '/' + basePath : '/';
        const response = await fetch(url);
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a[href]');
        
        for (const link of links) {
          const href = link.getAttribute('href');
          if (href === '../') continue;
          
          const name = decodeURIComponent(href.replace(/\/$/, ''));
          const isDir = href.endsWith('/');
          const fullPath = basePath ? basePath + '/' + name : name;
          
          if (name.toLowerCase().includes(lowerQuery)) {
            const fileInfo = getFileInfo(name, isDir);
            let size = '';
            if (!isDir) {
              const sizeText = link.parentNode.textContent.match(/\s+(\d+)\s*$/);
              if (sizeText) {
                size = formatFileSize(parseInt(sizeText[1]));
              }
            }
            
            searchResults.push({
              name: fullPath,
              href: isDir ? '/' + fullPath + '/' : '/' + fullPath,
              isDir,
              icon: fileInfo.icon,
              canPreview: fileInfo.preview,
              type: fileInfo.type,
              size
            });
          }
          
          // Recursively search subdirectories (limit depth to avoid infinite loops)
          if (isDir && basePath.split('/').length < 3) {
            await searchSubfolders(fullPath);
          }
        }
      } catch (error) {
        // Silently ignore errors in subdirectories
      }
    };
    
    // Search up to 3 levels deep
    for (const file of allFiles) {
      if (file.isDir) {
        const subPath = currentPath ? currentPath + '/' + file.name : file.name;
        await searchSubfolders(subPath);
      }
    }
    
    // Remove duplicates and sort
    const uniqueResults = searchResults.filter((item, index, self) => 
      index === self.findIndex(t => t.name === item.name)
    );
    
    uniqueResults.sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.name.localeCompare(b.name);
    });
    
    filteredFiles = uniqueResults;
    renderFiles();
  }
  
  async function loadDirectory() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
      const url = currentPath ? '/' + currentPath : '/';
      const response = await fetch(url);
      const html = await response.text();
      
      // Parse directory listing
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('a[href]');
      
      allFiles = [];
      
      for (const link of links) {
        const href = link.getAttribute('href');
        if (href === '../') continue;
        
        const name = decodeURIComponent(href.replace(/\/$/, ''));
        const isDir = href.endsWith('/');
        const fileInfo = getFileInfo(name, isDir);
        
        // Get file size if available
        let size = '';
        const sizeText = link.parentNode.textContent.match(/\s+(\d+)\s*$/);
        if (sizeText && !isDir) {
          size = formatFileSize(parseInt(sizeText[1]));
        }
        
        allFiles.push({
          name,
          href: isDir ? href : '/' + (currentPath ? currentPath + '/' : '') + href,
          isDir,
          icon: fileInfo.icon,
          canPreview: fileInfo.preview,
          type: fileInfo.type,
          size
        });
      }
      
      // Sort: directories first, then files
      allFiles.sort((a, b) => {
        if (a.isDir && !b.isDir) return -1;
        if (!a.isDir && b.isDir) return 1;
        return a.name.localeCompare(b.name);
      });
      
      filteredFiles = allFiles;
      renderFiles();
      updateBreadcrumb();
      updateNavButtons();
      
    } catch (error) {
      mainContent.innerHTML = '<div class="empty-state"><div class="icon">⚠️</div><div>Error loading directory</div></div>';
    }
  }
  
  function renderFiles() {
    const mainContent = document.getElementById('main-content');
    
    if (filteredFiles.length === 0) {
      mainContent.innerHTML = '<div class="empty-state"><div class="icon">📂</div><div>No files found</div></div>';
      return;
    }
    
    const containerClass = isListView ? 'file-list' : 'file-grid';
    let html = `<div class="${containerClass}">`;
    
    for (const file of filteredFiles) {
      const clickAction = file.isDir ? 
        `onclick="navigateToPath('${currentPath ? currentPath + '/' : ''}${file.name}')"` :
        (file.canPreview ? `onclick="showPreview('${file.name}', '${file.href}', '${file.type}')"` : `href="${file.href}"`);
      
      html += `
        <a class="file-item" ${file.isDir || file.canPreview ? clickAction : `href="${file.href}"`}>
          <div class="file-icon">${file.icon}</div>
          <div class="file-name">${file.name}</div>
          ${file.size ? `<div class="file-size">${file.size}</div>` : ''}
        </a>
      `;
    }
    
    html += '</div>';
    mainContent.innerHTML = html;
  }
  
  async function showPreview(name, href, type) {
    const modal = document.getElementById('preview-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('preview-content');
    
    // Update current preview index
    updatePreviewableFiles();
    currentPreviewIndex = previewableFiles.findIndex(file => file.name === name || file.name.endsWith('/' + name));
    
    title.textContent = name;
    content.innerHTML = '<div class="loading">Loading preview...</div>';
    modal.classList.add('show');
    
    try {
      if (type === 'image') {
        content.innerHTML = `<img src="${href}" alt="${name}">`;
      } else if (type === 'video') {
        content.innerHTML = `<video controls><source src="${href}"></video>`;
      } else if (type === 'audio') {
        content.innerHTML = `<audio controls><source src="${href}"></audio>`;
      } else if (type === 'text') {
        const response = await fetch(href);
        const text = await response.text();
        const escapedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        content.innerHTML = `<pre>${escapedText}</pre>`;
      } else if (type === 'pdf') {
        content.innerHTML = `<embed src="${href}" type="application/pdf" width="100%" height="600px">`;
      }
    } catch (error) {
      content.innerHTML = '<div class="empty-state"><div class="icon">⚠️</div><div>Error loading preview</div></div>';
    }
  }
  
  function closeModal() {
    document.getElementById('preview-modal').classList.remove('show');
  }
  
  // Initialize the app
  document.body.innerHTML = createToolbar() + '<div class="main-content" id="main-content"></div>' + createModal();
  
  // Event listeners
  document.getElementById('back-btn').onclick = () => {
    if (historyIndex > 0) {
      historyIndex--;
      navigateToPath(history[historyIndex], false);
    }
  };
  
  document.getElementById('forward-btn').onclick = () => {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      navigateToPath(history[historyIndex], false);
    }
  };
  
  document.getElementById('up-btn').onclick = () => {
    if (currentPath) {
      const parentPath = currentPath.split('/').slice(0, -1).join('/');
      navigateToPath(parentPath);
    }
  };
  
  let searchTimeout;
  document.getElementById('search-input').oninput = (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchFiles(e.target.value);
    }, 300); // Debounce search to avoid too many requests
  };
  
  document.getElementById('grid-btn').onclick = () => {
    isListView = false;
    document.getElementById('grid-btn').classList.add('active');
    document.getElementById('list-btn').classList.remove('active');
    renderFiles();
  };
  
  document.getElementById('list-btn').onclick = () => {
    isListView = true;
    document.getElementById('list-btn').classList.add('active');
    document.getElementById('grid-btn').classList.remove('active');
    renderFiles();
  };
  
  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('preview-modal').onclick = (e) => {
    if (e.target.id === 'preview-modal') closeModal();
  };
  
  // Keyboard navigation for modal
  let currentPreviewIndex = -1;
  let previewableFiles = [];
  
  function updatePreviewableFiles() {
    previewableFiles = filteredFiles.filter(file => file.canPreview && !file.isDir);
  }
  
  function showPreviewByIndex(index) {
    if (index >= 0 && index < previewableFiles.length) {
      currentPreviewIndex = index;
      const file = previewableFiles[index];
      showPreview(file.name, file.href, file.type);
    }
  }
  
  document.onkeydown = (e) => {
    if (document.getElementById('preview-modal').classList.contains('show')) {
      e.preventDefault();
      
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentPreviewIndex > 0) {
          showPreviewByIndex(currentPreviewIndex - 1);
        }
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentPreviewIndex < previewableFiles.length - 1) {
          showPreviewByIndex(currentPreviewIndex + 1);
        }
      }
    }
  };
  
  // Hash navigation
  window.onhashchange = () => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash !== currentPath) {
      currentPath = hash;
      loadDirectory();
    }
  };
  
  // Initialize
  currentPath = decodeURIComponent(window.location.hash.slice(1)) || '';
  document.getElementById('grid-btn').classList.add('active');
  addToHistory(currentPath);
  loadDirectory();
  
  // Global functions for inline event handlers
  window.navigateToPath = navigateToPath;
  window.showPreview = showPreview;
  
})();
