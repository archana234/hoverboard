/* @polymerMixin */
export const ScrollFunctions = (subclass) => class extends subclass {
  /**
   * Scroll function
   * @param {Number} scrollTargetY - the target scrollY property of the window
   * @param {Number} time - time of animation
   * @param {String} easing - easing equation to use
   */
  scrollToY(scrollTargetY = 0, time = 0, easing = 'easeOutSine') {
    let currentTime = 0;
    const animationTime = time / 1000;

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations = {
      easeOutSine: (pos) => Math.sin(pos * (Math.PI / 2)),
      easeInOutSine: (pos) => (-0.5 * (Math.cos(Math.PI * pos) - 1)),
      easeInOutQuint: (pos) => {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      },
    };

    // add animation loop
    function tick() {
      currentTime += 1 / 60;

      const p = currentTime / animationTime;
      const t = easingEquations[easing](p);

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      const newPosition = (scrollTop + ((scrollTargetY - scrollTop) * t));

      if (p < 1) {
        window.requestAnimationFrame(tick);
        document.body.scrollTop = document.documentElement.scrollTop = newPosition;
      }
    }

    tick();
  }

  offsetTop(element) {
    return element.getBoundingClientRect().top +
            (window.pageYOffset || document.documentElement.scrollTop) -
            (document.documentElement.clientTop || 0);
  }
};
