import {canUserCreateNews} from '../services/newsServices.js';

const newsActivityTypeExtensionOptions = {
  name: 'News',
  getExtendedComponent: (activity, isActivityDetail) => {
    if (activity && isActivityDetail) {
      return {
        component: Vue.options.components['exo-news-details-activity'],
        overrideHeader: true,
        overrideFooter: false,
      };
    }
  },
  extendSharedActivity: (activity, isActivityDetail) => isActivityDetail,
  showSharedInformationFooter: (activity, isActivityDetail) => isActivityDetail,
  init: (activity, isActivityDetail) => {
    let activityId = activity.id;
    if (activity.parentActivity) {
      activityId = activity.parentActivity.id;
    }
    if (!activity.news || isActivityDetail) {
      return Vue.prototype.$newsServices.getNewsByActivityId(activityId)
        .then(news => activity.news = news);
    }
  },
  canEdit: () => false,
  canShare: () => true,
  hideOnDelete: true,
  supportsThumbnail: true,
  windowTitlePrefixKey: 'news.window.title',
  getThumbnail: (activity) => activity && activity.news && activity.news.illustrationURL && `${activity.news.illustrationURL}&size=305x285`|| '/news/images/news.png',
  getThumbnailProperties: (activity) => !(activity && activity.news && activity.news.illustrationURL) && {
    height: '90px',
    width: '90px',
    noBorder: true,
  } || null,
  isUseSameViewForMobile: (activity) => !activity || !activity.news || !activity.news.illustrationURL,
  getTitle: (activity) => {
    const news = activity && activity.news;
    if (news && news.title) {
      return news.title;
    }
    return '';
  },
  getSourceLink: (activity) => `${eXo.env.portal.context}/${eXo.env.portal.portalName}/activity?id=${!activity.parentActivity ? activity.id : activity.parentActivity.id}`,
  getSummary: (activity) => {
    const news = activity && activity.news;
    if (news && news.summary) {
      return news.summary;
    } else if (news && news.body) {
      return Vue.prototype.$utils.htmlToText(news.body);
    }
    return '';
  },
  getTooltip: (activity, isActivityDetail) => !isActivityDetail && activity && 'news.activity.clickToShowDetail',
};

const lang = eXo.env.portal.language || 'en';
const url = `${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.news.News-${lang}.json`;

const i18nPromise = exoi18n.loadLanguageAsync(lang, url).then(i18n => new Vue({i18n}));

export function initExtensions() {
  if (eXo.env.portal.spaceId && eXo.env.portal.spaceId !== '') {
    canUserCreateNews(eXo.env.portal.spaceId)
      .then(canCreateNews => {
        if (canCreateNews) {
          return i18nPromise.then(() => {
            extensionRegistry.registerComponent('ActivityComposerAction', 'activity-composer-action', {
              id: 'switchNewsButton',
              vueComponent: Vue.options.components['activity-switch-to-news'],
              rank: 10,
            });
            extensionRegistry.registerComponent('ActivityComposerFooterAction', 'activity-composer-footer-action', {
              id: 'writeNewsButton',
              vueComponent: Vue.options.components['activity-write-news'],
              rank: 30,
            });
          });
        }
      });
  }

  extensionRegistry.registerExtension('activity', 'type', {
    type: 'news',
    options: newsActivityTypeExtensionOptions,
  });

  extensionRegistry.registerExtension('AnalyticsTable', 'CellValue', {
    type: 'news',
    options: {
      // Rank of executing 'match' method
      rank: 60,
      // Used Vue component to display cell value
      vueComponent: Vue.options.components['analytics-table-cell-content-value'],
      // Method complete signature : match: (fieldName, aggregationType, fieldDataType, item) => { ... }
      match: (fieldName, aggregationType) => fieldName === 'contentId.keyword' && aggregationType === 'TERMS',
    },
  });

  extensionRegistry.registerExtension('AnalyticsSamples', 'SampleItem', {
    type: 'news',
    options: {
      // Rank of executing 'match' method
      rank: 30,
      // Used Vue component to display cell value
      vueComponent: Vue.options.components['analytics-sample-item-content'],
      match: fieldName => fieldName === 'contentId',
    },
  });


  extensionRegistry.registerComponent('favorite-news', 'favorite-drawer-item', {
    id: 'news',
    vueComponent: Vue.options.components['news-favorite-item'],
  });

}
