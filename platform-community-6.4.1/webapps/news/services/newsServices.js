import {newsConstants} from '../js/newsConstants.js';

export function getNewsById(id, editMode) {
  return fetch(`${newsConstants.NEWS_API}/${id}?editMode=${editMode || ''}`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => {
    if ((resp && resp.ok)) {
      return resp.json();
    } else if ( resp.status === 401) {
      return resp.status;
    }
  }).then(resp => {
    return resp;
  }).catch((error) => {
    return error;
  });
}

export function getNewsByActivityId(activityId) {
  return fetch(`${newsConstants.NEWS_API}/byActivity/${activityId}`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => {
    if (!resp || !resp.ok) {
      throw new Error('Response code indicates a server error', resp);
    } else {
      return resp.json();
    }
  });
}

export function getNewsSpaces(newsId) {
  return fetch(`${newsConstants.NEWS_API}/${newsId}?fields=spaces`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => resp.json()).then(resp => {
    return resp;
  });
}

export function markNewsAsRead(newsId){
  return fetch(`${newsConstants.NEWS_API}/markAsRead/${newsId}`, {
    credentials: 'include',
    method: 'POST',
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.text();
    } else {
      throw new Error('Error while marking news as read');
    }
  });
}

export function getNews(filter, spaces, searchText, offset, limit, returnSize) {
  let url = `${newsConstants.NEWS_API}?author=${newsConstants.userName}&publicationState=published&filter=${filter}`;
  if (searchText) {
    url += `&text=${searchText}`;
  }
  if (spaces) {
    url += `&spaces=${spaces}`;
  }
  if (!isNaN(offset)) {
    url += `&offset=${offset}`;
  }
  if (!isNaN(limit)) {
    url += `&limit=${limit}`;
  }
  if (returnSize) {
    url += `&returnSize=${returnSize}`;
  }
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.json();
    } else {
      throw new Error('Error getting news list');
    }
  });
}

export function saveNews(news) {
  return fetch(`${newsConstants.NEWS_API}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify(news)
  }).then((data) => {
    return data.json();
  });
}

export function scheduleNews(news) {
  return fetch(`${newsConstants.NEWS_API}/schedule`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PATCH',
    body: JSON.stringify(news)
  }).then((data) => {
    return data.json();
  });
}

export function importFileFromUrl(url) {
  return fetch(url, {
    headers: {
      'Content-Type': 'blob'
    },
    credentials: 'include',
    method: 'GET',
  });
}

export function updateNews(news, post) {
  return fetch(`${newsConstants.NEWS_API}/${news.id}?post=${post}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    method: 'PUT',
    body: JSON.stringify(news)
  }).then(resp => resp.json());
}

export function clickOnEditButton(id) {
  return fetch(`${newsConstants.NEWS_API}/${id}/click`, {
    credentials: 'include',
    method: 'POST',
    body: 'edit'
  });
}

export function findUserSpaces(spaceName) {
  return fetch(`${newsConstants.SOCIAL_SPACES_SUGGESTION_API}?conditionToSearch=${spaceName}&currentUser=${newsConstants.userName}&typeOfRelation=confirmed`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(resp => resp.json()).then(json => json.options);
}

export function deleteDraft(newsId) {
  return fetch(`${newsConstants.NEWS_API}/${newsId}`, {
    credentials: 'include',
    method: 'DELETE'
  });
}

export function getSpaceById(id) {
  return fetch(`${newsConstants.SOCIAL_SPACE_API}/${id}`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => {
    if (resp && resp.ok) {
      return resp.json();
    } else {
      throw new Error(`Error getting space with id ${id}`);
    }
  });
}

export function getUserSpaces(offset, limit , filterType) {
  return fetch(`${newsConstants.SOCIAL_SPACE_API}?offset=${offset}&limit=${limit}&returnSize=true&filterType=${filterType}`, {
    credentials: 'include',
    method: 'GET',
  }).then((resp) => resp.json()).then(resp => {
    return resp;
  });
}

export function searchSpaces(searchText) {
  return fetch(`${newsConstants.SOCIAL_SPACES_SEARCH_API}?fields=id,url,displayName,avatarUrl&keyword=${searchText}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(resp => resp.json());
}

export function fetchFoldersAndFiles(currentDrive, workspace, parentPath) {
  return fetch(`/portal/rest/managedocument/getFoldersAndFiles/?driveName=${currentDrive}&workspaceName=${workspace}&currentFolder=${parentPath}`,
    {})
    .then(response => response.text())
    .then(xmlStr => (new window.DOMParser()).parseFromString(xmlStr, 'text/xml'))
    .then(xml => {
      return xml;
    });
}

export function getDrivers() {
  return fetch('/portal/rest/wcmDriver/getDrivers',
    {})
    .then(response => response.text())
    .then(xmlStr => (new window.DOMParser()).parseFromString(xmlStr, 'text/xml'))
    .then(xml => {
      return xml;
    });
}

export function escapeHTML(unsafeText) {
  const div = document.createElement('div');
  div.innerText = unsafeText;
  return div.innerHTML;
}

export function canUserCreateNews(spaceId) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news/canCreateNews/${eXo.env.portal.spaceId || spaceId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((resp) => resp && resp.ok && resp.json());
}

export function canScheduleNews(spaceId) {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news/canScheduleNews/${eXo.env.portal.spaceId || spaceId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((resp) => resp && resp.ok && resp.json());
}

export function deleteNews(newsId, isDraft, delay) {
  if (delay > 0) {
    localStorage.setItem('deletedNews', newsId);
  }
  return fetch(`${newsConstants.NEWS_API}/${newsId}?isDraft=${isDraft || ''}&delay=${delay || 0}`, {
    credentials: 'include',
    method: 'DELETE'
  }).then((resp) => {
    if (resp && !resp.ok) {
      throw new Error('Error when deleting news');
    }
  });
}

export function undoDeleteNews(newsId) {
  return fetch(`${newsConstants.NEWS_API}/${newsId}/undoDelete`, {
    method: 'POST',
    credentials: 'include',
  }).then((resp) => {
    if (resp && resp.ok) {
      localStorage.removeItem('deletedNews');
    } else {
      throw new Error('Error when undoing deleting news');
    }
  });
}

export function canPublishNews() {
  return fetch(`${eXo.env.portal.context}/${eXo.env.portal.rest}/v1/news/canPublishNews?spaceId=${eXo.env.portal.spaceId}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then((resp) => resp.json()).then(resp => {
    return resp;
  });
}
