package com.greenstack.farm2door.repository;

import com.greenstack.farm2door.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findByShopId(Long shopId);

}
