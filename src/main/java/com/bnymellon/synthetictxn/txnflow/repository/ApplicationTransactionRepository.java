package com.bnymellon.synthetictxn.txnflow.repository;

import com.bnymellon.synthetictxn.txnflow.domain.ApplicationTransaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ApplicationTransaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationTransactionRepository extends JpaRepository<ApplicationTransaction, Long> {

}
