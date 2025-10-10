package com.greenstack.farm2door.service.category;

import com.greenstack.farm2door.exceptions.AlreadyExistsException;
import com.greenstack.farm2door.exceptions.ResourceNotFoundException;
import com.greenstack.farm2door.model.Category;
import com.greenstack.farm2door.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService{
    private final CategoryRepository categoryRepository;

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Category not found!!"));
    }

    @Override
    public Category getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category addCategory(Category category) {
        //First we check if the category with the same name already exists
        //if not we save the new category
        return Optional.of(category).filter(c-> !categoryRepository.existsByName(c.getName()))
                .map(categoryRepository :: save)
                .orElseThrow(()-> new AlreadyExistsException("Category already exists with name: " + category.getName()));
    }

    @Override
    public Category updateCategory(Category category, Long id) {
        return Optional.ofNullable(getCategoryById(id))
                .map(oldCategory -> {
                    oldCategory.setName(category.getName());
                    //old category updated with new category name
                    return categoryRepository.save(oldCategory);
                }).orElseThrow(()-> new ResourceNotFoundException("Category not found for update!!"));
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.findById(id)
                .ifPresentOrElse(categoryRepository::delete, ()->{
                        throw new ResourceNotFoundException("Category not found for deletion!!");
                     });

    }
}
