package br.com.indracompany.gestaorestaurante.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PedidoDto {

    private Long idItem;

    private Integer quantidade;

    private String mesa;

    private String status;
}
