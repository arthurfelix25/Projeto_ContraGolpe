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
        basePackages = "A3.projeto.A3Back.DAO",
        entityManagerFactoryRef = "golpeEntityManagerFactory",
        transactionManagerRef = "golpeTransactionManager"
)
public class GolpeDataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource.golpe")
    public DataSourceProperties golpeDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "golpeDataSource")
    @org.springframework.context.annotation.Primary
    @ConfigurationProperties("spring.datasource.golpe.hikari")
    public DataSource golpeDataSource(@Qualifier("golpeDataSourceProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().build();
    }

    @Bean(name = "golpeEntityManagerFactory")
    @org.springframework.context.annotation.Primary
    public LocalContainerEntityManagerFactoryBean golpeEntityManagerFactory(
            @Qualifier("golpeDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("A3.projeto.A3Back.model");
        em.setJpaVendorAdapter(new HibernateJpaVendorAdapter());

        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.hbm2ddl.auto", "none");
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        em.setJpaPropertyMap(jpaProps);
        em.setPersistenceUnitName("golpeUnit");
        return em;
    }

    @Bean(name = "golpeTransactionManager")
    @org.springframework.context.annotation.Primary
    public PlatformTransactionManager golpeTransactionManager(
            @Qualifier("golpeEntityManagerFactory") LocalContainerEntityManagerFactoryBean emf) {
        return new JpaTransactionManager(java.util.Objects.requireNonNull(emf.getObject()));
    }
}
