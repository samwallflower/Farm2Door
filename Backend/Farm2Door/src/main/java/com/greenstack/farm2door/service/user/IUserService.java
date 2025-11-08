package com.greenstack.farm2door.service.user;

import com.greenstack.farm2door.dto.UserDto;
import com.greenstack.farm2door.model.User;
import com.greenstack.farm2door.request.CreateUserRequest;
import com.greenstack.farm2door.request.UpdateUserRequest;

public interface IUserService {
    User getUserById(Long id);
    User createUser(CreateUserRequest request);
    User updateUser(UpdateUserRequest request, Long id);
    void deleteUser(Long id);

    UserDto convertToDto(User user);

}
