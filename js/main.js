(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (menuOverlay) menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        mobileMenu.classList.add('open');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const currentPath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/index\.html$/, '').replace(/\/$/, '');
    if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
      link.classList.add('active');
    }
  });

  const tocContainer = document.getElementById('toc-list');
  const articleContent = document.getElementById('article-content');

  if (tocContainer && articleContent) {
    const headings = articleContent.querySelectorAll('h2[id], h3[id]');

    headings.forEach((heading) => {
      const item = document.createElement('a');
      item.href = '#' + heading.id;
      item.className = 'toc-item';
      item.textContent = heading.textContent;
      if (heading.tagName === 'H3') {
        item.style.paddingLeft = '24px';
        item.style.fontSize = '0.8rem';
      }
      tocContainer.appendChild(item);
    });

    const tocItems = tocContainer.querySelectorAll('.toc-item');

    function updateTocHighlight() {
      let currentId = '';
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) {
          currentId = heading.id;
        }
      });
      tocItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === '#' + currentId);
      });
    }

    window.addEventListener('scroll', updateTocHighlight);
    updateTocHighlight();
  }

  const categoryBtns = document.querySelectorAll('.category-pill');
  const gameCards = document.querySelectorAll('[data-category]');

  if (categoryBtns.length && gameCards.length) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        categoryBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        gameCards.forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();
      document.querySelectorAll('.searchable-item').forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    });
  }

  document.querySelectorAll('pre code').forEach((block) => {
    const btn = document.createElement('button');
    btn.textContent = '複製';
    btn.style.position = 'absolute';
    btn.style.top = '8px';
    btn.style.right = '8px';
    btn.style.padding = '2px 8px';
    btn.style.fontSize = '0.7rem';
    btn.style.borderRadius = '4px';
    btn.style.background = '#6366f1';
    btn.style.color = '#fff';
    btn.style.cursor = 'pointer';
    btn.style.border = 'none';
    btn.style.opacity = '0';
    btn.style.transition = 'opacity 0.2s';

    const parent = block.parentElement;
    parent.style.position = 'relative';
    parent.appendChild(btn);

    parent.addEventListener('mouseenter', () => (btn.style.opacity = '1'));
    parent.addEventListener('mouseleave', () => (btn.style.opacity = '0'));

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        btn.textContent = '已複製!';
        setTimeout(() => (btn.textContent = '複製'), 1500);
      });
    });
  });

  if (!('loading' in HTMLImageElement.prototype)) {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      img.src = img.dataset.src;
    });
  }
})();
