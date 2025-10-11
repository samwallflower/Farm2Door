package com.greenstack.farm2door.repository;

import com.greenstack.farm2door.model.ShopOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopOwnerRepository extends JpaRepository<ShopOwner, Long> {
}
