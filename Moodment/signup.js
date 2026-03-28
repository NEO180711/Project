const form = document.querySelector('.signup-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('pw-input');
const passwordConfirmInput = document.getElementById('pw-confirm-input');
const message = document.getElementById('message');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  if (!name || !email || !password || !passwordConfirm) {
    message.textContent = '모든 칸을 모두 채워주세요.';
    return;
  }

  if (password !== passwordConfirm) {
    message.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem('moodmentUser', JSON.stringify(user));
  message.textContent = '회원가입이 완료되었습니다. 로그인을 시도해보십시오.';

  setTimeout(function () {
    window.location.href = 'my_home.html';
  }, 1000);
});