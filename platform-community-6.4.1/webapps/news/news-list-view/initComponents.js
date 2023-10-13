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
import NewsListView from './components/NewsListView.vue';
import NewsLatestView from './components/views/NewsLatestView.vue';
import NewsSliderView from './components/views/NewsSliderView.vue';
import NewsSettings from './components/settings/NewsSettings.vue';
import NewsSettingsDrawer from './components/settings/NewsSettingsDrawer.vue';
import NewsEmptyLatestView from './components/views/NewsEmptyLatestView.vue';
import NewsEmptySliderView from './components/views/NewsEmptySliderView.vue';
import NewsSliderViewItem from './components/views/NewsSliderViewItem.vue';
import NewsEmptyTemplate from './components/views/NewsEmptyTemplate.vue';
import NewsLatestViewItem from './components/views/NewsLatestViewItem.vue';
import NewsAdvancedSettings from './components/settings/NewsAdvancedSettings.vue';
import NewsAlertView from './components/views/NewsAlertView.vue';
import NewsListTemplateView from './components/views/NewsListTemplateView.vue';
import NewsListTemplateViewItem from './components/views/NewsListTemplateViewItem.vue';
import NewsMosaicView from './components/views/NewsMosaicView.vue';
import NewsStoriesView from './components/views/NewsStoriesView.vue';
import NewsStoriesViewItem from './components/views/NewsStoriesViewItem.vue';
import NewsCardsView from './components/views/NewsCardsView.vue';
import NewsCardsViewItem from './components/views/NewsCardsViewItem.vue';


const components = {
  'news-list-view': NewsListView,
  'news-latest-view': NewsLatestView,
  'news-slider-view': NewsSliderView,
  'news-settings': NewsSettings,
  'news-settings-drawer': NewsSettingsDrawer,
  'news-empty-latest-view': NewsEmptyLatestView,
  'news-empty-slider-view': NewsEmptySliderView,
  'news-slider-view-item': NewsSliderViewItem,
  'news-empty-template': NewsEmptyTemplate,
  'news-latest-view-item': NewsLatestViewItem,
  'news-advanced-settings': NewsAdvancedSettings,
  'news-alert-view': NewsAlertView,
  'news-list-template-view': NewsListTemplateView,
  'news-list-template-view-item': NewsListTemplateViewItem,
  'news-mosaic-view': NewsMosaicView,
  'news-stories-view': NewsStoriesView,
  'news-stories-view-item': NewsStoriesViewItem,
  'news-cards-view': NewsCardsView,
  'news-cards-view-item': NewsCardsViewItem,
};

for (const key in components) {
  Vue.component(key, components[key]);
}
