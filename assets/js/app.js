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

const noticeViewButtons = document.querySelectorAll('.js-notice-view');
const noticeDetailTitle = document.getElementById('noticeDetailTitle');

noticeViewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!noticeDetailTitle) return;
    noticeDetailTitle.textContent = button.getAttribute('data-notice-title') || 'Chi tiết thông báo';
  });
});

const contractorDateInputs = document.querySelectorAll('.contractor-date');
contractorDateInputs.forEach((input) => {
  input.setAttribute('title', 'DD-MM-YYYY');
});

const overtimeDateTimeInputs = document.querySelectorAll('.overtime-datetime');
overtimeDateTimeInputs.forEach((input) => {
  input.setAttribute('title', 'DD-MM-YYYY HH:SS');
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
  });
}
