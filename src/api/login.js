// define apis for login
export const login = async (formData) => {
    console.log('formdata',formData);
    const response = await fetch(
      "http://localhost:8000/user/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  };
  