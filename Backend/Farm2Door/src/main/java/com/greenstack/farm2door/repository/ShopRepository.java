package com.greenstack.farm2door.repository;

import com.greenstack.farm2door.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends JpaRepository<Shop,Long> {
    Shop findByName(String name);
    boolean existsByName(String name);
    Shop findByUserId(Long userId);// mainly shop owner id
    boolean existsByUserId(Long userId);

}
