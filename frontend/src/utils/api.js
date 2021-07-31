class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

  editProfile(userData, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
    .then(this._checkResponse);
  }

  addNewCard(cardData, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardData),
    })
    .then(this._checkResponse);
  }

  like(cardId, token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

  unlike(cardId, token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
    .then(this._checkResponse);
  }

  updateAvatar(userData, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/likes/${cardId}`, (isLiked ? {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    } : {
      method: 'PUT',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    }))
    .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://api.antoshkow.mesto.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
