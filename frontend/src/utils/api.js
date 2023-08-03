// import { token, cohortId } from './constants'

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _resStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._resStatus)
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
  }

  updateUserInfo(name, about) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  updateUserAvatar(avatar) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: this._headers,
    })
  }

  addNewCard(name, link) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      credentials: 'include',
      headers: this._headers,
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.rockelic.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
