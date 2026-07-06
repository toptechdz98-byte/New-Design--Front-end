const counters = document.querySelectorAll('.counter');
const duration = 1500; // مدة الحركة بالميلي ثانية

counters.forEach(counter => {
  const target = parseInt(counter.getAttribute('data-target'));
  const suffix = counter.getAttribute('data-suffix') || "+"; // لو ما فيه data-suffix بيستخدم "+" الافتراضي
  let startTime = null;

  function animateCounter(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * target);
    counter.textContent = currentValue + suffix;

    if (progress < 1) {
      requestAnimationFrame(animateCounter);
    } else {
      counter.textContent = target + suffix;
    }
  }

  requestAnimationFrame(animateCounter);
}); 
 const items = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const classes = entry.target.dataset.animate.split(' ');
        entry.target.classList.remove('opacity-0');
        entry.target.classList.add(...classes);
        observer.unobserve(entry.target); // الأنيميشن يشتغل مرة وحدة بس لكل section
      }
    });
  }, {
    threshold: 0.2, // يشتغل لما 20% من الـ section يبين
    rootMargin: '0px 0px -50px 0px' // يبدأ الأنيميشن شوي قبل ما يوصل تماماً
  });

  items.forEach(item => {
    item.classList.add('opacity-0'); // إخفاء كل section بالبداية
    observer.observe(item);
  });