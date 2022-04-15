package com.rentit.repository;

import com.rentit.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemsRepository extends JpaRepository<OrderItem, Integer> {
}
