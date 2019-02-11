package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ChtiService;
import io.github.jhipster.application.domain.Chti;
import io.github.jhipster.application.repository.ChtiRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Chti.
 */
@Service
@Transactional
public class ChtiServiceImpl implements ChtiService {

    private final Logger log = LoggerFactory.getLogger(ChtiServiceImpl.class);

    private final ChtiRepository chtiRepository;

    public ChtiServiceImpl(ChtiRepository chtiRepository) {
        this.chtiRepository = chtiRepository;
    }

    /**
     * Save a chti.
     *
     * @param chti the entity to save
     * @return the persisted entity
     */
    @Override
    public Chti save(Chti chti) {
        log.debug("Request to save Chti : {}", chti);
        return chtiRepository.save(chti);
    }

    /**
     * Get all the chtis.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Chti> findAll() {
        log.debug("Request to get all Chtis");
        return chtiRepository.findAll();
    }


    /**
     * Get one chti by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Chti> findOne(Long id) {
        log.debug("Request to get Chti : {}", id);
        return chtiRepository.findById(id);
    }

    /**
     * Delete the chti by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Chti : {}", id);        chtiRepository.deleteById(id);
    }
}
