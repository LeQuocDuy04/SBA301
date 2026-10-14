package fu.se.beslot22.repository;

import fu.se.beslot22.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Short> {
    boolean existsByCategoryNameIgnoreCase(String categoryName);
    boolean existsByCategoryNameIgnoreCaseAndCategoryIdNot(String categoryName, Short categoryId);
    Page<Category> findByCategoryNameContainingIgnoreCase(String keyword, Pageable pageable);
    boolean existsByParentCategoryId(Short parentCategoryId);
}
