package br.com.indracompany.gestaorestaurante.rest;

import br.com.indracompany.gestaorestaurante.model.Item;
import br.com.indracompany.gestaorestaurante.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/itens")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping
    public ResponseEntity<Item> save( @RequestBody Item item ) {
        itemRepository.save(item);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Item>>getAll() {
        List<Item> itens = itemRepository.findAll();
        return new ResponseEntity<>(itens, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Item>> getById( @PathVariable Long id ) {
        Optional<Item> item;
        try {
            item = itemRepository.findById(id);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Optional<Item>> delete ( @PathVariable Long id ) {
        try {
            itemRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Item> update ( @PathVariable Long id, @RequestBody Item itemUpdate) {
        return itemRepository.findById(id)
                .map(item -> {
                    itemUpdate.setId(item.getId());

                    Item updateItem = itemRepository.save(itemUpdate);

                    return ResponseEntity.ok().body(updateItem);

                }).orElse(ResponseEntity.notFound().build());
    }

}
