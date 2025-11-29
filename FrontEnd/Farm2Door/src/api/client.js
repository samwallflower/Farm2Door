// src/api/client.js
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const getAuthToken = () => localStorage.getItem("authToken");

// ✅ Request interceptor – but skip auth for login/register
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();

        // normalize URL so we can check it
        const url = config.url || "";

        // ❌ Do NOT send Authorization header for login or register
        const isAuthEndpoint =
            url.startsWith("/auth/login") || url.startsWith("/auth/register");

        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);
export const registerUser = async (firstName, lastName, email, password) => {
    const body = {
        firstName: firstName,
        lastName: lastName,
        email,
        password
    };

    const res = await api.post("/users/add", body);
    return res.data;
};

export const updateUser = async (userId, firstName, lastName) => {
    const body = {
        firstName: firstName,
        lastName: lastName
    };

    const res = await api.put(`/users/${userId}/update`, body);
    return res.data;
};



// (optional but recommended) Response interceptor to handle expired tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // clear invalid/expired token
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");

            // you can redirect or just let the component handle it
            // window.location.href = "/";  // if you want auto-redirect to login
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH ====================

export const loginUser = async (email, password) => {
    const body = { email, password };

    const res = await api.post("/auth/login", body);
    // ApiResponse: { message, data: { id, token } }
    return res.data;
};

export const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
};

// ==================== SHOPS ====================

// GET /shops/shop/user/{userId}/shop
export const fetchShopByUserId = async (userId) => {
    const res = await api.get(`/shops/shop/user/${userId}/shop`);
    return res.data.data; // ShopDto
};

// POST /shops/add/{userId}/shop
export const addShop = async (userId, shopPayload) => {
    const res = await api.post(`/shops/add/${userId}/shop`, shopPayload);
    return res.data.data; // ShopDto
};

// GET /shops/shop/{shopId}/orders
export const fetchOrdersForShop = async (shopId) => {
    const res = await api.get(`/shops/shop/${shopId}/orders`);
    return res.data.data; // List<OrderDto>
};

// ==================== PRODUCTS FOR SHOP ====================

// ⚠️ Adjust this path if your ProductController uses a different URL
// Example assumption: @RequestMapping("${api.prefix}/products")
// and: @GetMapping("/shop/{shopId}/products")
export const fetchProductsForShop = async (shopId) => {
    const res = await api.get(`/products/shops/${shopId}/products`);
    return res.data.data; // List<ProductDto>
};
export const addProductToShop = async (shopId, productPayload) => {
    const res = await api.post(`/products/shop/${shopId}/product/add`, productPayload);
    return res.data.data; // ProductDto
};