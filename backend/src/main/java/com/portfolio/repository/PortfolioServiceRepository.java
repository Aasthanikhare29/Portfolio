package com.portfolio.repository;

import com.portfolio.entity.PortfolioService;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PortfolioServiceRepository extends JpaRepository<PortfolioService, Long> {
    List<PortfolioService> findAllByOrderBySortOrderAsc();
    List<PortfolioService> findByFeaturedTrueOrderBySortOrderAsc();
}
