
class UserService {
  static getSessionUserData(token) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.RW_API_LOGIN_URL}/check-logged`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          const { status, statusText } = response;
          if (status === 200) return response.json();

          const errorObject = {
            errors: {
              status,
              details: statusText
            }
          };
          throw errorObject;
        })
        .then(data => resolve(data))
        .catch(errors => reject(errors));
    });
  }

  static logout() {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.CONTROL_TOWER_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => {
          const { status, statusText } = response;

          if (status === 200) return resolve();

          const errorObject = {
            errors: {
              status,
              details: statusText
            }
          };
          throw errorObject;
        })
        .catch((errors) => { reject(errors); });
    });
  }
}

export default UserService;
