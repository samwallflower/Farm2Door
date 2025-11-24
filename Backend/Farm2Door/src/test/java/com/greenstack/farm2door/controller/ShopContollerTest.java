package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.ShopDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Shop;
import com.greenstack.farm2door.request.AddShopRequest;
import com.greenstack.farm2door.request.UpdateShopRequest;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.shop.IShopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

class ShopControllerTest {

    @Mock
    private IShopService shopService;

    @InjectMocks
    private ShopController shopController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllShops_Success() {
        Shop s1 = new Shop();
        Shop s2 = new Shop();
        List<Shop> shops = Arrays.asList(s1, s2);
        ShopDto dto1 = new ShopDto();
        ShopDto dto2 = new ShopDto();
        List<ShopDto> dtos = Arrays.asList(dto1, dto2);

        when(shopService.getAllShops()).thenReturn(shops);
        when(shopService.getConvertedShops(shops)).thenReturn(dtos);

        ResponseEntity<ApiResponse> response = shopController.getAllShops();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Shops retrieved successfully", response.getBody().getMessage());
        assertEquals(dtos, response.getBody().getData());
    }

    @Test
    void testGetAllShops_NotFound() {
        List<Shop> shops = List.of();
        when(shopService.getAllShops()).thenReturn(shops);
        when(shopService.getConvertedShops(shops)).thenReturn(List.of());

        ResponseEntity<ApiResponse> response = shopController.getAllShops();

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("No shops found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetShopById_Success() throws ResourceNotFoundException {
        Shop shop = new Shop();
        ShopDto dto = new ShopDto();

        when(shopService.getShopById(1L)).thenReturn(shop);
        when(shopService.convertToDto(shop)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = shopController.getShopById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Shop retrieved successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testGetShopById_NotFound() throws ResourceNotFoundException {
        when(shopService.getShopById(1L)).thenThrow(new ResourceNotFoundException("Shop not found"));

        ResponseEntity<ApiResponse> response = shopController.getShopById(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Shop not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testAddShop_Success() throws AlreadyExistsException {
        AddShopRequest request = new AddShopRequest();
        Shop shop = new Shop();
        ShopDto dto = new ShopDto();

        when(shopService.addShop(request, 1L)).thenReturn(shop);
        when(shopService.convertToDto(shop)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = shopController.addShop(request, 1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Shop added successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testAddShop_AlreadyExists() throws AlreadyExistsException {
        AddShopRequest request = new AddShopRequest();
        when(shopService.addShop(request, 1L)).thenThrow(new AlreadyExistsException("Shop already exists"));

        ResponseEntity<ApiResponse> response = shopController.addShop(request, 1L);

        assertEquals(CONFLICT, response.getStatusCode());
        assertEquals("Shop already exists", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testUpdateShop_Success() throws ResourceNotFoundException {
        UpdateShopRequest request = new UpdateShopRequest();
        Shop shop = new Shop();
        ShopDto dto = new ShopDto();

        when(shopService.updateShop(1L, request)).thenReturn(shop);
        when(shopService.convertToDto(shop)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = shopController.updateShop(1L, request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Shop updated successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testUpdateShop_NotFound() throws ResourceNotFoundException {
        UpdateShopRequest request = new UpdateShopRequest();
        when(shopService.updateShop(1L, request)).thenThrow(new ResourceNotFoundException("Shop not found"));

        ResponseEntity<ApiResponse> response = shopController.updateShop(1L, request);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Shop not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testDeleteShop_Success() throws ResourceNotFoundException {
        doNothing().when(shopService).deleteShopById(1L);

        ResponseEntity<ApiResponse> response = shopController.deleteShop(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Shop deleted successfully", response.getBody().getMessage());
        assertEquals(1L, response.getBody().getData());
    }

    @Test
    void testDeleteShop_NotFound() throws ResourceNotFoundException {
        doThrow(new ResourceNotFoundException("Shop not found")).when(shopService).deleteShopById(1L);

        ResponseEntity<ApiResponse> response = shopController.deleteShop(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Shop not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testCountProductsInShop_Success() {
        when(shopService.countProductsInShop(1L)).thenReturn(10L);

        ResponseEntity<ApiResponse> response = shopController.countProductsInShop(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Product count retrieved successfully", response.getBody().getMessage());
        assertEquals(10L, response.getBody().getData());
    }
}
