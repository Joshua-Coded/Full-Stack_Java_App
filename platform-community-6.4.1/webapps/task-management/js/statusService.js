/**
 * This file is part of the Meeds project (https://meeds.io/).
 * Copyright (C) 2022 Meeds Association
 * contact@meeds.io
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import { tasksConstants } from './tasksConstants';

export function createStatus(status) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/status`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(status)
  }).then(resp => resp.json());
}

export function updateStatus(status) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/status/${status.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(status)
  }).then(resp => resp.json());
}

export function moveStatus(statusList) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/status/move`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(statusList)
  }).then(resp => resp.json());
}

export function deleteStatus(statusId) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/status/${statusId}`, {
    credentials: 'include',
    method: 'DELETE',
  });
}