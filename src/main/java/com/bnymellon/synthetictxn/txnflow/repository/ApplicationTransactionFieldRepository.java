package com.bnymellon.synthetictxn.txnflow.repository;

import com.bnymellon.synthetictxn.txnflow.domain.ApplicationTransactionField;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ApplicationTransactionField entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationTransactionFieldRepository extends JpaRepository<ApplicationTransactionField, Long> {

}
