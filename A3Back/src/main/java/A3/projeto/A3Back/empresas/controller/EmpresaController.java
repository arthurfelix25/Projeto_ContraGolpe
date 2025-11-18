package A3.projeto.A3Back.empresas.controller;

import A3.projeto.A3Back.empresas.DAO.EmpresaRepository;
import A3.projeto.A3Back.empresas.model.Empresa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/empresas")
public class EmpresaController {
    @Autowired
    private EmpresaRepository repo;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static class CreateEmpresaRequest {
        public String usuario;
        public String cnpj;
        public String password;
    }

    @PostMapping
    public Empresa criar(@RequestBody CreateEmpresaRequest req) {
        if (req == null || req.usuario == null || req.cnpj == null || req.password == null) {
            throw new IllegalArgumentException("Dados inválidos");
        }
        Empresa e = new Empresa();
        e.setUsuario(req.usuario.trim());
        e.setCnpj(req.cnpj.replaceAll("\\D", ""));
        e.setPasswordHash(encoder.encode(req.password));
        e.setAtivo(true);
        return repo.save(e);
    }

    @GetMapping("/{id}")
    public Optional<Empresa> buscar(@PathVariable Integer id) {
        return repo.findById(java.util.Objects.requireNonNull(id));
    }
}
