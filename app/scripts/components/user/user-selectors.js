const getSessionUserData = token => new Promise((resolve) => {
  fetch(`${process.env.RW_API_LOGIN_URL}/check-logged`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(response => resolve(response.json()))
  .catch((errors) => {
    console.error(errors);
  });
});

export default getSessionUserData;
