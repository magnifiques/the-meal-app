let timer;

function setUser(userData, token, expirationTime) {
  localStorage.setItem("userData", JSON.stringify(userData));
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expirationTime);
}

function removeUser() {
  localStorage.removeItem("userData");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
}

export default {
  autoLogIn(context) {
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    const currentTime = new Date().getTime();

    const remainingTime = expirationTime - currentTime;

    if (remainingTime <= 0) {
      removeUser();
      return;
    }

    timer = setTimeout(() => {
      context.dispatch("logout");
    }, remainingTime);

    if (token && userData) {
      context.commit("setUserData", userData);
      context.commit("setIsAuthenticated", true);
    }
  },

  async signup(context, query) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_the_meal_db_backend}/users/signup`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: query.email,
            userName: query.userName,
            password: query.password,
          }),
        }
      );

      const responseData = await response.json();

      const userData = {
        email: query.email,
        userName: query.userName,
      };

      context.commit("setUserData", userData);
      context.commit("setIsAuthenticated", true);

      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      timer = setTimeout(() => {
        context.dispatch("logout");
      }, expirationTime);

      setUser(userData, responseData.token, expirationTime);
    } catch (error) {
      if (error) {
        throw new Error(error.message);
      }
    }
  },
  async login(context, query) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_the_meal_db_backend}/users/login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: query.email,
            password: query.password,
          }),
        }
      );

      const responseData = await response.json();

      const userData = {
        email: query.email,
        userName: responseData.userName,
      };

      context.commit("setUserData", userData);
      context.commit("setIsAuthenticated", true);

      const expirationTime = new Date().getTime() + 60 * 60 * 1000;
      timer = setTimeout(() => {
        context.dispatch("logout");
      }, expirationTime);

      setUser(userData, responseData.token, expirationTime);
    } catch (error) {
      if (error) {
        throw new Error(error.message);
      }
    }
  },
  async logout(context) {
    clearTimeout(timer);
    context.commit("setUserData", null);
    context.commit("setIsAuthenticated", false);
    removeUser();
  },

  async bookMarkMeal(_, query) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_the_meal_db_backend}/users/bookmark`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mealId: query.mealId,
          }),
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getMealIds(context) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_the_meal_db_backend}/users/getMealId`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      context.commit("setMealIds", responseData.mealIds);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async deleteBookmark(_, query) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_the_meal_db_backend}/users/deleteMealId`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mealId: query.mealId,
          }),
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
