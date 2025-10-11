package com.greenstack.farm2door.service.user;

import com.greenstack.farm2door.model.User;

public interface IUserService {
    void registerUser(String email, String password);
    User getUserById(Long id);

}
