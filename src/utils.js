//includes all requests to the server
// login api
export const login = (credential) => { //credential 获取 账号 密码，
    const { username, password } = credential
    // const loginUrl = `/login?username=${credential.username}&password=${credential.password}`;
    const loginUrl = `/login?username=${username}&password=${password}`; // 账号密码 生成url 变量 给fetch 去访问。

    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => { // 返回了一个response from fetch， then 可以访问response
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to log in");
        }
    });
};

// fetch getRestaurant   *****************************************************************************
export const getRestaurants = () => {
    return fetch("/restaurants").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get restaurants");
        }

        return response.json();
    });
};

// fetch Menu    *****************************************************************************
export const getMenus = (restId) => {
    return fetch(`/restaurant/${restId}/menu`).then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get menus");
        }

        return response.json();
    });
};

// fetch cart    *****************************************************************************
export const getCart = () => {
    return fetch("/cart").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to get shopping cart data");
        }

        return response.json();
    });
};


//checkout api *****************************************************************************
export const checkout = () => {
    return fetch("/checkout").then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to checkout");
        }
    });
};

//add item to cart api ******************************************************************************
export const addItemToCart = (itemId) => {
    return fetch(`/order/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }).then((response) => {
        if (response.status < 200 || response.status >= 300
        ) {
            throw Error("Fail to add menu item to shopping cart");
        }
    });
};