package com.greenstack.farm2door.repository;

import com.greenstack.farm2door.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByIdAndShopId(Long productId, Long shopId);

    List<Product> findByShopId(Long shopId);

    List<Product> findByCategoryName(String category);

    List<Product> findByName(String name);

    List<Product> findByShopName(String shopName);

    List<Product> findByShopNameAndCategoryName(String shopName, String categoryName);

    boolean existsByNameAndShop(String name, String shopName);

    Long countByShopId(Long shopId);// Counting all products in a shop


}
