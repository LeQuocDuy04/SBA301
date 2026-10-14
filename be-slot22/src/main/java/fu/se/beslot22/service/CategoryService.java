package fu.se.beslot22.service;

import fu.se.beslot22.dto.CategoryRequest;
import fu.se.beslot22.dto.CategoryResponse;
import fu.se.beslot22.entity.Category;
import fu.se.beslot22.exception.BusinessConflictException;
import fu.se.beslot22.exception.ResourceNotFoundException;
import fu.se.beslot22.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public Page<CategoryResponse> findAll(String keyword, Pageable pageable) {
        Page<Category> page = keyword == null || keyword.isBlank()
                ? categoryRepository.findAll(pageable)
                : categoryRepository.findByCategoryNameContainingIgnoreCase(keyword.trim(), pageable);
        return page.map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getById(short id) { return toResponse(findEntity(id)); }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        String normalizedName = request.categoryName().trim();
        if (categoryRepository.existsByCategoryNameIgnoreCase(normalizedName)) {
            throw new BusinessConflictException("Category name already exists");
        }
        validateParent(request.parentCategoryId(), null);
        Category category = new Category();
        apply(category, request);
        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(short id, CategoryRequest request) {
        Category category = findEntity(id);
        String normalizedName = request.categoryName().trim();
        if (categoryRepository.existsByCategoryNameIgnoreCaseAndCategoryIdNot(normalizedName, id)) {
            throw new BusinessConflictException("Category name already exists");
        }
        validateParent(request.parentCategoryId(), id);
        apply(category, request);
        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(short id) {
        Category category = findEntity(id);
        if (categoryRepository.existsByParentCategoryId(id)) {
            throw new BusinessConflictException("Category is a parent of another category");
        }
        categoryRepository.delete(category);
    }

    private Category findEntity(short id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category " + id + " not found"));
    }

    private void validateParent(Short parentId, Short currentId) {
        if (parentId == null) return;
        if (currentId != null && parentId.equals(currentId)) {
            throw new BusinessConflictException("A category cannot be its own parent");
        }
        if (!categoryRepository.existsById(parentId)) {
            throw new ResourceNotFoundException("Parent category " + parentId + " not found");
        }
    }

    private void apply(Category category, CategoryRequest request) {
        category.setCategoryName(request.categoryName().trim());
        category.setCategoryDescription(request.categoryDescription().trim());
        category.setParentCategoryId(request.parentCategoryId());
        category.setActive(request.active() == null ? Boolean.TRUE : request.active());
    }

    private CategoryResponse toResponse(Category c) {
        return new CategoryResponse(c.getCategoryId(), c.getCategoryName(), c.getCategoryDescription(), c.getParentCategoryId(), c.getActive());
    }
}
