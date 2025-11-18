package A3.projeto.A3Back.empresas.DAO;

import A3.projeto.A3Back.empresas.model.Empresa;
import org.springframework.data.repository.CrudRepository;

public interface EmpresaRepository extends CrudRepository<Empresa, Integer> {
    boolean existsByUsuario(String usuario);
    boolean existsByCnpj(String cnpj);
}
