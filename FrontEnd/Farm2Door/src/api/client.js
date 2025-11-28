// src/api/client.js
import axios from "axios";

// ⚠️ Make sure this matches your backend (port + api.prefix)
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

/**
 * Read token from localStorage (set in LoginPage after successful login)
 */
export const getAuthToken = () => localStorage.getItem("authToken");

/**
 * Attach Authorization: Bearer <token> to EVERY request if token exists
 */
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ======================================================================
//                             AUTH
// ======================================================================

// 🔐 LOGIN – sends JSON { "email": "...", "password": "..." }
export const loginUser = async (email, password) => {
    const body = {
        email: email,
        password: password,
    };

    const res = await api.post("/auth/login", body);
    // Backend returns ApiResponse: { message, data: { id, token } }
    return res.data;
};

export const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
};

// ======================================================================
//                                SHOPS
//   Based on ShopController:
//   @RequestMapping("${api.prefix}/shops")
// ======================================================================

// GET /shops/all  -> List<ShopDto>
export const fetchShops = async () => {
    const res = await api.get("/shops/all");
    // ApiResponse: { message, data: [...] }
    return res.data.data;
};

// GET /shops/shop/{shopId}/shop -> ShopDto
export const fetchShopById = async (id) => {
    const res = await api.get(`/shops/shop/${id}/shop`);
    return res.data.data;
};

// GET /shops/shop/by-shopName?shopName=...
export const fetchShopByName = async (shopName) => {
    const res = await api.get("/shops/shop/by-shopName", {
        params: { shopName },
    });
    return res.data.data;
};

// GET /shops/shop/user/{userId}/shop -> ShopDto (for logged-in user)
export const fetchShopByUserId = async (userId) => {
    const res = await api.get(`/shops/shop/user/${userId}/shop`);
    return res.data.data;
};

// GET /shops/shop/{shopId}/products/count -> Long
export const fetchProductCountForShop = async (shopId) => {
    const res = await api.get(`/shops/shop/${shopId}/products/count`);
    return res.data.data;
};

// POST /shops/add/{userId}/shop  (ROLE_USER / ROLE_ADMIN)
export const addShop = async (userId, shopPayload) => {
    // shopPayload must match AddShopRequest in backend
    const res = await api.post(`/shops/add/${userId}/shop`, shopPayload);
    return res.data.data; // ShopDto
};

// PUT /shops/shop/{shopId}/update  (ROLE_SHOP_OWNER / ROLE_ADMIN)
export const updateShop = async (shopId, updatePayload) => {
    // updatePayload must match UpdateShopRequest in backend
    const res = await api.put(`/shops/shop/${shopId}/update`, updatePayload);
    return res.data.data; // ShopDto
};

// DELETE /shops/shop/{shopId}/delete  (ROLE_SHOP_OWNER / ROLE_ADMIN)
export const deleteShop = async (shopId) => {
    const res = await api.delete(`/shops/shop/${shopId}/delete`);
    return res.data.data; // shopId
};

// GET /shops/shop/{shopId}/orders  (ROLE_SHOP_OWNER / ROLE_ADMIN)
export const fetchOrdersForShop = async (shopId) => {
    const res = await api.get(`/shops/shop/${shopId}/orders`);
    return res.data.data; // List<OrderDto>
};