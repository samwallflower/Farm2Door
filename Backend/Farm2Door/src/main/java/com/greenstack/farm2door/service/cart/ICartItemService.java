package com.greenstack.farm2door.service.cart;

import com.greenstack.farm2door.model.CartItem;

public interface ICartItemService {
    void addItemToCart(Long cartId, Long productId,  int quantity);
    void removeItemFromCart(Long cartId, Long productId,  int quantity);
    void updateCartItems(Long cartId, Long productId,  int quantity);
    CartItem getCartItemById(Long cartId, Long productId);
}
