 class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _responce(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._responce(res));
  }



    getInitialCards(jwt) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        }
      })
        .then(res => this._responce(res));
    }
  

    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            about: data.about
          })
        })
          .then(res => this._responce(res));
      }


    addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(res => this._responce(res));
    }
  

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._responce(res));
    }
  

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers
      })
        .then(res => this._responce(res));
    }
  

    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar
        })
      })
        .then(res => this._responce(res));
    }
  }

  const api = new Api({
    baseUrl: 'https://api.oranlon.nomoredomains.icu',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  });




  export default api;