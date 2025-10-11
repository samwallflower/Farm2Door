package com.greenstack.farm2door.service.shop;

import com.greenstack.farm2door.model.Order;
import com.greenstack.farm2door.model.Shop;
import com.greenstack.farm2door.request.AddShopRequest;
import com.greenstack.farm2door.request.UpdateShopRequest;

import java.util.List;

public interface IShopService {
    Shop addShop(AddShopRequest shop, Long userId);
    Shop getShopByName(String name);
    Shop getShopById(Long id);
    Shop updateShop(Long id, UpdateShopRequest shop);
    void deleteShop(Long id);
    // this should be in the order service but for simplicity we will keep it here for now
    // later we can move it to order service
    List<Order> getOrdersByShopId(Long shopId);
    List<Shop> getAllShops();
    boolean existsByName(String shopName);
    Shop getShopByUserId(Long userId);// mainly shop owner id
    boolean existsByUserId(Long userId);

}
