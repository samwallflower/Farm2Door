package com.greenstack.farm2door.service.product;

import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.model.Product;
import com.greenstack.farm2door.request.AddProductRequest;
import com.greenstack.farm2door.request.UpdateProductRequest;

import java.util.List;


public interface IProductService{
    Product addProduct(AddProductRequest request, Long shopId);
    Product getProductById(Long id);
    void deleteProductById(Long id, Long shopId);
    Product updateProduct(UpdateProductRequest request, Long productId, Long shopId);
    List<Product> getAllProducts();
    List<Product> getAllProductsByName(String name);
    List<Product> getAllProductsByCategory(String category);
    List<Product> getAllProductsByShopId(Long shopId);
    List<Product> getAllProductsByShopName(String shopName);
    List<Product> getAllProductsByShopAndCategory(String shopName, String categoryName);
    List<ProductDto> getConvertedProducts(List<Product> products);
    ProductDto convertToDto(Product product);
    Long countProductsByShopId(Long shopId);

}
