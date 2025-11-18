package A3.projeto.A3Back.Config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableJpaRepositories(
        basePackages = "A3.projeto.A3Back.empresas.DAO",
        entityManagerFactoryRef = "empresasEntityManagerFactory",
        transactionManagerRef = "empresasTransactionManager"
)
public class EmpresasDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.empresas")
    public DataSourceProperties empresasDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "empresasDataSource")
    @ConfigurationProperties("spring.datasource.empresas.hikari")
    public DataSource empresasDataSource(@Qualifier("empresasDataSourceProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }

    @Bean(name = "empresasEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean empresasEntityManagerFactory(
            @Qualifier("empresasDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("A3.projeto.A3Back.empresas.model");
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.hbm2ddl.auto", "none");
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        em.setJpaPropertyMap(jpaProps);
        em.setPersistenceUnitName("empresasUnit");
        return em;
    }

    @Bean(name = "empresasTransactionManager")
    public PlatformTransactionManager empresasTransactionManager(
            @Qualifier("empresasEntityManagerFactory") LocalContainerEntityManagerFactoryBean emf) {
        return new JpaTransactionManager(java.util.Objects.requireNonNull(emf.getObject()));
    }
}
