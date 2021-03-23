package br.com.indracompany.gestaorestaurante.repository;

import br.com.indracompany.gestaorestaurante.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("select s from Pedido s where s.mesa =:mesa")
    List<Pedido> findByMesaPedido(@Param("mesa") String mesa);
}
