package br.com.indracompany.gestaorestaurante;
import br.com.indracompany.gestaorestaurante.model.Item;
import br.com.indracompany.gestaorestaurante.repository.ItemRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
public class GestaoRestauranteApplication {

	public static void main(String[] args) {

		SpringApplication.run(GestaoRestauranteApplication.class, args);

	}

}
