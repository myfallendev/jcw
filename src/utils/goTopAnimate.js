export function scrollToY(scrollTargetY, speed, easing) {
  scrollTargetY = scrollTargetY || 0;
  speed = speed || 2000;
  easing = easing || 'easeOutSine';

  const scrollY = window.scrollY;
  const time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  const easingEquations = {
    easeOutSine: function(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function(pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },
    easeInOutQuint: function(pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow((pos - 2), 5) + 2);
    }
  };

  let currentTime = 0;

  tick();

  function tick() {
    currentTime += 1 / 60;

    const p = currentTime / time;
    const t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimationFrame(tick);

      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }
}
