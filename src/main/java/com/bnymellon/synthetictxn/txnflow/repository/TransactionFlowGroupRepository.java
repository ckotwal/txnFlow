package com.bnymellon.synthetictxn.txnflow.repository;

import com.bnymellon.synthetictxn.txnflow.domain.TransactionFlowGroup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TransactionFlowGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransactionFlowGroupRepository extends JpaRepository<TransactionFlowGroup, Long> {

}
