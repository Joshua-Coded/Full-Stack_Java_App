/*
 * Copyright (C) 2021 eXo Platform SAS.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
 (function(extensionRegistry,exoi18n) {


  function getTranslatedBody(activity) {
    return activity.translatedBody;
  }

  function fetchTranslation(content, event) {
    let data = 'message='+encodeURIComponent(content)+'&locale='+eXo.env.portal.language;
    if (event.type) {
      data += '&contentType='+event.type;
    }
    if (event.spaceId) {
      data += '&spaceId='+event.spaceId;
    }
    return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/automatic-translation/translate`, {
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: data
    }).then(resp => {
      if (resp && resp.ok) {
        return resp.json();
      } else {
        dispatchError(event);
        throw new Error('Unable to get automatic translation result');
      }
    });
  }

  function dispatchError(event) {
    document.dispatchEvent(new CustomEvent('activity-translation-error',{ detail:event }));
  }

  function initExtensions() {
    const lang = typeof eXo !== 'undefined' ? eXo.env.portal.language : 'en';
    const url = `${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/locale.portlet.automaticTranslation.automaticTranslationExtension-${lang}.json`;
    exoi18n.loadLanguageAsync(lang, url);
    extensionRegistry.registerExtension('activity', 'action', {
      id: 'translate',
      rank: 9007199254740992,
      isEnabled: (activity, activityTypeExtension) => true,
      labelKey: 'UIActivity.label.translate',
      icon: 'fa-globe-americas',
      click: (activity, activityTypeExtension) => {
        const event = {
          id: activity.id,
          type: 'activity',
          spaceId: activity && activity.activityStream && activity.activityStream.space && activity.activityStream.space.id
        };
        if (!activity.translatedBody) {
          fetchTranslation(activityTypeExtension.getBody(activity),event).then(translated => {
            activity.translatedBody = translated.translation;
            activityTypeExtension.getTranslatedBody = getTranslatedBody;
            document.dispatchEvent(new CustomEvent('activity-translated',{ detail:event }));
          });
        } else {
          document.dispatchEvent(new CustomEvent('activity-translated',{ detail:event }));
        }
      },
    });
    extensionRegistry.registerExtension('activity', 'comment-action', {
      id: 'translate',
      rank: 9007199254740992,
      isEnabled: (activity, comment, activityTypeExtension) => true,
      labelKey: 'UIActivity.label.translate',
      icon: 'fa-globe-americas',
      click: (activity, comment, activityTypeExtension) => {
        const event = {
          id: comment.id,
          type: 'comment',
          spaceId: activity && activity.activityStream && activity.activityStream.space && activity.activityStream.space.id
        };
        if (!comment.translatedBody) {
          fetchTranslation(activityTypeExtension.getBody(comment),event).then(translated => {
            comment.translatedBody = translated.translation;
            activityTypeExtension.getCommentTranslatedBody = getTranslatedBody;
            document.dispatchEvent(new CustomEvent('activity-comment-translated',{ detail:event }));
          });
        } else {
          document.dispatchEvent(new CustomEvent('activity-comment-translated',{ detail:event }));
        }
      },
    });


    extensionRegistry.registerComponent('ActivityContent', 'activity-content-extensions', {
      id: 'translatedBody',
      vueComponent: Vue.options.components['activity-translated-body'],
      rank: 1,
    });

    extensionRegistry.registerComponent('ActivityContent', 'activity-content-extensions', {
      id: 'commentTranslatedBody',
      vueComponent: Vue.options.components['activity-comment-translated-body'],
      rank: 1,
    });
  }

  return {
    init: () => {
      fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/automatic-translation/isEnabled`, {
        headers: {
         'Content-Type': 'application/json'
        },
        method: 'GET'
      }).then(resp => {
        if (resp && resp.ok) {
          return resp.text();
        } else {
          throw new Error('Unable to get automatic translation configuration');
        }
      }).then(result => {
        if (result === "true") {
          initExtensions();
        }
      });
    },
  };
})(extensionRegistry,exoi18n);
