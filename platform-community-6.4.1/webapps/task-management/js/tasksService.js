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

export function getMyTasksList(type, query, offset, limit) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks?status=${type || ''}&q=${query || ''}&offset=${offset || 0}&limit=${limit|| 0}&returnDetails=true`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  }).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}

export function filterTasksList(tasks, groupBy, orderBy, filterLabelIds, projectId) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks/filter?projectId=${projectId || tasks.projectId || -2}&query=${tasks.query || ''}&dueDate=${tasks.dueDate || ''}&priority=${tasks.priority || ''}&statusId=${tasks.statusId || ''}&showCompletedTasks=${tasks.showCompletedTasks || ''}&assignee=${tasks.assignee || ''}&watcher=${tasks.watcher || ''}&coworker=${tasks.coworker || ''}&groupBy=${groupBy || tasks.groupBy || ''}&orderBy=${orderBy || tasks.orderBy || ''}&dueCategory=${tasks.dueCategory || ''}&filterLabelIds=${filterLabelIds || tasks.filterLabelIds || ''}&offset=${tasks.offset || 0}&limit=${tasks.limit|| 0}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  }).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}


export function getLabelsByTaskId(taskId) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks/labels/${taskId}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function getLabelsByProjectId(projectId) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks/labels/project/${projectId}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}


export function getTaskById(taskId) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks/${taskId}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function getStatusesByProjectId(projectId) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/projects/statuses/${projectId}`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function getTasksByProjectId(projectId) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks/project/${projectId}?returnDetails=true`, {
    method: 'GET',
    credentials: 'include',
  }).then(resp => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function updateCompleted(task) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/tasks/updateCompleted/${task.id}?&isCompleted=${task.isCompleted}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(task)
  }).then(resp => resp.json()).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}
