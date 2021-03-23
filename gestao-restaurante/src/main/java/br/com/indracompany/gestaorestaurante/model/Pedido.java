package br.com.indracompany.gestaorestaurante.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Data
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    @NotEmpty(message = "O campo nome do item é obrigatório")
    private String item;

    @Column
    @NotNull(message = "O campo preço é obrigatório")
    private Double preco;

    @Column
    @NotNull(message = "O campo quantidade é obrigatório")
    private Integer quantidade;

    @Column(name = "mesa")
    @NotEmpty(message = "O campo mesa é obrigatório")
    private String mesa;

    @Column
    private String status;
}
