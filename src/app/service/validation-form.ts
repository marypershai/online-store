function getFieldName(input: HTMLElement): string {
  const firstLetter: string = input.id.charAt(0).toUpperCase();
  return firstLetter + input.id.slice(1);
}

function showError(input: HTMLElement, msg: string): void {
  const formControl = input.parentElement as HTMLElement;
  const small = formControl.querySelector('small') as HTMLElement;
  formControl.classList.add('error');
  small.textContent = msg;
  if (formControl.classList.contains('success')) {
    formControl.classList.remove('success');
  }
}

function showSuccess(input: HTMLElement): void {
  const formControl = input.parentElement as HTMLElement;
  formControl.classList.add('success');
  if (formControl.classList.contains('error')) {
    formControl.classList.remove('error');
  }
}

export function checkRequired(inputArr: HTMLInputElement[]): void {
  inputArr.forEach((input: HTMLInputElement) => {
    if ((input).value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

export function checkEmail(input: HTMLInputElement): void {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email address is invalid. ');
  }
}

export function checkLength(input: HTMLInputElement, countWord: number, minLength: number): void {
  const splitMessage: string[] = input.value.split(' ');
  const wordsNumber: number = splitMessage.length;
  let error = 0;
  splitMessage.forEach((word) => {
    if (word.length < minLength) {
      error++;
    }
  });
  if (wordsNumber < countWord || error !== 0) {
    showError(input,
      `${getFieldName(
        input,
      )} must be more contain minimum ${countWord} words and each word must be more than ${minLength} characters long`,
    );
  } else {
    showSuccess(input);
  }
}

export function checkPhone(input: HTMLInputElement): void {
  const re = /^[+][0-9]{9,}$/im;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Phone number is invalid.');
  }
}

export function checkCardNumber(input: HTMLInputElement): string {
  const cards = {
    'amex': /^3(4|7)\d{14}$/,
    'mastercard': /^5\d{15}$/,
    'visa': /^4(\d{15})$/,
  };
  for (const card in cards) {
    if (cards[card as keyof typeof cards].test(input.value)) {
      showSuccess(input);
      return card;
    } else {
      showError(input, 'Card number is invalid.');
    }
  }
  return '';
}

export function checkCvv(input: HTMLInputElement): void {
  const re = /^[0-9]{3}$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'CVV is invalid.');
  }
}




