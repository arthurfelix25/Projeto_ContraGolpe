package A3.projeto.A3Back.DAO;

import A3.projeto.A3Back.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IUser extends JpaRepository<UserModel, Integer> {
	List<UserModel> findByEmpresaIgnoreCase(String empresa);
	List<UserModel> findByEmpresaIgnoreCaseOrderByCreatedAtDesc(String empresa);
	Page<UserModel> findByEmpresaIgnoreCase(String empresa, Pageable pageable);
}
