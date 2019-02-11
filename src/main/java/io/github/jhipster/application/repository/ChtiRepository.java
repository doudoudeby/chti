package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Chti;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Chti entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChtiRepository extends JpaRepository<Chti, Long> {

}
