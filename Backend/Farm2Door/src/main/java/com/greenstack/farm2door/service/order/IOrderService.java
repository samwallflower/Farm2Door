package com.greenstack.farm2door.service.order;

import com.greenstack.farm2door.dto.OrderDto;
import com.greenstack.farm2door.model.Order;

import java.util.List;

public interface IOrderService {
    Order placeOrder(Long userId);
    OrderDto getOrderById(Long orderId);

    List<OrderDto> getUserOrders(Long userId);

    List<OrderDto> getOrdersByShopId(Long shopId);

    OrderDto convertToDto(Order order);
}
