const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// 🟡 Об'єкт для збереження значень форми
let formData = {
  email: '',
  message: '',
};

// 🟢 Завантаження збережених значень з локального сховища
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData);
    if (formData.email) {
      form.elements.email.value = formData.email;
    }
    if (formData.message) {
      form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Помилка при зчитуванні з localStorage:', error);
  }
}

// 🟢 Відстеження вводу в полях форми
form.addEventListener('input', evt => {
  const { name, value } = evt.target;
  formData[name] = value.trim(); // обрізаємо пробіли по краях
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 🟢 Обробка сабміту форми
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const { email, message } = formData;

  if (email === '' || message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Відправка форми з даними:', formData);

  // очищення форми, сховища, об'єкта formData
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
});
