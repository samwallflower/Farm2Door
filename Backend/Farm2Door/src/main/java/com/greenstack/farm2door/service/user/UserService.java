package com.greenstack.farm2door.service.user;

import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.User;
import com.greenstack.farm2door.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    @Override
    public void registerUser(String email, String password) {

    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("User not found with id: " + id));
    }
}
