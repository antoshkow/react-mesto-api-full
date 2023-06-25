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

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(this._checkResponse);
  }

  editProfile(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(userData),
    })
    .then(this._checkResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(cardData),
    })
    .then(this._checkResponse);
  }

  like(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(this._checkResponse);
  }

  unlike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
    .then(this._checkResponse);
  }

  updateAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(userData),
    })
    .then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, (isLiked ? {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    } : {
      method: 'PUT',
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    }))
    .then(this._checkResponse);
  }
}

const api = new Api({
  url: process.env.NODE_ENV === 'production'
    ? 'https://antoshkow-mesto-api-9c6cfd238e59.herokuapp.com/'
    : 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
