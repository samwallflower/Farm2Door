package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Product;
import com.greenstack.farm2door.request.AddProductRequest;
import com.greenstack.farm2door.request.UpdateProductRequest;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.product.IProductService;
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
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.CONFLICT;

class ProductControllerTest {

    @Mock
    private IProductService productService;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProducts_Success() {
        Product p1 = new Product();
        Product p2 = new Product();
        List<Product> products = Arrays.asList(p1, p2);
        ProductDto dto1 = new ProductDto();
        ProductDto dto2 = new ProductDto();
        List<ProductDto> dtos = Arrays.asList(dto1, dto2);

        when(productService.getAllProducts()).thenReturn(products);
        when(productService.getConvertedProducts(products)).thenReturn(dtos);

        ResponseEntity<ApiResponse> response = productController.getAllProducts();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Products retrieved successfully", response.getBody().getMessage());
        assertEquals(dtos, response.getBody().getData());
    }

    @Test
    void testGetAllProducts_NotFound() {
        List<Product> products = List.of();
        when(productService.getAllProducts()).thenReturn(products);
        when(productService.getConvertedProducts(products)).thenReturn(List.of());

        ResponseEntity<ApiResponse> response = productController.getAllProducts();

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("No products found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetProductById_Success() throws ResourceNotFoundException {
        Product product = new Product();
        ProductDto productDto = new ProductDto();

        when(productService.getProductById(1L)).thenReturn(product);
        when(productService.convertToDto(product)).thenReturn(productDto);

        ResponseEntity<ApiResponse> response = productController.getProductById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Product retrieved successfully", response.getBody().getMessage());
        assertEquals(productDto, response.getBody().getData());
    }

    @Test
    void testGetProductById_NotFound() throws ResourceNotFoundException {
        when(productService.getProductById(1L)).thenThrow(new ResourceNotFoundException("Product not found"));

        ResponseEntity<ApiResponse> response = productController.getProductById(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Product not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testAddProduct_Success() throws AlreadyExistsException {
        AddProductRequest request = new AddProductRequest();
        Product product = new Product();
        ProductDto dto = new ProductDto();

        when(productService.addProduct(request, 1L)).thenReturn(product);
        when(productService.convertToDto(product)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = productController.addProduct(request, 1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Product added successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testAddProduct_AlreadyExists() throws AlreadyExistsException {
        AddProductRequest request = new AddProductRequest();
        when(productService.addProduct(request, 1L)).thenThrow(new AlreadyExistsException("Product already exists"));

        ResponseEntity<ApiResponse> response = productController.addProduct(request, 1L);

        assertEquals(CONFLICT, response.getStatusCode());
        assertEquals("Product already exists", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testUpdateProduct_Success() throws ResourceNotFoundException {
        UpdateProductRequest request = new UpdateProductRequest();
        Product product = new Product();
        ProductDto dto = new ProductDto();

        when(productService.updateProduct(request, 1L, 1L)).thenReturn(product);
        when(productService.convertToDto(product)).thenReturn(dto);

        ResponseEntity<ApiResponse> response = productController.updateProduct(1L, request, 1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Product updated successfully", response.getBody().getMessage());
        assertEquals(dto, response.getBody().getData());
    }

    @Test
    void testUpdateProduct_NotFound() throws ResourceNotFoundException {
        UpdateProductRequest request = new UpdateProductRequest();
        when(productService.updateProduct(request, 1L, 1L)).thenThrow(new ResourceNotFoundException("Product not found"));

        ResponseEntity<ApiResponse> response = productController.updateProduct(1L, request, 1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Product not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testDeleteProduct_Success() throws ResourceNotFoundException {
        doNothing().when(productService).deleteProductById(1L, 1L);

        ResponseEntity<ApiResponse> response = productController.deleteProduct(1L, 1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Product deleted successfully", response.getBody().getMessage());
        assertEquals(1L, response.getBody().getData());
    }

    @Test
    void testDeleteProduct_NotFound() throws ResourceNotFoundException {
        doThrow(new ResourceNotFoundException("Product not found")).when(productService).deleteProductById(1L, 1L);

        ResponseEntity<ApiResponse> response = productController.deleteProduct(1L, 1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Product not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }
}
