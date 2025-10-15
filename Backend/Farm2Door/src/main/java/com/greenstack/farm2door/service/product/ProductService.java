package com.greenstack.farm2door.service.product;

import com.greenstack.farm2door.dto.ImageDto;
import com.greenstack.farm2door.dto.ProductDto;
import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Category;
import com.greenstack.farm2door.model.Image;
import com.greenstack.farm2door.model.Product;
import com.greenstack.farm2door.model.Shop;
import com.greenstack.farm2door.repository.CategoryRepository;
import com.greenstack.farm2door.repository.ImageRepository;
import com.greenstack.farm2door.repository.ProductRepository;
import com.greenstack.farm2door.repository.ShopRepository;
import com.greenstack.farm2door.request.AddProductRequest;
import com.greenstack.farm2door.request.UpdateProductRequest;
import com.greenstack.farm2door.service.category.ICategoryService;
import com.greenstack.farm2door.service.image.ImageService;
import com.greenstack.farm2door.service.shop.IShopService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    private final ProductRepository productRepository;
    private final ShopRepository shopRepository;
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;
    private final ModelMapper modelMapper;



    @Override
    public Product addProduct(AddProductRequest request, Long shopId) {
        // first we will check if the category already exists in the database
        // if it does, we will set it as the new product category
        // if it doesn't, we will save it as a new category and then set it as the new product category
        // finally we will save the product to the database
        Shop shop = shopRepository.findById(shopId)
                .orElseThrow(()-> new ResourceNotFoundException("Shop not found with id: " + shopId));
        if (isProductExists(request.getName(), shop.getName())) {
            throw new AlreadyExistsException("Product already exists with name: " + request.getName() + " in shop: " + shop.getName()
                    + " , you may update this product instead.");
        }

        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(() -> {
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });
        request.setCategory(category);
        return productRepository.save(createProduct(request, category, shop));
    }

    private Product createProduct(AddProductRequest request, Category category, Shop shop){
        Product product = new Product(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getInventory(),
                request.getOrigin(),
                request.getUnit(),
                category
        );
        product.setShop(shop);
        return product;
    }

    private boolean isProductExists(String name , String shopName){
        // checking if product already exists in a shop as every product belongs to a particular shop
        // as no product can exist without a shop
        return productRepository.existsByNameAndShopName(name, shopName);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public void deleteProductById(Long id, Long shopId) {
        // first we will check if the product exists in the shop with the given id
        // if it does, we will delete it
        // if it doesn't, we will throw an exception
        productRepository.findByIdAndShopId(id, shopId)
                .ifPresentOrElse(productRepository::delete,
                        ()-> {throw new ResourceNotFoundException("Product not found with id: " + id + " in shop with id: " + shopId);});

    }

    @Override
    public Product updateProduct(UpdateProductRequest request, Long productId, Long shopId) {

        return productRepository.findByIdAndShopId(productId, shopId)
                .map(existingProduct -> UpdateExistingProduct(existingProduct, request))
                .map(productRepository::save)
                .orElseThrow(()-> new ResourceNotFoundException("Product not found with id: " + productId));
    }

    private Product UpdateExistingProduct(Product existingProduct, UpdateProductRequest request) {
        existingProduct.setName(request.getName());
        existingProduct.setDescription(request.getDescription());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setInventory(request.getInventory());
        existingProduct.setOrigin(request.getOrigin());
        existingProduct.setUnit(request.getUnit());
        // check if category exists
        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName()))
                .orElseGet(()->{
                    Category newCategory = new Category(request.getCategory().getName());
                    return categoryRepository.save(newCategory);
                });
        existingProduct.setCategory(category);
        return existingProduct;
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
    // all vegetables or all fruits
    // all products in a particular category
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

    // all vegetables in green farm shop
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
        List<Image> images = imageRepository.findByProductId(product.getId());
        List<ImageDto> imageDtos = images.stream()
                .map(image -> modelMapper.map(image, ImageDto.class))
                .toList();
        productDto.setImages(imageDtos);
        return productDto;
    }

    @Override
    public Long countProductsByShopId(Long shopId) {
        return productRepository.countByShopId(shopId); // Counting all products in a shop
    }


}
