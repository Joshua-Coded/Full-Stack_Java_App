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

export function getProjectsList(spaceName, query, projectFilter, offset, limit, participatorParam) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/projects?q=${query || ''}&spaceName=${spaceName || ''}&projectsFilter=${projectFilter || ''}&offset=${offset || 0}&limit=${limit|| 0}&participatorParam=${participatorParam|| false}`, {
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

export function getProjectStats(id) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/project/statistics/${id}`, {
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

export function getProject(id, participatorParam) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/projects/${id}?&participatorParam=${participatorParam|| false}`, {
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

export function addProject(project) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/createproject`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(project)
  }).then((data) => {
    return data.json();
  }).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}

export function updateProjectInfo(project) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/updateproject/${project.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(project)
  }).then(resp => resp.json()).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}

export function deleteProjectInfo(project) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/${project.id}?&deleteChild=false`, {
    credentials: 'include',
    method: 'DELETE'
  }).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}

export function cloneProject(project) {
  document.dispatchEvent(new CustomEvent('displayTopBarLoading'));
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/cloneproject`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(project)
  }).finally(() => document.dispatchEvent(new CustomEvent('hideTopBarLoading')));
}

export function updateProjectColor(project, color) {
  return fetch(`${tasksConstants.PORTAL}/${tasksConstants.PORTAL_REST}/projects/changeProjectColor/${project.id}?&color=${color}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(project)
  }).then(resp => resp.json());
}

export function saveFilterSettings(valueOfFilter) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/settings/USER,${eXo.env.portal.userName}/APPLICATION,task-${valueOfFilter.projectId}-${valueOfFilter.tabView}/filterTask`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'value': JSON.stringify(valueOfFilter)}),
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp;
    } else {
      throw new Error('Error setting filter  settings');
    }
  }).then(resp => {
    return resp;
  });
}
export function getFilterSettings(ProjectId,currentTabView) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/settings/USER,${eXo.env.portal.userName}/APPLICATION,task-${ProjectId}-${currentTabView}/filterTask`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.json();
    } else if (resp && resp.status === 404) {
      return null;
    } else {
      throw new Error('Error getting filter settings');
    }
  }).then(resp => {
    return resp;
  });
}
