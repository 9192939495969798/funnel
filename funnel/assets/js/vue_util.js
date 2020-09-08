import Vue from 'vue/dist/vue.min';

export const userAvatarUI = Vue.component('useravatar', {
  template:
    '<a :href="user.profile_url" v-if="user.profile_url && addprofilelink"><img class="user__box__gravatar" :src="user.avatar" v-if="user.avatar"/><div class="user__box__gravatar user__box__gravatar--initials" v-else>{{ getInitials(user.fullname) }}</div></a v-if="user.profile_url && addprofilelink"></a><span v-else><img class="user__box__gravatar" :src="user.avatar" v-if="user.avatar"/><div class="user__box__gravatar user__box__gravatar--initials" v-else>{{ getInitials(user.fullname) }}</span v-else>',
  props: ['user', 'addprofilelink'],
  methods: {
    getInitials: window.Baseframe.Utils.getInitials,
  },
});

export const faSvg = Vue.component('faicon', {
  template:
    '<svg class="fa5-icon" :class="[iconsizecss,baselineclass,css_class]" aria-hidden="true" role="img"><use v-bind:xlink:href="svgIconUrl + iconname"></use></svg>',
  props: {
    icon: String,
    icon_size: {
      type: String,
      default: 'body',
    },
    baseline: {
      type: Boolean,
      default: true,
    },
    css_class: String,
  },
  data() {
    return {
      svgIconUrl: window.Hasgeek.config.svgIconUrl,
    };
  },
  computed: {
    iconname() {
      return '#' + this.icon;
    },
    iconsizecss() {
      return 'fa5-icon--' + this.icon_size;
    },
    baselineclass() {
      if (this.baseline) {
        return 'fa5--align-baseline';
      } else return '';
    },
  },
});

export const shareDropdown = Vue.component('sharedropdown', {
  template:
    '<ul class="mui-dropdown__menu mui-dropdown__menu--right mui-dropdown__menu--hg-link" data-cy="share-dropdown"><li><a class="details__box__control__link mui--text-body2" target="_blank" rel="noopener" :href="twitterUrl" :data-url="url" data-via="Hasgeek" :data-text="title" data-action="Tweet">Twitter</a></li><li><a class="details__box__control__link mui--text-body2" target="_blank" rel="noopener" :href="facebookUrl" :data-href="url" data-action="Share on facebook">Facebook</a></li><li><a class="details__box__control__link mui--text-body2" :href="emailUrl" data-action="Share via Email">Email</a></li><li><a class="details__box__control__link mui--text-body2" :href="linkedinUrl" data-action="Share about on linkedin">Linkedin</a></li><li><a class="details__box__control__link mui--text-body2 js-copy-link" href="javascript:void(0)" data-action="Copy link">Copy link<span class="js-copy-url">{{ url }}</span></a></li></ul>',
  props: ['url', 'title'],
  computed: {
    twitterUrl() {
      return `//twitter.com/share?url=${this.url}&amp;via=Hasgeek&amp;text=${this.title}&amp;utm_campaign=share-twitter`;
    },
    facebookUrl() {
      return `//www.facebook.com/sharer.php?u=${this.url}&amp;t=${this.title}&amp;utm_campaign=share-facebook`;
    },
    emailUrl() {
      return `mailto:?subject=${this.title}&amp;body=${this.url}&amp;utm_campaign=share-email`;
    },
    linkedinUrl() {
      return `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}&title=${this.title}&amp;utm_campaign=share-linkedin`;
    },
  },
});