const loginForm = document.querySelector('.login-form');
const loginContainer = document.querySelector('.login-container');
const emailInput = document.getElementById('login-email-input');
const passwordInput = document.getElementById('login-password-input');
const messageBox = document.getElementById('login-message');
const statusBox = document.querySelector('.status-box');
const statusText = document.querySelector('.status-text');
const logoutBtn = document.querySelector('.logout-btn');

function showMessage(text, type) {
  if (!messageBox) return;

  if (type) {
    messageBox.className = `form-message${type}`;
  } else {
    messageBox.className = 'form-message';
  }

  messageBox.textContent = text;
}

function renderLoginState() {
  const currentUser = localStorage.getItem('moodmentCurrentUser');

  if (currentUser) {
    if (statusBox) {
      statusBox.style.display = 'block';
    }

    if (statusText) {
      statusText.textContent = currentUser + ' 계정으로 로그인 중입니다.';
    }

    if (loginContainer) {
      loginContainer.style.display = 'none';
    }
  } else {
    if (statusBox) {
      statusBox.style.display = 'none';
    }

    if (loginContainer) {
      loginContainer.style.display = 'block';
    }
  }
}

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const savedUserText = localStorage.getItem('moodmentUser');

    if (!savedUserText) {
      showMessage('아직 가입된 계정이 확인되지 않습니다. 먼저 회원가입부터 해주세요.', 'error');
      return;
    }

    const savedUser = JSON.parse(savedUserText);
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showMessage('이메일과 비밀번호를 모두 입력해주세요.', 'error');
      return;
    }

    if (email !== savedUser.email || password !== savedUser.password) {
      showMessage('이메일 또는 비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    localStorage.setItem('moodmentCurrentUser', savedUser.email);
    showMessage('로그인 성공! 메인페이지로 이동합니다!', 'success');

    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1000);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('moodmentCurrentUser');
    location.reload();
  });
}

function resetAllData() {
  if (confirm('모든 계정과 로그인 정보를 삭제할까요?')) {
    localStorage.removeItem('moodmentUser');
    localStorage.removeItem('moodmentCurrentUser');
    alert('데이터가 초기화되었습니다.');
    location.reload();
  }
}

renderLoginState();