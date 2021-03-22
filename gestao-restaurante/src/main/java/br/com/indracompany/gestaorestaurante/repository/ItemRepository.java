package br.com.indracompany.gestaorestaurante.repository;

import br.com.indracompany.gestaorestaurante.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
