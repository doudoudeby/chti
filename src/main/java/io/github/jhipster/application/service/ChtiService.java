package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Chti;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Chti.
 */
public interface ChtiService {

    /**
     * Save a chti.
     *
     * @param chti the entity to save
     * @return the persisted entity
     */
    Chti save(Chti chti);

    /**
     * Get all the chtis.
     *
     * @return the list of entities
     */
    List<Chti> findAll();


    /**
     * Get the "id" chti.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Chti> findOne(Long id);

    /**
     * Delete the "id" chti.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
