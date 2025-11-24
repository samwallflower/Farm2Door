package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Category;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.category.ICategoryService;
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

class CategoryControllerTest {

    @Mock
    private ICategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCategories_Success() {
        Category cat1 = new Category();
        Category cat2 = new Category();
        List<Category> categories = Arrays.asList(cat1, cat2);

        when(categoryService.getAllCategories()).thenReturn(categories);

        ResponseEntity<ApiResponse> response = categoryController.getAllCategories();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Categories found!", response.getBody().getMessage());
        assertEquals(categories, response.getBody().getData());
    }

    @Test
    void testAddCategory_Success() throws AlreadyExistsException {
        Category category = new Category();
        when(categoryService.addCategory(category)).thenReturn(category);

        ResponseEntity<ApiResponse> response = categoryController.addCategory(category);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Category added successfully!", response.getBody().getMessage());
        assertEquals(category, response.getBody().getData());
    }

    @Test
    void testAddCategory_AlreadyExists() throws AlreadyExistsException {
        Category category = new Category();
        when(categoryService.addCategory(category)).thenThrow(new AlreadyExistsException("Category already exists"));

        ResponseEntity<ApiResponse> response = categoryController.addCategory(category);

        assertEquals(CONFLICT, response.getStatusCode());
        assertEquals("Category already exists", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetCategoryById_Success() throws ResourceNotFoundException {
        Category category = new Category();
        when(categoryService.getCategoryById(1L)).thenReturn(category);

        ResponseEntity<ApiResponse> response = categoryController.getCategoryById(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Category found!", response.getBody().getMessage());
        assertEquals(category, response.getBody().getData());
    }

    @Test
    void testGetCategoryById_NotFound() throws ResourceNotFoundException {
        when(categoryService.getCategoryById(1L)).thenThrow(new ResourceNotFoundException("Category not found"));

        ResponseEntity<ApiResponse> response = categoryController.getCategoryById(1L);

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Category not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }

    @Test
    void testGetCategoryByName_Success() throws ResourceNotFoundException {
        Category category = new Category();
        when(categoryService.getCategoryByName("Fruits")).thenReturn(category);

        ResponseEntity<ApiResponse> response = categoryController.getCategoryByName("Fruits");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Category found!", response.getBody().getMessage());
        assertEquals(category, response.getBody().getData());
    }

    @Test
    void testGetCategoryByName_NotFound() throws ResourceNotFoundException {
        when(categoryService.getCategoryByName("Fruits")).thenThrow(new ResourceNotFoundException("Category not found"));

        ResponseEntity<ApiResponse> response = categoryController.getCategoryByName("Fruits");

        assertEquals(NOT_FOUND, response.getStatusCode());
        assertEquals("Category not found", response.getBody().getMessage());
        assertNull(response.getBody().getData());
    }
}
