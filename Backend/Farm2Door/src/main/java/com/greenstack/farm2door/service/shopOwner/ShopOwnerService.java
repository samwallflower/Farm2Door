package com.greenstack.farm2door.service.shopOwner;

import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.ShopOwner;
import com.greenstack.farm2door.model.User;
import com.greenstack.farm2door.repository.ShopOwnerRepository;
import com.greenstack.farm2door.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShopOwnerService implements IShopOwnerService{
    private final UserRepository userRepository;
    private final ShopOwnerRepository shopOwnerRepository;
    @Override
    public void registerShopOwner(Long userId) {
        User user = userRepository.findById(userId).
                orElseThrow(()-> new ResourceNotFoundException("User not found with id: " + userId));
        // logic to register shop owner
        ShopOwner shopOwner = new ShopOwner();
        shopOwner.setUser(user);
        user.setShopOwner(shopOwner);
        userRepository.save(user);// bcz we have set the shop owner in the user
        shopOwnerRepository.save(shopOwner);
    }
}
