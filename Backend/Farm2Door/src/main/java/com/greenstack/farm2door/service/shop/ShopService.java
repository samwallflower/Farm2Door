package com.greenstack.farm2door.service.shop;

import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.dto.ShopDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.*;
import com.greenstack.farm2door.repository.ProductRepository;
import com.greenstack.farm2door.repository.RoleRepository;
import com.greenstack.farm2door.repository.ShopRepository;
import com.greenstack.farm2door.repository.UserRepository;
import com.greenstack.farm2door.request.AddShopRequest;
import com.greenstack.farm2door.request.UpdateShopRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService implements IShopService{
    private final ShopRepository shopRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    @Override
    public Shop addShop(AddShopRequest shop, Long userId) {
        // check if the shop with the same name already exists
        // so we don't have duplicate shop names
        // we should also check if the user already has a shop
        // if yes, then we should not allow to create another shop for the same user
        // as one user can have only one shop
        if (shopRepository.existsByShopOwnerId(userId)) {
            throw new AlreadyExistsException("User already has a shop with userId: " + userId);
        }

        if (shopRepository.existsByName(shop.getName())) {
            throw new AlreadyExistsException("Shop already exists with name: " + shop.getName());
        }

        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User not found with id: " + userId));


        Shop newShop = createShop(shop);
        newShop.setShopOwner(user);
        user.setShop(newShop);
        Role role = roleRepository.findByName("SHOP_OWNER")
                        .orElseGet(()-> roleRepository.save(new Role("SHOP_OWNER")));
        user.getRoles().add(role); // assign SHOP_OWNER role to the user

        return shopRepository.save(newShop);
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
                .orElseThrow(()->
                        new ResourceNotFoundException("Shop not found"));
    }

    @Override
    public Shop updateShop(Long id, UpdateShopRequest shop) {
        // find the shop by id
        // if found, update the shop
        return shopRepository.findById(id)
                .map(existingShop -> UpdateExistingShop(existingShop, shop))
                .map(shopRepository::save)
                .orElseThrow(()-> new ResourceNotFoundException("Shop not found"));
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
    public void deleteShopById(Long id) {
        // check if shop exists
        // if it exists, delete it
        // if not, throw exception
        Shop shop = shopRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Shop not found with id: " + id));
        User shopOwner = shop.getShopOwner();
        if (shopOwner != null) {
            shopOwner.setShop(null);
            userRepository.save(shopOwner);
        }
        shopRepository.deleteById(id);
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
        return shopRepository.findByShopOwnerId(userId);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return shopRepository.existsByShopOwnerId(userId);
    }

    @Override
    public Long countProductsInShop(Long shopId) {
        return productRepository.countByShopId(shopId);
    }

    @Override
    public ShopDto convertToDto(Shop shop) {
        ShopDto shopDto = modelMapper.map(shop, ShopDto.class);
        List<Product> products = productRepository.findByShopId(shop.getId());
        List<ProductDto> productDtos = products.stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .toList();
        shopDto.setProducts(productDtos);
        // we will conver the orders later when we have Order Service .
        return shopDto;
    }

    @Override
    public List<ShopDto> getConvertedShops(List<Shop> shops) {
        return shops.stream()
                .map(this::convertToDto)
                .toList();
    }

}
