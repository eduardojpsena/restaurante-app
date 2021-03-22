package br.com.indracompany.gestaorestaurante.repository;

import br.com.indracompany.gestaorestaurante.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}
