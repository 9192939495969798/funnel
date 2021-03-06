/* global jstz, Pace */

import { Utils, ScrollActiveMenu, LazyloadImg } from './util';

$(() => {
  window.Hasgeek.config.mobileBreakpoint = 768; // this breakpoint switches to desktop UI
  window.Hasgeek.config.ajaxTimeout = 30000;
  window.Hasgeek.config.retryInterval = 10000;
  window.Hasgeek.config.closeModalTimeout = 10000;
  window.Hasgeek.config.refreshInterval = 60000;
  window.Hasgeek.config.notificationRefreshInterval = 300000;
  window.Hasgeek.config.readReceiptTimeout = 5000;

  Utils.collapse();
  Utils.smoothScroll();
  Utils.navSearchForm();
  Utils.scrollTabs();
  Utils.truncate();
  Utils.showTimeOnCalendar();
  Utils.popupBackHandler();
  Utils.handleModalForm();
  if ($('.header__nav-links--updates').length) {
    Utils.updateNotificationStatus();
    window.setInterval(
      Utils.updateNotificationStatus,
      window.Hasgeek.config.notificationRefreshInterval
    );
  }
  Utils.addWebShare();

  const intersectionObserverComponents = function () {
    if (document.querySelector('#page-navbar')) {
      ScrollActiveMenu.init(
        'page-navbar',
        'sub-navbar__item',
        'sub-navbar__item--active'
      );
    }
    LazyloadImg.init('js-lazyload-img');
  };

  if (
    document.querySelector('#page-navbar') ||
    document.querySelector('.js-lazyload-img') ||
    document.querySelector('.js-lazyload-results')
  ) {
    if (
      !(
        'IntersectionObserver' in global &&
        'IntersectionObserverEntry' in global &&
        'intersectionRatio' in IntersectionObserverEntry.prototype
      )
    ) {
      const polyfill = document.createElement('script');
      polyfill.setAttribute('type', 'text/javascript');
      polyfill.setAttribute(
        'src',
        'https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver'
      );
      polyfill.onload = function () {
        intersectionObserverComponents();
      };
      document.head.appendChild(polyfill);
    } else {
      intersectionObserverComponents();
    }
  }

  if (!('URLSearchParams' in window)) {
    const polyfill = document.createElement('script');
    polyfill.setAttribute('type', 'text/javascript');
    polyfill.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/url-search-params/1.1.0/url-search-params.js'
    );
    document.head.appendChild(polyfill);
  }

  // Send click events to Google analytics
  $('.mui-btn, a').click(function gaHandler() {
    const action =
      $(this).attr('data-action') || $(this).attr('title') || $(this).html();
    const target = $(this).attr('data-target') || $(this).attr('href') || '';
    Utils.sendToGA('click', action, target);
  });
  $('.search-form__submit').click(function gaHandler() {
    const target = $('.js-search-field').val();
    Utils.sendToGA('search', target, target);
  });

  // Detect timezone for login
  if ($.cookie('timezone') === null) {
    $.cookie('timezone', jstz.determine().name(), { path: '/' });
  }

  $.ajax({
    type: 'GET',
    url: window.Hasgeek.config.notificationCount,
    dataType: 'json',
    timeout: window.Hasgeek.config.ajaxTimeout,
    success: function (responseData) {
      if (responseData.unread) {
        $('.header__nav-links--updates').addClass(
          'header__nav-links--updates--unread'
        );
      }
    },
  });
});

if (
  navigator.userAgent.match(/(iPhone|Android)/) &&
  !(
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
  )
) {
  $('.pace').addClass('pace-hide');
  window.onbeforeunload = function () {
    Pace.stop();
  };
}
