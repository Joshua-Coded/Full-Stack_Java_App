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
export function getConfiguration() {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/automatic-translation/configuration`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(resp => {
    if (resp && resp.ok) {
      return resp.json();
    } else {
      throw new Error('Unable to get automatic translation configuration');
    }
  });
}

export function setActiveConnector(connector) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/automatic-translation/setActiveConnector?connector=${connector}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  });
}

export function setApiKey(connector,apikey) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/automatic-translation/setApiKey?connector=${connector}&apikey=${apikey}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    });
}

