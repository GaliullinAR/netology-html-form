export default class Tooltip {
  constructor() {
    this._tooltip = [];
  }

  showTooltip(message, element) {
    if (this._tooltip.length !== 0) return;

    const tooltip = document.createElement('div');
    const tooltipTitle = document.createElement('h3');
    const tooltipText = document.createElement('p');

    tooltip.classList.add('tooltip-message');
    tooltipTitle.classList.add('tooltip-message__title');
    tooltipText.classList.add('tooltip-message__text');

    tooltipTitle.textContent = message.title;
    tooltipText.textContent = message.text;

    [tooltipTitle, tooltipText].forEach((item) => {
      tooltip.insertAdjacentElement('beforeend', item);
    });

    const { top, left } = element.getBoundingClientRect();

    document.body.appendChild(tooltip);

    tooltip.style.left = `${left + (element.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;
    tooltip.style.top = `${top - 10 - tooltip.offsetHeight}px`;

    this._tooltip.push(tooltip);
  }

  removeTooltip(ms) {
    setTimeout(() => {
      if (this._tooltip.length !== 0) {
        this._tooltip[0].remove();
        this._tooltip = [];
      }
    }, ms);
  }
}
