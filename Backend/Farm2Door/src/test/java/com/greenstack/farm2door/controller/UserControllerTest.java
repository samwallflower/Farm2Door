package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.UserDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.User;
import com.greenstack.farm2door.request.CreateUserRequest;
import com.greenstack.farm2door.request.UpdateUserRequest;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.user.IUserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

class UserControllerTest {

    @Mock
    private IUserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserById_Success() throws ResourceNotFoundException {
        User user = new User();
        UserDto dto = new UserDto();

        when(userService.getUserById(1L)).thenReturn(user);
        when(userService.convertToDto(user)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = userController.getUserById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User retrieved successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testGetUserById_NotFound() throws ResourceNotFoundException {
        when(userService.getUserById(1L)).thenThrow(new ResourceNotFoundException("User not found"));

        ResponseEntity<ApiResponse> response = userController.getUserById(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("User not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testCreateUser_Success() throws AlreadyExistsException {
        CreateUserRequest request = new CreateUserRequest();
        User user = new User();
        UserDto dto = new UserDto();

        when(userService.createUser(request)).thenReturn(user);
        when(userService.convertToDto(user)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = userController.createUser(request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User created successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testCreateUser_AlreadyExists() throws AlreadyExistsException {
        CreateUserRequest request = new CreateUserRequest();
        when(userService.createUser(request)).thenThrow(new AlreadyExistsException("User already exists"));

        ResponseEntity<ApiResponse> response = userController.createUser(request);

        assertEquals(CONFLICT, response.getStatusCode());
        assertEquals("User already exists", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testUpdateUser_Success() throws ResourceNotFoundException {
        UpdateUserRequest request = new UpdateUserRequest();
        User user = new User();
        UserDto dto = new UserDto();

        when(userService.updateUser(request, 1L)).thenReturn(user);
        when(userService.convertToDto(user)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = userController.updateUser(request, 1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User updated successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testUpdateUser_NotFound() throws ResourceNotFoundException {
        UpdateUserRequest request = new UpdateUserRequest();
        when(userService.updateUser(request, 1L)).thenThrow(new ResourceNotFoundException("User not found"));

        ResponseEntity<ApiResponse> response = userController.updateUser(request, 1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("User not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testDeleteUser_Success() throws ResourceNotFoundException {
        doNothing().when(userService).deleteUser(1L);

        ResponseEntity<ApiResponse> response = userController.deleteUser(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("User deleted successfully", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testDeleteUser_NotFound() throws ResourceNotFoundException {
        doThrow(new ResourceNotFoundException("User not found")).when(userService).deleteUser(1L);

        ResponseEntity<ApiResponse> response = userController.deleteUser(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("User not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }
}
