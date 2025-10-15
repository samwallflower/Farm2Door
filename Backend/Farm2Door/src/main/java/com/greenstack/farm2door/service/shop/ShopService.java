package com.greenstack.farm2door.service.shop;

import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.dto.ShopDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.*;
import com.greenstack.farm2door.repository.ProductRepository;
import com.greenstack.farm2door.repository.ShopOwnerRepository;
import com.greenstack.farm2door.repository.ShopRepository;
import com.greenstack.farm2door.repository.UserRepository;
import com.greenstack.farm2door.request.AddShopRequest;
import com.greenstack.farm2door.request.UpdateShopRequest;
import com.greenstack.farm2door.service.user.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShopService implements IShopService{
    private final ShopRepository shopRepository;
    private final IUserService userService;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ShopOwnerRepository shopOwnerRepository;
    private final ModelMapper modelMapper;
    @Override
    public Shop addShop(AddShopRequest shop, Long userId) {
        // check if the shop with the same name already exists
        // so we don't have duplicate shop names
        // we should also check if the user already has a shop
        // if yes, then we should not allow to create another shop for the same user
        // as one user can have only one shop
        if (shopRepository.existsByShopOwner_User_Id(userId)) {
            throw new AlreadyExistsException("User already has a shop with userId: " + userId);
        }

        if (shopRepository.existsByName(shop.getName())) {
            throw new AlreadyExistsException("Shop already exists with name: " + shop.getName());
        }

        // this is a temporary solution
        // ideally we should have a separate service to handle shop owners
        // but for now, we will create a shop owner from the user
        // we need to get the shop Owner object from the user repo then use it to set the shop owner
        User user = userService.getUserById(userId);
        // here we get the user object from the user repository using the userId
        // then we use it to create a ShopOwner object
        ShopOwner shopOwner = new ShopOwner();
        shopOwner.setUser(user);
        ShopOwner savedShopOwner = shopOwnerRepository.save(shopOwner);

        Shop newShop = createShop(shop);
        newShop.setShopOwner(shopOwner);// here we need shopOwner object
        Shop savedShop = shopRepository.save(newShop);

        savedShopOwner.setShop(savedShop);
        shopOwnerRepository.save(savedShopOwner);
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

    @Transactional
    @Override
    public void deleteShopById(Long id) {
        // check if shop exists
        // if it exists, delete it
        // if not, throw exception

//        shopRepository.findById(id)
//                .ifPresentOrElse(shopRepository::delete,
//                       ()-> {throw new ResourceNotFoundException("Shop not found");});
        try{
        Shop shop = shopRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Shop not found"));

        // first we need to dissociate the shop from the shop owner
        ShopOwner shopOwner = shop.getShopOwner();
        if (shopOwner != null) {
            shopOwner.setShop(null);
            shop.setShopOwner(null);
            shopOwnerRepository.delete(shopOwner);
            shopOwnerRepository.flush();
            System.out.println("Associated shop owner with id " + shopOwner.getId() + " deleted successfully");
        }
        shopRepository.delete(shop);
        shopRepository.flush();



        System.out.println("Shop with id " + id + " deleted successfully");
        } catch (Exception e) {
            System.out.println("Error deleting shop with id " + id + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
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
    public Shop getShopByOwnerId(Long ownerId) {
        return shopRepository.findByShopOwnerId(ownerId);
    }

    @Override
    public boolean existsByOwnerId(Long ownerId) {
        return shopRepository.existsByShopOwnerId(ownerId);
    }

    @Override
    public boolean existsByName(String shopName) {
        return shopRepository.existsByName(shopName);
    }

    @Override
    public Shop getShopByUserId(Long userId) {
        return shopRepository.findByShopOwner_User_Id(userId);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return shopRepository.existsByShopOwner_User_Id(userId);
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
