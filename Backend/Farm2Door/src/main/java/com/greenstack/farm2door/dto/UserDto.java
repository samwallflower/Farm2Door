package com.andromeda.dreamshops.dto;


import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private List<com.andromeda.dreamshops.dto.OrderDto> orders;
    private com.andromeda.dreamshops.dto.CartDto cart;
}
