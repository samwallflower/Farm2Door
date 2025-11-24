package com.greenstack.farm2door.controller;


import com.greenstack.farm2door.dto.OrderDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Order;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.order.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/orders")
public class OrderController {

    private final IOrderService orderService;


    @PostMapping("/order/create")
    public ResponseEntity<ApiResponse> createOrder(@RequestParam Long userId){
        try {
            Order order = orderService.placeOrder(userId);
            OrderDto orderDto = orderService.convertToDto(order);
            return ResponseEntity.ok(new ApiResponse("Order placed successfully", orderDto));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Failed to place order: " + e.getMessage(), null));
        }
    }
    @GetMapping("/{orderId}/order")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long orderId) {
        try {
            OrderDto order = orderService.getOrderById(orderId);
            return ResponseEntity.ok(new ApiResponse("Order retrieved successfully", order));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }
    @GetMapping("/user/{userId}/orders")
    public ResponseEntity<ApiResponse> getUserOrders(@PathVariable Long userId) {
        try {
            List<OrderDto> orders = orderService.getUserOrders(userId);
            return orders.isEmpty()
                    ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Orders not found for current user!!", null))
                    : ResponseEntity.ok(new ApiResponse("Orders retrieved successfully", orders));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error retrieving orders: " + e.getMessage(), null));
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_SHOP_OWNER', 'ROLE_ADMIN')")
    @GetMapping("/shop/{shopId}/orders")
    public ResponseEntity<ApiResponse> getOrdersByShopId(@PathVariable Long shopId) {
        try {
            List<OrderDto> orders = orderService.getOrdersByShopId(shopId);
            return orders.isEmpty()
                    ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Orders not found for current shop", null))
                    : ResponseEntity.ok(new ApiResponse("Orders retrieved successfully", orders));
        } catch (Exception e) {
            return ResponseEntity.status(INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse("Error retrieving orders: " + e.getMessage(), null));
        }
    }
}
