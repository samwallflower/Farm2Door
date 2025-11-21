package com.greenstack.farm2door.repository;

import com.greenstack.farm2door.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository <CartItem, Long> {
    void deleteAllByCartId(Long id);
}
