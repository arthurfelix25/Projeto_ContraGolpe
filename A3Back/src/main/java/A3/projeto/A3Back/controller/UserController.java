package A3.projeto.A3Back.controller;

import java.util.List;
import java.util.Optional;

import A3.projeto.A3Back.DAO.IUser;
import A3.projeto.A3Back.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/usuarios")
public class UserController  {

    @Autowired
    private IUser dao;



    @GetMapping
    public List<UserModel> listaUsuarios() {
        return (List<UserModel>) dao.findAll();
    }

    @GetMapping("/empresa/{usuario}")
    public List<UserModel> listaPorEmpresa(@PathVariable("usuario") String usuario) {
        return dao.findByEmpresaIgnoreCaseOrderByCreatedAtDesc(usuario);
    }

    @GetMapping("/empresa/{usuario}/paged")
    public Page<UserModel> listaPorEmpresaPaginada(
            @PathVariable("usuario") String usuario,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String dir
    ) {
        Sort.Direction direction = "asc".equalsIgnoreCase(dir) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));
        return dao.findByEmpresaIgnoreCase(usuario, pageable);
    }
    @PostMapping
    @SuppressWarnings("null")
    public ResponseEntity<UserModel> criarUsuario(@RequestBody UserModel user) {
        dao.save(user);
        return ResponseEntity.ok(user);
    }

    @PutMapping
    @SuppressWarnings("null")
    public ResponseEntity<UserModel> editarUsuario(@RequestBody UserModel user) {
        dao.save(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public UserModel excluirUsuario(@PathVariable Integer id) {
        Optional<UserModel> User = dao.findById(java.util.Objects.requireNonNull(id));
        dao.deleteById(java.util.Objects.requireNonNull(id));
        return User.orElse(null);
    }
}
