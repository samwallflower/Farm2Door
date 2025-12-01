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
export const fetchUserById = async (userId) => {
    const res = await api.get(`/users/${userId}/user`);
    return res.data.data; // UserDto
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
export const updateShop = async (shopId, updatePayload) => {
    const res = await api.put(`/shops/shop/${shopId}/update`, updatePayload);
    return res.data.data; // ShopDto
};

// DELETE /shops/shop/{shopId}/delete
export const deleteShop = async (shopId) => {
    const res = await api.delete(`/shops/shop/${shopId}/delete`);
    return res.data; // ApiResponse
};
export const fetchAllShops = async () => {
    const res = await api.get("/shops/all");
    return res.data.data; // List<ShopDto>
};

// GET /shops/shop/{shopId}/shop
export const fetchShopById = async (shopId) => {
    const res = await api.get(`/shops/shop/${shopId}/shop`);
    return res.data.data; // ShopDto
};

// GET /shops/shop/by-shopName?shopName=...
export const fetchShopByName = async (shopName) => {
    const res = await api.get("/shops/shop/by-shopName", {
        params: { shopName },
    });
    return res.data.data; // ShopDto
};

// GET /shops/shop/{shopId}/products/count
export const countProductsInShop = async (shopId) => {
    const res = await api.get(`/shops/shop/${shopId}/products/count`);
    return res.data.data; // Long
};

// ==================== PRODUCTS FOR SHOP ====================

export const fetchProductsForShop = async (shopId) => {
    const res = await api.get(`/products/shops/${shopId}/products`);
    return res.data.data; // List<ProductDto>
};
export const addProductToShop = async (shopId, productPayload) => {
    const res = await api.post(`/products/shop/${shopId}/product/add`, productPayload);
    return res.data.data; // ProductDto
};

export const fetchProductsByCategory = async (categoryName) => {
  const res = await api.get(`/products/category/${categoryName}/all/products`);
  return res.data.data; // ApiResponse → { message, data: [...] }
};
// GET product by id
export const fetchProductById = async (productId) => {
    const res = await api.get(`/products/product/${productId}/product`);
    return res.data.data; // ProductDto
};
export const updateProduct = async (shopId, productId, payload) => {
    const res = await api.put(
        `/products/shop/${shopId}/product/${productId}/update`,
        payload
    );
    return res.data.data; // ProductDto
};
// ✅ delete product
// matches: @DeleteMapping("/shop/{shopId}/product/{productId}/delete")
export const deleteProduct = async (shopId, productId) => {
    const res = await api.delete(
        `/products/shop/${shopId}/product/${productId}/delete`
    );
    return res.data; // ApiResponse
};
export const fetchOrdersForUser = async (userId) => {
    const res = await api.get(`/user/${userId}/orders`);
    return res.data.data; // List<OrderDto>
};
// ==================== PRODUCT IMAGES ====================

// POST /images/upload  (files + productId)
export const uploadProductImages = async (productId, files) => {
    const formData = new FormData();

    // backend expects List<MultipartFile> named "files"
    files.forEach((file) => {
        formData.append("files", file);
    });
    formData.append("productId", productId);

    const res = await api.post("/images/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data", // override JSON default
        },
    });

    // ApiResponse("Upload successful", List<ImageDto>)
    return res.data.data;
};


// GET /images/product/{productId}/images
export const fetchImagesForProduct = async (productId) => {
    const res = await api.get(`/images/product/${productId}/images`);
    return res.data.data; // List<ImageDto>
};

