package com.greenstack.farm2door.service.cart;

import com.greenstack.farm2door.dto.CartDto;
import com.greenstack.farm2door.model.Cart;
import com.greenstack.farm2door.model.User;

import java.math.BigDecimal;

public interface ICartService {
    Cart getCart(Long id);
    void clearCart(Long id);
    BigDecimal getTotalPrice(Long id);

    Cart initializeNewCart(User user);

    Cart getCartByUserId(Long userId);

    CartDto convertToCartDto(Cart cart);
}
