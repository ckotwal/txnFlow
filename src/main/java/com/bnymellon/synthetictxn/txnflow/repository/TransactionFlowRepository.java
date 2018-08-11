package com.bnymellon.synthetictxn.txnflow.repository;

import com.bnymellon.synthetictxn.txnflow.domain.TransactionFlow;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransactionFlow entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionFlowRepository extends JpaRepository<TransactionFlow, Long> {

}
