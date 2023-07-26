import Tooltip from './Tooltip';

const btn = document.querySelector('.btn');

const message = {
  title: 'Test',
  text: 'Здесь будет находиться ваш текст',
};

const tooltipButton = new Tooltip();

btn.addEventListener('click', (e) => {
  e.preventDefault();

  const target = e.currentTarget;

  tooltipButton.showTooltip(message, target);
  tooltipButton.removeTooltip(2000);
});
