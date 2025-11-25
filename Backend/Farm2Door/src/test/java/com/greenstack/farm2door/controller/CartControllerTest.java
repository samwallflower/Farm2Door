package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.CartDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Cart;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.cart.ICartService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.NOT_FOUND;

class CartControllerTest {

    @Mock
    private ICartService cartService;

    @InjectMocks
    private CartController cartController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCart_Success() throws ResourceNotFoundException {
        Cart cart = new Cart(); // create a sample cart
        CartDto cartDto = new CartDto(); // create a sample DTO

        when(cartService.getCart(1L)).thenReturn(cart);
        when(cartService.convertToCartDto(cart)).thenReturn(cartDto);

        ResponseEntity<ApiResponse> response = cartController.getCart(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Cart retrieved successfully", response.getBody().getMessage());
        assertEquals(cartDto, response.getBody().getData());
    }

    @Test
    void testGetCart_NotFound() throws ResourceNotFoundException {
        when(cartService.getCart(1L)).thenThrow(new ResourceNotFoundException("Cart not found"));

        ResponseEntity<ApiResponse> response = cartController.getCart(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Cart not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetTotalAmount_Success() throws ResourceNotFoundException {
        BigDecimal totalPrice = BigDecimal.valueOf(123.45);

        when(cartService.getTotalPrice(1L)).thenReturn(totalPrice);

        ResponseEntity<ApiResponse> response = cartController.getTotalAmount(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Total price retrieved successfully", response.getBody().getMessage());
        assertEquals(totalPrice, response.getBody().getData());
    }

    @Test
    void testGetTotalAmount_NotFound() throws ResourceNotFoundException {
        when(cartService.getTotalPrice(1L)).thenThrow(new ResourceNotFoundException("Cart not found"));

        ResponseEntity<ApiResponse> response = cartController.getTotalAmount(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Cart not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }
}
