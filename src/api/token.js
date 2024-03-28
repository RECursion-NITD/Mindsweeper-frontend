// define apis for login
export const refresh = async (formData) => {
    const response = await fetch(
      "http://localhost:8000/user/api/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh:formData.refresh,
        }),
      }
    );
    const data = await response.json();
    console.log("data", data);
    return data;
  };
  