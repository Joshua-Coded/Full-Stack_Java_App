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
import {newsConstants} from '../js/newsConstants.js';

export function getAllTargets() {
  return fetch(`${newsConstants.NEWS_API}/targeting`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.json();
    }
  });
}
export function getAllowedTargets() {
  return fetch(`${newsConstants.NEWS_API}/targeting/allowed`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.json();
    }
  });
}

export function deleteTargetByName(targetName, delay) {
  if (delay > 0) {
    localStorage.setItem('deletedNewsTarget', targetName);
  }
  return fetch(`${newsConstants.NEWS_API}/targeting/${targetName}?delay=${delay || 0}`, {
    credentials: 'include',
    method: 'DELETE'
  }).then((resp) => {
    if (resp && !resp.ok) {
      throw new Error('Error when deleting news target');
    }
  });
}

export function undoDeleteTarget(targetName) {
  return fetch(`${newsConstants.NEWS_API}/targeting/${targetName}/undoDelete`, {
    method: 'POST',
    credentials: 'include',
  }).then((resp) => {
    if (resp && resp.ok) {
      localStorage.removeItem('deletedNewsTarget');
    } else {
      throw new Error('Error when undoing deleting news target');
    }
  });
}

export function createTarget(target) {
  return fetch(`${newsConstants.NEWS_API}/targeting`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(target),
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.status;
    } else if ( resp.status === 409) {
      return resp.status;
    } else {
      throw new Error('Error when creating news target');
    }
  });
}

export function updateTarget(target, originalTargetName) {
  return fetch(`${newsConstants.NEWS_API}/targeting/${originalTargetName}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(target),
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.status;
    } else {
      throw new Error('Error when updating news target');
    }
  });
}
