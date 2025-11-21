package com.greenstack.farm2door.service.cart;

import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Cart;
import com.greenstack.farm2door.model.CartItem;
import com.greenstack.farm2door.model.Product;
import com.greenstack.farm2door.repository.CartItemRepository;
import com.greenstack.farm2door.repository.CartRepository;
import com.greenstack.farm2door.service.product.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor

public class CartItemService implements ICartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final IProductService productService;
    private final ICartService cartService;
    @Override
    public void addItemToCart(Long cartId, Long productId, int quantity) {
        Cart cart = cartService.getCart(cartId);
        Product product = productService.getProductById(productId);
        CartItem cartItem = cart.getItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(new CartItem());
        if(cartItem.getId()== null){
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());
        }
        else{
            cartItem.setQuantity(cartItem.getQuantity() + quantity);

        }
        cartItem.setTotalPrice();
        cart.addItem(cartItem);
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long cartId, Long productId, int quantity) {
        Cart cart = cartService.getCart(cartId);
        CartItem itemToRemove = getCartItemById(cartId, productId);

        cart.removeItem(itemToRemove);
        cartRepository.save(cart);

    }

    @Override
    public void updateCartItems(Long cartId, Long productId, int quantity) {

        Cart cart = cartService.getCart(cartId);
        cart.getItems()
                .stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresent(cartItem -> {
                    cartItem.setQuantity(quantity);
                    cartItem.setUnitPrice(cartItem.getProduct().getPrice());
                    cartItem.setTotalPrice();
                });
        BigDecimal totalAmount = cart.getItems()
                .stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);

    }

    @Override
    public CartItem getCartItemById(Long cartId, Long productId) {
        Cart cart = cartService.getCart(cartId);
        return cart.getItems()
                .stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("CartItem not found for product ID: " + productId));
    }
}
