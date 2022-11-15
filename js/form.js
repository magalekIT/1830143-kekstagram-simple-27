import { resetScale } from './scale.js';
import { isEscapeKey } from './util.js';
import { imgEditorForm, imgEditorElement, imgEditorOpenElement, imgEditorcloseElement, bodyElement, commentElement } from './dom_elements.js';
import { EMPTY_VALUE } from './data.js';

const ImgUpload = () => {
  const onEditorEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      closeImgEditor();
    }
  };

  const clearFieldValue = (field) => {
    field.value = EMPTY_VALUE;
  };

  const clearElementTextContent = (element) => {
    element.textContent = EMPTY_VALUE;
  };

  const removeValidateErrorMassage = () => {
    const text = document.querySelector('.text');
    const textError = text.querySelector('.text__error');
    if (textError) {
      clearElementTextContent(textError);
    }
  };

  const openImgEditor = () => {
    imgEditorElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    document.addEventListener('keydown', onEditorEscKeydown);
  };

  const closeImgEditor = () => {
    imgEditorElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    document.removeEventListener('keydown', onEditorEscKeydown);
    clearFieldValue (imgEditorOpenElement);
    clearFieldValue (commentElement);
    removeValidateErrorMassage();
    resetScale();
  };

  imgEditorOpenElement.addEventListener('change', () => {
    openImgEditor();
  });

  imgEditorcloseElement.addEventListener('click', () => {
    closeImgEditor();
  });
};

const validateImgEditorForm = () => {
  const pristine = new Pristine(imgEditorForm, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
    errorTextClass: 'text__error',
  });

  imgEditorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      // eslint-disable-next-line no-console
      console.log('Можно отправлять');
    } else {
      // eslint-disable-next-line no-console
      console.log('Форма невалидна');
    }
  });
};

export { ImgUpload, validateImgEditorForm, imgEditorForm };
