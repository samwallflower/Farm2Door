package com.greenstack.farm2door.controller;

import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Product;
import com.greenstack.farm2door.response.ApiResponse;
import com.greenstack.farm2door.service.product.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/products")
public class ProductController {

    private final IProductService productService;

    //get all products
    @GetMapping("/all")
    public ResponseEntity<ApiResponse> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        List<ProductDto> convertedProducts = productService.getConvertedProducts(products);

        return convertedProducts.isEmpty()
                ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found", null))
                : ResponseEntity.ok(new ApiResponse("Products retrieved successfully", convertedProducts));
    }

    //get product by id
    @GetMapping("/product/{productId}/product")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable Long productId) {
        try{
            Product product = productService.getProductById(productId);
            ProductDto productDto = productService.convertToDto(product);
            return ResponseEntity.ok(new ApiResponse("Product retrieved successfully", productDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ApiResponse(e.getMessage(), null));
        }
    }

    //get all products by category - vegetables , fruits , dairy , grains , nuts , seeds , herbs , spices
    @GetMapping("/category/{category}/all/products")
    public ResponseEntity<ApiResponse> getAllProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.getAllProductsByCategory(category);
        List<ProductDto> convertedProducts = productService.getConvertedProducts(products);

        return convertedProducts.isEmpty()
                ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found in category: " + category, null))
                : ResponseEntity.ok(new ApiResponse("Products in category: " + category + " retrieved successfully", convertedProducts));
    }

    //get all products by name - tomato , apple , milk , rice , almonds , chia , basil , cinnamon
    @GetMapping("/product/{name}/products")
    public ResponseEntity<ApiResponse> getAllProductsByName(@PathVariable String name) {
        List<Product> products = productService.getAllProductsByName(name);
        List<ProductDto> convertedProducts = productService.getConvertedProducts(products);
        return convertedProducts.isEmpty()
                ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found with name: " + name, null))
                : ResponseEntity.ok(new ApiResponse("Products with name: " + name + " retrieved successfully", convertedProducts));
    }

    //get all products by shop id
    @GetMapping("/shop/{shopId}/products")
    public ResponseEntity<ApiResponse> getAllProductsByShopId(@PathVariable Long shopId) {
        List<Product> products = productService.getAllProductsByShopId(shopId);
        List<ProductDto> convertedProducts = productService.getConvertedProducts(products);
        return convertedProducts.isEmpty()
                ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found for shop id: " + shopId, null))
                : ResponseEntity.ok(new ApiResponse("Products for shop id: " + shopId + " retrieved successfully", convertedProducts));
    }

    //get all products by shop name
    @GetMapping("/shop/{shopName}/products")
    public ResponseEntity<ApiResponse> getAllProductsByShopName(@PathVariable String shopName) {
        List<Product> products = productService.getAllProductsByShopName(shopName);
        List<ProductDto> convertedProducts = productService.getConvertedProducts(products);
        return convertedProducts.isEmpty()
                ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found for shop name: " + shopName, null))
                : ResponseEntity.ok(new ApiResponse("Products for shop name: " + shopName + " retrieved successfully", convertedProducts));
    }

    //get all products by shop name and category - greenfarm vegetables , greenfarm fruits , greenfarm dairy , greenfarm grains
    @GetMapping("/shop/{shopName}/category/{categoryName}/products")
    public ResponseEntity<ApiResponse> getAllProductsByShopAndCategory(@PathVariable String shopName, @PathVariable String categoryName) {
        List<Product> products = productService.getAllProductsByShopAndCategory(shopName, categoryName);
        List<ProductDto> convertedProducts = productService.getConvertedProducts(products);
        return convertedProducts.isEmpty()
                ? ResponseEntity.status(NOT_FOUND).body(new ApiResponse("No products found for shop name: " + shopName + " and category: " + categoryName, null))
                : ResponseEntity.ok(new ApiResponse("Products for shop name: " + shopName + " and category: " + categoryName + " retrieved successfully", convertedProducts));
    }



}
