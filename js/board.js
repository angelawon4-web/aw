(function () {
  const INITIAL_SCALE = 2.5;
  const MIN_SCALE = 1.8;
  const MAX_SCALE = 3.5;
  // ../
  const photos = [
    { src: "../src/imports/img1.png", alt: "Friendship Keychains", category: "Jewelry", description: "I love to creating matching keychains to keep as a reminder of our friendship, personalizing each chain's color and charms.", left: 23.6, top: 29.3, width: 9.3, height: 19.1 },
    { src: "../src/imports/img10.png", alt: "Docs Documentary", category: "Film", description: "A documentary about a Korean immigrant doctor who shares her journey of how she immigrated to America and her struggles as she created a path for herself. Role: Director, Editor", left: 35.2, top: 30.5, width: 5.5, height: 8 },
    { src: "../src/imports/img3.png", alt: "Charm Bracelet", category: "Jewelry", description: "Designing my jewelry first starts with choosing which charms I want to use first, then laying out how I want to final product to look.", left: 43.3, top: 29.4, width: 14.1, height: 9.1 },
    { src: "../src/imports/img11.png", alt: "Until: an OS-level experience", category: "UX Design", description: "Originally for an interview challenge, I created an OS-level experience for when users reach 20% left on their mobile devices. This presentation was just the start of an idea.", left: 59.6, top: 31.5, width: 6.8, height: 11 },
    { src: "../src/imports/img12.png", alt: "Muay Thai", category: "Activity", description: "I started Muay Thai in high school and ended up joining the Muah Thai at Univesity of Michigan, where I'm not Secretary of the club. Muay Thai continues to teach me resilience, discipline, and respect through physical and mental challenges.", left: 67.3, top: 29.3, width: 9.5, height: 19.1 },
    { src: "../src/imports/img6.png", alt: "Necklace/Headpiece for Photoshoot", category: "Jewelry", description: "I handmade a necklace that I used as a headpiece for a photoshoot for MA:E Magazine, Volume 19, where it ended up as the front cover. Role: video, styler", left: 35.2, top: 41.4, width: 5.4, height: 10.2 },
    { src: "../src/imports/img15.png", alt: "Designing Portfolio Websites", category: "UX Design", description: "I designed a fully functional portfolio website on Figma that showcases pages of the individual's works, resume, and bio.", left: 59.5, top: 46.8, width: 5, height: 12.3 },
    { src: "../src/imports/img8.png", alt: "MA:E Photoshoot", category: "Film", description: "I filmed and edited a short-reel video for MA:E Magazine's Instagram for their 19th Volume.", left: 67.3, top: 52.2, width: 8.2, height: 7 },
    { src: "../src/imports/img9.png", alt: "Learning Curve: high school film", category: "Film", description: "A student-led, feature-length film about a senior girl's world turning upside down when her high school dropout dad, newly laid off, returns to high school with her to receive his diploma. Role: Head of Sound Department, sound mixer", left: 23.5, top: 55, width: 13.4, height: 18.3 },
    { src: "../src/imports/img16.png", alt: "Magnet Collection", category: "Activity", description: "My growing wall of magnets, collected from places across the U.S. and the world, is less about the magnets themselves and more about the stories behind each one. It's the same curiosity about the people and places that drives how I approach design.", left: 38.3, top: 56.6, width: 4.2, height: 15.1 },
    { src: "../src/imports/img7.png", alt: "MA:E Photoshoot", category: "Film", description: "I filmed and edited a short-reel video for MA:E Magazine's Instagram for their 20th Volume.", left: 44.5, top: 62.9, width: 4.5, height: 10 },
    { src: "../src/imports/img77.png", alt: "Keychains for Family", category: "Jewelry", description: "I created matching keychains for my family members back in Korea. Although it took a while to make it all, the ability to turn creativity into something tangible and functional became an outlet to express my ideas while considering how others used what I made.", left: 50.7, top: 61, width: 8.1, height: 12.2 },
    { src: "../src/imports/img14.png", alt: "High School Theater", category: "Activity", description: "I co-stage-managed two high school musical productions: Little Shop of Horrors and Mean Girls. As Stage Manager for my school's theater department, I led crews across lighting, sound, and set design, learning how to coordinate people, timing, and technical systems under live-performance pressure.", left: 61.6, top: 63.1, width: 15.2, height: 12.1 },
  ];

  const container = document.getElementById("board-container");
  const canvas = document.getElementById("board-canvas");
  const photosLayer = document.getElementById("board-photos");
  const modal = document.getElementById("photo-modal");
  const modalImage = document.getElementById("modal-image");
  const modalCategoryTab = document.getElementById("modal-category-tab");
  const modalCategory = document.getElementById("modal-category");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalClose = document.getElementById("modal-close");

  let pan = { x: 0, y: 0 };
  let scale = INITIAL_SCALE;
  let isDragging = false;
  let dragMoved = false;
  let dragStart = null;

  function clamp(x, y, s) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const CXMIN = 0.16;
    const CXMAX = 0.84;
    const CYMIN = 0.2;
    const CYMAX = 0.82;
    const xA = vw * (s * (0.5 - CXMIN) - 0.5);
    const xB = vw * (0.5 - s * (CXMAX - 0.5));
    const yA = vh * (s * (0.5 - CYMIN) - 0.5);
    const yB = vh * (0.5 - s * (CYMAX - 0.5));
    return {
      x: Math.max(Math.min(xA, xB), Math.min(Math.max(xA, xB), x)),
      y: Math.max(Math.min(yA, yB), Math.min(Math.max(yA, yB), y)),
    };
  }

  function applyTransform() {
    canvas.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
  }

  function renderPhotos() {
    photos.forEach((photo) => {
      const el = document.createElement("div");
      el.className = "board-photo";
      el.style.left = `${photo.left}%`;
      el.style.top = `${photo.top}%`;
      el.style.width = `${photo.width}%`;
      el.style.height = `${photo.height}%`;

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      img.draggable = false;
      el.appendChild(img);

      el.addEventListener("mousedown", (e) => e.stopPropagation());
      el.addEventListener("click", () => openModal(photo));

      photosLayer.appendChild(el);
    });
  }

  function openModal(photo) {
    modalImage.src = photo.src;
    modalImage.alt = photo.alt;
    modalCategoryTab.textContent = photo.category;
    modalCategory.textContent = photo.category;
    modalTitle.textContent = photo.alt;
    modalDescription.textContent = photo.description;
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  modal.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  container.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const delta = -e.deltaY * 0.008;
        const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta * scale));
        scale = next;
        pan = clamp(pan.x, pan.y, next);
      } else {
        pan = clamp(pan.x - e.deltaX * 1.2, pan.y - e.deltaY * 1.2, scale);
      }
      applyTransform();
    },
    { passive: false }
  );

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragMoved = false;
    dragStart = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    container.classList.add("dragging");
  });

  container.addEventListener("mousemove", (e) => {
    if (!isDragging || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved = true;
    pan = clamp(dragStart.panX + dx, dragStart.panY + dy, scale);
    applyTransform();
  });

  function endDrag() {
    isDragging = false;
    dragStart = null;
    container.classList.remove("dragging");
  }

  container.addEventListener("mouseup", endDrag);
  container.addEventListener("mouseleave", endDrag);

  document.getElementById("zoom-in").addEventListener("click", () => {
    scale = Math.min(MAX_SCALE, scale + 0.25);
    pan = clamp(pan.x, pan.y, scale);
    applyTransform();
  });

  document.getElementById("zoom-out").addEventListener("click", () => {
    scale = Math.max(MIN_SCALE, scale - 0.25);
    pan = clamp(pan.x, pan.y, scale);
    applyTransform();
  });

  document.getElementById("zoom-reset").addEventListener("click", () => {
    scale = INITIAL_SCALE;
    pan = { x: 0, y: 0 };
    applyTransform();
  });

  renderPhotos();
  applyTransform();
})();
