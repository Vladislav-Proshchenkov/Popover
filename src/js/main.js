import Popover from './Popover';
import '../styles/popover.css';

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-popover-title]');
  buttons.forEach(btn => new Popover(btn));
});