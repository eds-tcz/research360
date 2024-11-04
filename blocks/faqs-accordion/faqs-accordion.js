const handlefaqClick = (accordion) => {
  const answer = accordion.currentTarget.nextElementSibling;
  if (answer.classList.contains('show')) {
    answer.classList.remove('show');
    accordion.currentTarget.classList.remove('show');
  } else {
    answer.classList.add('show');
    accordion.currentTarget.classList.add('show');
  }
};

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = 'faqs-accordion-item';

    [...row.children].forEach((faq, faqIndex) => {
      if (faqIndex === 0) {
        faq.className = 'faqs-accordion-question';
        faq.addEventListener('click', handlefaqClick);
      }

      if (faqIndex === 1) {
        faq.className = 'faqs-accordion-answer';
      }
    });
  });
}
