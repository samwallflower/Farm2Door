package com.greenstack.farm2door.service.product;

import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Product;
import com.greenstack.farm2door.repository.ProductRepository;
import com.greenstack.farm2door.request.AddProductRequest;
import com.greenstack.farm2door.request.UpdateProductRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;



    @Override
    public Product addProduct(AddProductRequest request) {
        return null;
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public void deleteProductById(Long id) {

    }

    @Override
    public Product updateProduct(UpdateProductRequest request, Long productId) {
        return null;
    }

    //get all products
    @Override
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    @Override
    public List<Product> getAllProductsByName(String name) {

        return productRepository.findByName(name);
    }

    @Override
    public List<Product> getAllProductsByCategory(String category) {

        return productRepository.findByCategoryName(category);
    }

    @Override
    public List<Product> getAllProductsByShopId(Long shopId) {

        return productRepository.findByShopId(shopId);
    }

    @Override
    public List<Product> getAllProductsByShopName(String shopName) {
        return productRepository.findByShopName(shopName);
    }

    @Override
    public List<Product> getAllProductsByShopAndCategory(String shopName, String categoryName) {
        return productRepository.findByShopNameAndCategoryName(shopName, categoryName);
    }

    @Override
    public List<ProductDto> getConvertedProducts(List<Product> products) {
        return products.stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public ProductDto convertToDto(Product product) {
        ProductDto productDto = modelMapper.map(product, ProductDto.class);
        //get images
        //convert them to image dtos ...
        return modelMapper.map(product, ProductDto.class);
    }


}
