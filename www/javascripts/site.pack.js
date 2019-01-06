// This is a main JavaScript file that will ll be compiled into /javascripts/site.js
//
// Any JavaScript file in your site folder can be referenced here by using import or require statements.
// Additionally, you can import modules installed via your package.json file.
//
// For example:
// import './fileName'
//
// To learn more, visit https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

class TxtType {
  constructor(el, rooster, period) {
    this.el = el;
    this.rooster = rooster;
    this.period = parseInt(period, 10) || 4000;
    this.text = '';
    this.loopCount = 0;
    this.tick();
    this.isDeleting = false;
  }

  tick() {
    let i = this.loopCount % this.rooster.length;
    let fullText = this.rooster[i];

    if (this.isDeleting) {
      this.text = fullText.substring(0, this.text.length - 1);
    } else {
      this.text = fullText.substring(0, this.text.length + 1);
    }

    this.el.innerHTML = `<span class="wrap">${this.text}</span>`;

    let delta = 200 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.text === fullText) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.loopCount++;
      delta = 500;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  }
}

(function($) {
  $(window).on('load', function() {
    let elements = $('.typewrite');
    for (const element of elements) {
      let data = $(element).data('type');
      let period = $(element).data('period');

      if (data) {
        new TxtType(element, data, period);
      }
    }

    let css = $("<style/>");
    css.type = "text/css";
    css.innerHTML = `.typewrite > .wrap {
      border-right: 0.08em solid #fff
    }`;

    $("body").append(css)
  })
})(jQuery);
