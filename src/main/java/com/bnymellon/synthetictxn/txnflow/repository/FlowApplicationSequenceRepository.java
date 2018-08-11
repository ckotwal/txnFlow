package com.bnymellon.synthetictxn.txnflow.repository;

import com.bnymellon.synthetictxn.txnflow.domain.FlowApplicationSequence;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FlowApplicationSequence entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlowApplicationSequenceRepository extends JpaRepository<FlowApplicationSequence, Long> {

}
