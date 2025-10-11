package com.greenstack.farm2door.service.shop;

import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Order;
import com.greenstack.farm2door.model.Shop;
import com.greenstack.farm2door.model.ShopOwner;
import com.greenstack.farm2door.repository.ShopRepository;
import com.greenstack.farm2door.request.AddShopRequest;
import com.greenstack.farm2door.request.UpdateShopRequest;
import com.greenstack.farm2door.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService implements IShopService{
    private final ShopRepository shopRepository;
    private final IUserService userService;

    @Override
    public Shop addShop(AddShopRequest shop, Long userId) {
        // check if the shop with the same name already exists
        // so we don't have duplicate shop names
        // we should also check if the user already has a shop
        // if yes, then we should not allow to create another shop for the same user
        // as one user can have only one shop
        if (shopRepository.existsByUserId(userId)) {
            throw new AlreadyExistsException("User already has a shop with userId: " + userId);
        }

        if (shopRepository.existsByName(shop.getName())) {
            throw new AlreadyExistsException("Shop already exists with name: " + shop.getName());
        }

        // we need to get the shop Owner object from the user repo then use it to set the shop owner
        ShopOwner shopOwner = (ShopOwner) userService.getUserById(userId);
        // here we get the user object from the user repository using the userId
        // then we cast it to ShopOwner object
        Shop newShop = createShop(shop);
        newShop.setShopOwner(shopOwner);// here we need shopOwner object
        // should we save the shop owner too?
        Shop savedShop = shopRepository.save(newShop);
        shopOwner.setShop(savedShop);

        return savedShop;
    }

    private Shop createShop(AddShopRequest request) {
        return new Shop(
                request.getName(),
                request.getAddress(),
                request.getContactNumber(),
                request.getContactEmail(),
                request.getDescription()
        );
    }

    @Override
    public Shop getShopByName(String name) {
        return shopRepository.findByName(name);
    }

    @Override
    public Shop getShopById(Long id) {
        return shopRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Shop not found with id: " + id));
    }

    @Override
    public Shop updateShop(Long id, UpdateShopRequest shop) {
        // find the shop by id
        // if found, update the shop
        return shopRepository.findById(id)
                .map(existingShop -> UpdateExistingShop(existingShop, shop))
                .map(shopRepository::save)
                .orElseThrow(()-> new ResourceNotFoundException("Shop not found with id: " + id));
    }

    private Shop UpdateExistingShop(Shop existingShop, UpdateShopRequest shop) {
        // here we need to check if the name already exists for another shop
        if (!existingShop.getName().equals(shop.getName()) && shopRepository.existsByName(shop.getName())) {
            throw new AlreadyExistsException("Shop already exists with name: " + shop.getName() + ", please choose a different name.");
        }
        existingShop.setName(shop.getName());
        existingShop.setAddress(shop.getAddress());
        existingShop.setContactNumber(shop.getContactNumber());
        existingShop.setContactEmail(shop.getContactEmail());
        existingShop.setDescription(shop.getDescription());
        return existingShop;
    }

    @Override
    public void deleteShop(Long id) {
        // check if shop exists
        // if exists, delete it
        // if not, throw exception
        shopRepository.findById(id)
                .ifPresentOrElse(shopRepository::delete,
                        ()-> {throw new ResourceNotFoundException("Shop not found with id: " + id);});
    }

    @Override
    public List<Order> getOrdersByShopId(Long shopId) {
        return List.of(); // This should ideally fetch orders from an OrderRepository based on shopId
        // we will implement this later when we have OrderRepository
    }

    @Override
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @Override
    public boolean existsByName(String shopName) {
        return shopRepository.existsByName(shopName);
    }

    @Override
    public Shop getShopByUserId(Long userId) {
        return shopRepository.findByUserId(userId);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return shopRepository.existsByUserId(userId);
    }
}
