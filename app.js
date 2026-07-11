
// header
  const overlay = document.getElementById("overlay");
const sidebar = document.getElementById("sidebar");

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");

function openMenu() {

    overlay.classList.remove("opacity-0","invisible");

    sidebar.classList.remove("translate-x-full");

    document.body.style.overflow = "hidden";

}

function closeMenu() {

    overlay.classList.add("opacity-0");

    sidebar.classList.add("translate-x-full");

    document.body.style.overflow = "";

    setTimeout(() => {

        overlay.classList.add("invisible");

    },300);

}

menuBtn.addEventListener("click", openMenu);

closeBtn.addEventListener("click", closeMenu);

overlay.addEventListener("click",(e)=>{

    if(e.target===overlay){
        closeMenu();
    }
});
  // slider
document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".track");
    const container = slider.querySelector(".overflow-hidden");
    track.innerHTML += track.innerHTML;
    let position = 0;
    let speed = 0.3;
    let paused = false;
    function animate() {
        if (!paused) {
            position += speed;
            const halfWidth = track.scrollWidth / 2;
            if (position >= halfWidth) {
                position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(animate);
    }
    animate();
});
// faqs
  const accordionOnlyOneOpen = true; // غيّرها لـ false لو بدك تفتح أكثر من سؤال بنفس الوقت
  document.querySelectorAll('.faq-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');
      const isOpen = item.classList.contains('faq-open');

      if (accordionOnlyOneOpen) {
        document.querySelectorAll('.faq-item').forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains('faq-open')) {
            otherItem.classList.remove('faq-open');
            otherItem.querySelector('.faq-content').style.maxHeight = '0px';
            otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
          }
        });
      }

      if (isOpen) {
        item.classList.remove('faq-open');
        content.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('faq-open');
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.style.transform = 'rotate(45deg)';
      }
    });
  });
  // اراء العملاء
const testimonials = [
  {
    text: `"العمل مع توب تك كان نقطة تحول حقيقية في أعمالنا. من أول تحليل إلى تنفيذ كامل للخطة، كان كل شيء منظمًا واحترافيًا. النتائج كانت واضحة خلال فترة قصيرة، وازدادت طلبات التواصل والمبيعات بشكل ملحوظ."`,
    name: "أحمد خالد",
    role: "CEO - منصة نمو الرقمية"
  },
  {
    text: `"فريق توب تك غيّر شكل تسويقنا بالكامل. الالتزام بالمواعيد ودقة التنفيذ خلّت النتائج تظهر أسرع من المتوقع، والتعامل كان احترافي من أول يوم."`,
    name: "سارة يوسف",
    role: "مديرة تسويق - متجر لمسة"
  },
  {
    text: `"تعاملنا مع أكتر من شركة قبل هيك، بس الفرق كان واضح مع توب تك من ناحية الشفافية والتقارير الدورية. فعلاً استثمار يستاهل."`,
    name: "محمد عبدالله",
    role: "مؤسس - شركة الأفق"
  }
];

let currentIndex = 0;

const textEl = document.getElementById('testimonial-text');
const infoEl = document.getElementById('testimonial-info');
const nameEl = document.getElementById('testimonial-name');
const roleEl = document.getElementById('testimonial-role');

function changeTestimonial(newIndex) {
  textEl.classList.remove('opacity-100');
  textEl.classList.add('opacity-0');
  infoEl.classList.remove('opacity-100');
  infoEl.classList.add('opacity-0');

  setTimeout(() => {
    const current = testimonials[newIndex];
    textEl.textContent = current.text;
    nameEl.textContent = current.name;
    roleEl.textContent = current.role;

    textEl.classList.remove('opacity-0');
    textEl.classList.add('opacity-100');
    infoEl.classList.remove('opacity-0');
    infoEl.classList.add('opacity-100');
  }, 300);
}

document.getElementById('btn-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  changeTestimonial(currentIndex);
});

document.getElementById('btn-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  changeTestimonial(currentIndex);
});
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  changeTestimonial(currentIndex);
}, 5000); 



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