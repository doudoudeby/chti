package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Chti;
import io.github.jhipster.application.service.ChtiService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Chti.
 */
@RestController
@RequestMapping("/api")
public class ChtiResource {

    private final Logger log = LoggerFactory.getLogger(ChtiResource.class);

    private static final String ENTITY_NAME = "chti";

    private final ChtiService chtiService;

    public ChtiResource(ChtiService chtiService) {
        this.chtiService = chtiService;
    }

    /**
     * POST  /chtis : Create a new chti.
     *
     * @param chti the chti to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chti, or with status 400 (Bad Request) if the chti has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chtis")
    public ResponseEntity<Chti> createChti(@RequestBody Chti chti) throws URISyntaxException {
        log.debug("REST request to save Chti : {}", chti);
        if (chti.getId() != null) {
            throw new BadRequestAlertException("A new chti cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Chti result = chtiService.save(chti);
        return ResponseEntity.created(new URI("/api/chtis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chtis : Updates an existing chti.
     *
     * @param chti the chti to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chti,
     * or with status 400 (Bad Request) if the chti is not valid,
     * or with status 500 (Internal Server Error) if the chti couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chtis")
    public ResponseEntity<Chti> updateChti(@RequestBody Chti chti) throws URISyntaxException {
        log.debug("REST request to update Chti : {}", chti);
        if (chti.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Chti result = chtiService.save(chti);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chti.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chtis : get all the chtis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chtis in body
     */
    @GetMapping("/chtis")
    public List<Chti> getAllChtis() {
        log.debug("REST request to get all Chtis");
        return chtiService.findAll();
    }

    /**
     * GET  /chtis/:id : get the "id" chti.
     *
     * @param id the id of the chti to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chti, or with status 404 (Not Found)
     */
    @GetMapping("/chtis/{id}")
    public ResponseEntity<Chti> getChti(@PathVariable Long id) {
        log.debug("REST request to get Chti : {}", id);
        Optional<Chti> chti = chtiService.findOne(id);
        return ResponseUtil.wrapOrNotFound(chti);
    }

    /**
     * DELETE  /chtis/:id : delete the "id" chti.
     *
     * @param id the id of the chti to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chtis/{id}")
    public ResponseEntity<Void> deleteChti(@PathVariable Long id) {
        log.debug("REST request to delete Chti : {}", id);
        chtiService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
