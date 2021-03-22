package br.com.indracompany.gestaorestaurante.rest;

import br.com.indracompany.gestaorestaurante.model.Pedido;
import br.com.indracompany.gestaorestaurante.repository.PedidoRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/pedidos")
@CrossOrigin("http://localhost:4200")
@Data
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Pedido save( @RequestBody @Valid Pedido pedido ) {
        return pedidoRepository.save(pedido);
    }

    @GetMapping
    public ResponseEntity<List<Pedido>>getAll() {
        List<Pedido> pedidos = pedidoRepository.findAll();
        return new ResponseEntity<>(pedidos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public Pedido getById(@PathVariable Long id ) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));

    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete ( @PathVariable Long id ) {
        pedidoRepository.findById(id)
                .map(pedido -> {
                    pedidoRepository.delete(pedido);
                    return Void.TYPE;
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Pedido> update ( @PathVariable Long id, @RequestBody Pedido pedidoUpdate) {
        return pedidoRepository.findById(id)
                .map(pedido -> {
                    pedidoUpdate.setId(pedido.getId());

                    Pedido updatePedido = pedidoRepository.save(pedidoUpdate);

                    return ResponseEntity.ok().body(updatePedido);

                }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));
    }


//    @PostMapping
//    @ResponseStatus(HttpStatus.OK)
//    public Pedido save( @RequestBody PedidoDto dto ) {
//        Long idItem = dto.getIdItem();
//
//        Item item = itemRepository
//                .findById(idItem)
//                .orElseThrow(() ->
//                        new ResponseStatusException(
//                                HttpStatus.BAD_REQUEST, "Item inexistente"));
//        Item item1 = itemRepository.getOne(idItem);
//        //List<Item> itens = new ArrayList<>();
//        //itens.add(item);
//
//        Pedido pedido = new Pedido();
//
//        pedido.setItem(dto);
//        pedido.setQuantidade(dto.getQuantidade());
//        pedido.setMesa(dto.getMesa());
//        pedido.setStatus(dto.getStatus());
//
//        return pedidoRepository.save(pedido);
//    }
}
