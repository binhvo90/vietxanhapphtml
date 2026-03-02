
  const showPageLoading = (keepVisible = false) => {
    const loading = document.getElementById('page-loading');
    if (!loading) return;
    loading.classList.remove('hidden');
    loading.style.display = 'flex';
    if (!keepVisible) {
      setTimeout(() => hidePageLoading(), 450);
    }
  };

  const hidePageLoading = () => {
    const loading = document.getElementById('page-loading');
    if (!loading) return;
    loading.classList.add('hidden');
    setTimeout(() => {
      loading.style.display = 'none';
    }, 320);
  };

  window.addEventListener('load', () => {
    setTimeout(() => hidePageLoading(), 350);
  });

  const buildMenuHref = (targetId) => {
    const slug = sectionRouteMap[targetId] || targetId;
    const path = window.location.pathname.replace(/\/+/g, '/');

    const pagesRoot = path.includes('/pages/')
      ? path.split('/pages/')[0] + '/pages'
      : path.replace(/\/index\.html$/, '') + '/pages';

    return `${pagesRoot}/${slug}/index.html`.replace(/\/+/g, '/');
  };

  document.addEventListener('click', (event) => {
    const navLink = event.target.closest('.sidebar .nav-link[data-target]');
    if (!navLink) return;

    const targetId = navLink.getAttribute('data-target');
    if (!targetId) return;

    event.preventDefault();
    const nextHref = buildMenuHref(targetId);
    if (window.location.pathname.replace(/\/+/g, '/') !== nextHref) {
      showPageLoading(true);
      window.location.href = nextHref;
    }
  }, true);

  const noticeViewButtons = document.querySelectorAll('.js-notice-view');
  const noticeDetailTitle = document.getElementById('noticeDetailTitle');

  noticeViewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!noticeDetailTitle) return;
      noticeDetailTitle.textContent = button.getAttribute('data-notice-title') || 'Chi tiết thông báo';
    });
  });

  const menuItems = document.querySelectorAll('.js-menu');
  const sections = document.querySelectorAll('.content-section');
  const pageTitle = document.getElementById('page-title');


  const sectionRouteMap = {
    'dashboard-section': 'trang-chinh',
    'feedback-section': 'phan-anh-gop-y',
    'contractor-section': 'dang-ky-khach-nha-thau',
    'personal-section': 'thong-tin-ca-nhan',
    'salary-advance-section': 'tam-ung-luong',
    'attendance-overtime-section': 'tang-ca',
    'attendance-check-section': 'kiem-tra-cong',
    'attendance-confirm-section': 'xac-nhan-cong',
    'attendance-leave-section': 'xin-nghi-phep',
    'approval-leave-section': 'duyet-nghi-phep',
    'approval-confirm-section': 'duyet-xac-nhan-cong',
    'salary-table-section': 'xem-bang-luong',
    'system-log-section': 'nhat-ky-he-thong',
    'fuel-report-section': 'bao-cao-nhien-lieu',
    'fuel-request-section': 'de-nghi-cap-nhien-lieu',
    'gate-ticket-section': 'lap-phieu-ra-cong',
    'gnvc-repair-request-section': 'ke-hoach-sua-chua',
    'gnvc-patrol-section': 'tuan-tra-bao-ve',
    'survey-program-section': 'chuong-trinh-khao-sat'
  };

  const routeSectionMap = Object.fromEntries(
    Object.entries(sectionRouteMap).map(([sectionId, slug]) => [slug, sectionId])
  );
  menuItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();

      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      item.classList.add('active');

      if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
      if (nestedSubmenu) nestedSubmenu.classList.remove('show');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));

      const targetId = item.getAttribute('data-target');
      sections.forEach((section) => {
        section.classList.toggle('d-none', section.id !== targetId);
      });

      pageTitle.textContent = item.getAttribute('data-title') || item.textContent.trim();
    });
  });

  const attendanceMain = document.querySelector('.js-attendance-main');
  const attendanceSubmenu = document.querySelector('.attendance-submenu');
  const attendanceSubItems = document.querySelectorAll('.js-attendance-sub');

  if (attendanceMain && attendanceSubmenu) {
    attendanceMain.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      attendanceMain.classList.add('active');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceSubmenu.classList.toggle('show');

      if (!attendanceSubmenu.classList.contains('show') && nestedSubmenu) {
        nestedSubmenu.classList.remove('show');
      }
    });
  }

  attendanceSubItems.forEach((subItem) => {
    subItem.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      attendanceMain.classList.add('active');
      attendanceSubmenu.classList.add('show');
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));

      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      const attendanceApproveSubItems = document.querySelectorAll('.js-attendance-approve-sub');
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      subItem.classList.add('active-sub');

      const targetId = subItem.getAttribute('data-target');
      sections.forEach((section) => {
        section.classList.toggle('d-none', section.id !== targetId);
      });

      pageTitle.textContent = subItem.getAttribute('data-title') || subItem.textContent.trim();
    });
  });

  const attendanceApproveMain = document.querySelector('.js-attendance-approve-main');
  const nestedSubmenu = document.querySelector('.nested-submenu');
  const attendanceApproveSubItems = document.querySelectorAll('.js-attendance-approve-sub');

  if (attendanceApproveMain && nestedSubmenu) {
    attendanceApproveMain.addEventListener('click', (event) => {
      event.preventDefault();
      nestedSubmenu.classList.toggle('show');
      attendanceSubmenu.classList.add('show');
      attendanceMain.classList.add('active');
    });
  }

  attendanceApproveSubItems.forEach((subItem) => {
    subItem.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      attendanceMain.classList.add('active');
      attendanceSubmenu.classList.add('show');
      nestedSubmenu.classList.add('show');
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));

      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      subItem.classList.add('active-sub');

      const targetId = subItem.getAttribute('data-target');
      sections.forEach((section) => {
        section.classList.toggle('d-none', section.id !== targetId);
      });

      pageTitle.textContent = subItem.getAttribute('data-title') || subItem.textContent.trim();
    });
  });

  const fuelMain = document.querySelector('.js-fuel-main');
  const fuelSubmenu = document.querySelector('.fuel-submenu');
  const fuelSubItems = document.querySelectorAll('.js-fuel-sub');

  if (fuelMain && fuelSubmenu) {
    fuelMain.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      if (attendanceMain) attendanceMain.classList.remove('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
      if (nestedSubmenu) nestedSubmenu.classList.remove('show');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      fuelMain.classList.add('active');
      fuelSubmenu.classList.toggle('show');
    });
  }

  fuelSubItems.forEach((subItem) => {
    subItem.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      if (attendanceMain) attendanceMain.classList.remove('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
      if (nestedSubmenu) nestedSubmenu.classList.remove('show');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));

      fuelMain.classList.add('active');
      fuelSubmenu.classList.add('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      subItem.classList.add('active-sub');

      const targetId = subItem.getAttribute('data-target');
      sections.forEach((section) => {
        section.classList.toggle('d-none', section.id !== targetId);
      });

      pageTitle.textContent = subItem.getAttribute('data-title') || subItem.textContent.trim();
    });
  });

  const gateMain = document.querySelector('.js-gate-main');
  const gateSubmenu = document.querySelector('.gate-submenu');
  const gateSubItems = document.querySelectorAll('.js-gate-sub');

  if (gateMain && gateSubmenu) {
    gateMain.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      if (attendanceMain) attendanceMain.classList.remove('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
      if (nestedSubmenu) nestedSubmenu.classList.remove('show');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));
      gateMain.classList.add('active');
      gateSubmenu.classList.toggle('show');
    });
  }

  gateSubItems.forEach((subItem) => {
    subItem.addEventListener('click', (event) => {
      event.preventDefault();
      menuItems.forEach((m) => m.classList.remove('active'));
      const trainingLink = document.querySelector('.js-training-link');
      if (trainingLink) trainingLink.classList.remove('active');
      if (attendanceMain) attendanceMain.classList.remove('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
      if (nestedSubmenu) nestedSubmenu.classList.remove('show');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));

      gateMain.classList.add('active');
      gateSubmenu.classList.add('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));
      subItem.classList.add('active-sub');

      const targetId = subItem.getAttribute('data-target');
      sections.forEach((section) => {
        section.classList.toggle('d-none', section.id !== targetId);
      });

      pageTitle.textContent = subItem.getAttribute('data-title') || subItem.textContent.trim();
    });
  });


  const gateItemsBody = document.getElementById('gate-items-body');
  const gateSubmitBtn = document.getElementById('gate-submit-btn');
  const gateImageUploadBtn = document.getElementById('gate-image-upload-btn');
  const gateImageInput = document.getElementById('gate-image-input');
  const gateImageFeedback = document.getElementById('gate-image-feedback');
  const gateImageList = document.getElementById('gate-image-list');

  const GATE_MAX_FILES = 10;
  const GATE_MAX_SIZE_MB = 10;
  const GATE_MAX_SIZE_BYTES = GATE_MAX_SIZE_MB * 1024 * 1024;
  const GATE_ALLOWED_TYPES = new Set(['image/jpeg', 'image/png']);

  const setGateImageFeedback = (message, isError = false) => {
    if (!gateImageFeedback) return;
    gateImageFeedback.textContent = message || '';
    gateImageFeedback.classList.toggle('text-danger', isError);
    gateImageFeedback.classList.toggle('text-success', !isError && !!message);
  };

  const renderGateImageList = (files) => {
    if (!gateImageList) return;
    if (!files.length) {
      gateImageList.innerHTML = '';
      return;
    }

    const lines = files.map((file, index) => {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      return `${index + 1}. ${file.name} (${sizeMb} MB)`;
    });
    gateImageList.innerHTML = lines.join('<br>');
  };

  if (gateImageUploadBtn && gateImageInput) {
    gateImageUploadBtn.addEventListener('click', () => {
      gateImageInput.click();
    });

    gateImageInput.addEventListener('change', () => {
      const selectedFiles = Array.from(gateImageInput.files || []);

      if (!selectedFiles.length) {
        setGateImageFeedback('');
        renderGateImageList([]);
        return;
      }

      if (selectedFiles.length > GATE_MAX_FILES) {
        gateImageInput.value = '';
        renderGateImageList([]);
        setGateImageFeedback(`Chỉ được chọn tối đa ${GATE_MAX_FILES} ảnh.`, true);
        return;
      }

      const invalidType = selectedFiles.find((file) => !GATE_ALLOWED_TYPES.has(file.type));
      if (invalidType) {
        gateImageInput.value = '';
        renderGateImageList([]);
        setGateImageFeedback('Chỉ chấp nhận file JPG hoặc PNG.', true);
        return;
      }

      const invalidSize = selectedFiles.find((file) => file.size > GATE_MAX_SIZE_BYTES);
      if (invalidSize) {
        gateImageInput.value = '';
        renderGateImageList([]);
        setGateImageFeedback(`Mỗi ảnh tối đa ${GATE_MAX_SIZE_MB}MB.`, true);
        return;
      }

      setGateImageFeedback(`Đã chọn ${selectedFiles.length} ảnh hợp lệ.`);
      renderGateImageList(selectedFiles);
    });
  }

  const validateGateRow = (row) => {
    let valid = true;
    row.querySelectorAll('.gate-item-input').forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        valid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });
    return valid;
  };

  const createGateRow = (index) => {
    const tr = document.createElement('tr');
    tr.className = 'gate-item-row';
    tr.innerHTML = `
      <td class="gate-item-index">${index}</td>
      <td><input type="text" class="form-control form-control-sm gate-item-input gate-item-name"></td>
      <td><input type="text" class="form-control form-control-sm gate-item-input gate-item-unit"></td>
      <td><input type="text" class="form-control form-control-sm gate-item-input gate-item-qty"></td>
      <td><input type="text" class="form-control form-control-sm gate-item-input gate-item-doc"></td>
      <td class="text-center text-success font-weight-bold gate-row-add" style="font-size:1.3rem;">+</td>
    `;
    return tr;
  };

  if (gateItemsBody) {
    gateItemsBody.addEventListener('click', (event) => {
      const addBtn = event.target.closest('.gate-row-add');
      if (!addBtn) return;

      const row = addBtn.closest('.gate-item-row');
      if (!row) return;

      if (!validateGateRow(row)) {
        return;
      }

      const nextIndex = gateItemsBody.querySelectorAll('.gate-item-row').length + 1;
      gateItemsBody.appendChild(createGateRow(nextIndex));
    });

    gateItemsBody.addEventListener('input', (event) => {
      if (event.target.classList.contains('gate-item-input')) {
        event.target.classList.remove('is-invalid');
      }
    });
  }

  if (gateSubmitBtn && gateItemsBody) {
    gateSubmitBtn.addEventListener('click', () => {
      const rows = gateItemsBody.querySelectorAll('.gate-item-row');
      let allValid = true;

      rows.forEach((row) => {
        if (!validateGateRow(row)) allValid = false;
      });

      if (!allValid) {
        return;
      }

      // Prototype-only: success state can be integrated with API later.
    });
  }

  const contractorDateInputs = document.querySelectorAll('.contractor-date');
  contractorDateInputs.forEach((input) => {
    input.setAttribute('title', 'DD-MM-YYYY');
  });

  const overtimeDateTimeInputs = document.querySelectorAll('.overtime-datetime');
  overtimeDateTimeInputs.forEach((input) => {
    input.setAttribute('title', 'DD-MM-YYYY HH:SS');
  });

  const trainingLink = document.querySelector('.js-training-link');
  if (trainingLink) {
    trainingLink.addEventListener('click', () => {
      menuItems.forEach((m) => m.classList.remove('active'));
      trainingLink.classList.add('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
      if (nestedSubmenu) nestedSubmenu.classList.remove('show');
      attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
      attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (fuelMain) fuelMain.classList.remove('active');
      if (fuelSubmenu) fuelSubmenu.classList.remove('show');
      fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
      if (gateMain) gateMain.classList.remove('active');
      if (gateSubmenu) gateSubmenu.classList.remove('show');
      gateSubItems.forEach((i) => i.classList.remove('active-sub'));
    });
  }

  const activateSectionByTarget = (targetId) => {
    if (!targetId) return;
    const targetLink = document.querySelector(`.sidebar .nav-link[data-target="${targetId}"]`);
    if (!targetLink) return;

    sections.forEach((section) => {
      section.classList.toggle('d-none', section.id !== targetId);
    });

    menuItems.forEach((m) => m.classList.remove('active'));
    attendanceSubItems.forEach((i) => i.classList.remove('active-sub'));
    attendanceApproveSubItems.forEach((i) => i.classList.remove('active-sub'));
    fuelSubItems.forEach((i) => i.classList.remove('active-sub'));
    gateSubItems.forEach((i) => i.classList.remove('active-sub'));

    if (attendanceMain) attendanceMain.classList.remove('active');
    if (fuelMain) fuelMain.classList.remove('active');
    if (gateMain) gateMain.classList.remove('active');
    if (attendanceSubmenu) attendanceSubmenu.classList.remove('show');
    if (nestedSubmenu) nestedSubmenu.classList.remove('show');
    if (fuelSubmenu) fuelSubmenu.classList.remove('show');
    if (gateSubmenu) gateSubmenu.classList.remove('show');

    if (targetLink.classList.contains('js-menu')) {
      targetLink.classList.add('active');
    }

    if (targetLink.classList.contains('js-attendance-sub')) {
      if (attendanceMain) attendanceMain.classList.add('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.add('show');
      targetLink.classList.add('active-sub');
    }

    if (targetLink.classList.contains('js-attendance-approve-sub')) {
      if (attendanceMain) attendanceMain.classList.add('active');
      if (attendanceSubmenu) attendanceSubmenu.classList.add('show');
      if (nestedSubmenu) nestedSubmenu.classList.add('show');
      targetLink.classList.add('active-sub');
    }

    if (targetLink.classList.contains('js-fuel-sub')) {
      if (fuelMain) fuelMain.classList.add('active');
      if (fuelSubmenu) fuelSubmenu.classList.add('show');
      targetLink.classList.add('active-sub');
    }

    if (targetLink.classList.contains('js-gate-sub')) {
      if (gateMain) gateMain.classList.add('active');
      if (gateSubmenu) gateSubmenu.classList.add('show');
      targetLink.classList.add('active-sub');
    }

    pageTitle.textContent = targetLink.getAttribute('data-title') || targetLink.textContent.trim();
  };

  const getTargetFromLocation = () => {
    if (window.__INITIAL_SECTION) return window.__INITIAL_SECTION;

    const path = window.location.pathname.replace(/\/+/g, '/');
    const match = path.match(/\/pages\/([^\/]+)\/index\.html$/);
    if (match && routeSectionMap[match[1]]) return routeSectionMap[match[1]];

    const pageFromQuery = new URLSearchParams(window.location.search).get('page');
    if (pageFromQuery) return pageFromQuery;

    return 'dashboard-section';
  };

  const initialTarget = getTargetFromLocation();
  if (initialTarget) {
    activateSectionByTarget(initialTarget);
  }


