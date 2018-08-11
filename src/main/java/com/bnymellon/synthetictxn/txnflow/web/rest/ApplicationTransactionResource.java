package com.bnymellon.synthetictxn.txnflow.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bnymellon.synthetictxn.txnflow.domain.ApplicationTransaction;
import com.bnymellon.synthetictxn.txnflow.repository.ApplicationTransactionRepository;
import com.bnymellon.synthetictxn.txnflow.web.rest.errors.BadRequestAlertException;
import com.bnymellon.synthetictxn.txnflow.web.rest.util.HeaderUtil;
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
 * REST controller for managing ApplicationTransaction.
 */
@RestController
@RequestMapping("/api")
public class ApplicationTransactionResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationTransactionResource.class);

    private static final String ENTITY_NAME = "applicationTransaction";

    private final ApplicationTransactionRepository applicationTransactionRepository;

    public ApplicationTransactionResource(ApplicationTransactionRepository applicationTransactionRepository) {
        this.applicationTransactionRepository = applicationTransactionRepository;
    }

    /**
     * POST  /application-transactions : Create a new applicationTransaction.
     *
     * @param applicationTransaction the applicationTransaction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new applicationTransaction, or with status 400 (Bad Request) if the applicationTransaction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/application-transactions")
    @Timed
    public ResponseEntity<ApplicationTransaction> createApplicationTransaction(@RequestBody ApplicationTransaction applicationTransaction) throws URISyntaxException {
        log.debug("REST request to save ApplicationTransaction : {}", applicationTransaction);
        if (applicationTransaction.getId() != null) {
            throw new BadRequestAlertException("A new applicationTransaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationTransaction result = applicationTransactionRepository.save(applicationTransaction);
        return ResponseEntity.created(new URI("/api/application-transactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /application-transactions : Updates an existing applicationTransaction.
     *
     * @param applicationTransaction the applicationTransaction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated applicationTransaction,
     * or with status 400 (Bad Request) if the applicationTransaction is not valid,
     * or with status 500 (Internal Server Error) if the applicationTransaction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/application-transactions")
    @Timed
    public ResponseEntity<ApplicationTransaction> updateApplicationTransaction(@RequestBody ApplicationTransaction applicationTransaction) throws URISyntaxException {
        log.debug("REST request to update ApplicationTransaction : {}", applicationTransaction);
        if (applicationTransaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApplicationTransaction result = applicationTransactionRepository.save(applicationTransaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, applicationTransaction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /application-transactions : get all the applicationTransactions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of applicationTransactions in body
     */
    @GetMapping("/application-transactions")
    @Timed
    public List<ApplicationTransaction> getAllApplicationTransactions() {
        log.debug("REST request to get all ApplicationTransactions");
        return applicationTransactionRepository.findAll();
    }

    /**
     * GET  /application-transactions/:id : get the "id" applicationTransaction.
     *
     * @param id the id of the applicationTransaction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the applicationTransaction, or with status 404 (Not Found)
     */
    @GetMapping("/application-transactions/{id}")
    @Timed
    public ResponseEntity<ApplicationTransaction> getApplicationTransaction(@PathVariable Long id) {
        log.debug("REST request to get ApplicationTransaction : {}", id);
        Optional<ApplicationTransaction> applicationTransaction = applicationTransactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(applicationTransaction);
    }

    /**
     * DELETE  /application-transactions/:id : delete the "id" applicationTransaction.
     *
     * @param id the id of the applicationTransaction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/application-transactions/{id}")
    @Timed
    public ResponseEntity<Void> deleteApplicationTransaction(@PathVariable Long id) {
        log.debug("REST request to delete ApplicationTransaction : {}", id);

        applicationTransactionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
