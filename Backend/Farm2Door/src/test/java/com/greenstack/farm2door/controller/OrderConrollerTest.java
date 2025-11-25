package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.OrderDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Order;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.order.IOrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderControllerTest {

    @Mock
    private IOrderService orderService;

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateOrder_Success() throws Exception {
        Order order = new Order();
        OrderDto orderDto = new OrderDto();

        when(orderService.placeOrder(1L)).thenReturn(order);
        when(orderService.convertToDto(order)).thenReturn(orderDto);

        ResponseEntity<ApiResponse> response = orderController.createOrder(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Order placed successfully", response.getBody().getMessage());
        assertEquals(orderDto, response.getBody().getData());
    }

    @Test
    void testCreateOrder_Failure() throws Exception {
        when(orderService.placeOrder(1L)).thenThrow(new RuntimeException("DB error"));

        ResponseEntity<ApiResponse> response = orderController.createOrder(1L);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody().getMessage().contains("Failed to place order"));
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetOrderById_Success() throws ResourceNotFoundException {
        OrderDto orderDto = new OrderDto();

        when(orderService.getOrderById(1L)).thenReturn(orderDto);

        ResponseEntity<ApiResponse> response = orderController.getOrderById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Order retrieved successfully", response.getBody().getMessage());
        assertEquals(orderDto, response.getBody().getData());
    }

    @Test
    void testGetOrderById_NotFound() throws ResourceNotFoundException {
        when(orderService.getOrderById(1L)).thenThrow(new ResourceNotFoundException("Order not found"));

        ResponseEntity<ApiResponse> response = orderController.getOrderById(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Order not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetUserOrders_Success() throws ResourceNotFoundException {
        OrderDto order1 = new OrderDto();
        OrderDto order2 = new OrderDto();
        List<OrderDto> orders = Arrays.asList(order1, order2);

        when(orderService.getUserOrders(1L)).thenReturn(orders);

        ResponseEntity<ApiResponse> response = orderController.getUserOrders(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Orders retrieved successfully", response.getBody().getMessage());
        assertEquals(orders, response.getBody().getData());
    }

    @Test
    void testGetUserOrders_NotFound() throws ResourceNotFoundException {
        when(orderService.getUserOrders(1L)).thenThrow(new ResourceNotFoundException("No orders found"));

        ResponseEntity<ApiResponse> response = orderController.getUserOrders(1L);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("No orders found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }
}
