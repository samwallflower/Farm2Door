package com.greenstack.farm2door.service.user;

import com.greenstack.farm2door.dto.UserDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Role;
import com.greenstack.farm2door.model.User;
import com.greenstack.farm2door.repository.RoleRepository;
import com.greenstack.farm2door.repository.UserRepository;
import com.greenstack.farm2door.request.CreateUserRequest;
import com.greenstack.farm2door.request.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).
                orElseThrow(()-> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public User createUser(CreateUserRequest request) {
        return Optional.of(request).filter(user-> !userRepository.existsByEmail(user.getEmail()))
                .map(req -> {
                    Role userRole = roleRepository.findByName("ROLE_USER")
                            .orElseThrow(() -> new ResourceNotFoundException("Role : ROLE_USER not found"));
                    User user = new User();
                    user.setFirstName(req.getFirstName());
                    user.setLastName(req.getLastName());
                    user.setEmail(req.getEmail());
                    user.setPassword(passwordEncoder.encode(req.getPassword()));
                    user.setRoles(Set.of(userRole));
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new AlreadyExistsException("Oops!! User with email already exists: " + request.getEmail()));
    }

    @Override
    public User updateUser(UpdateUserRequest request, Long id) {
        return userRepository.findById(id)
                .map(existingUser ->{
                    existingUser.setFirstName(request.getFirstName());
                    existingUser.setLastName(request.getLastName());
                    return userRepository.save(existingUser);
                }).orElseThrow(()-> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.findById(id)
                .ifPresentOrElse(userRepository::delete, ()->{
                    throw new ResourceNotFoundException("User not found with id: " + id);
                });
    }

    @Override
    public UserDto convertToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }
}
