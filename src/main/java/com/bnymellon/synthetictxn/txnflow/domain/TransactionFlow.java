package com.bnymellon.synthetictxn.txnflow.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TransactionFlow.
 */
@Entity
@Table(name = "transaction_flow")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransactionFlow implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "l_ob")
    private String lOB;

    @Column(name = "name")
    private String name;

    @Column(name = "flow_correlation_id")
    private String flowCorrelationId;

    @OneToMany(mappedBy = "flow")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlowApplicationSequence> applications = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("flows")
    private TransactionFlowGroup group;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getlOB() {
        return lOB;
    }

    public TransactionFlow lOB(String lOB) {
        this.lOB = lOB;
        return this;
    }

    public void setlOB(String lOB) {
        this.lOB = lOB;
    }

    public String getName() {
        return name;
    }

    public TransactionFlow name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFlowCorrelationId() {
        return flowCorrelationId;
    }

    public TransactionFlow flowCorrelationId(String flowCorrelationId) {
        this.flowCorrelationId = flowCorrelationId;
        return this;
    }

    public void setFlowCorrelationId(String flowCorrelationId) {
        this.flowCorrelationId = flowCorrelationId;
    }

    public Set<FlowApplicationSequence> getApplications() {
        return applications;
    }

    public TransactionFlow applications(Set<FlowApplicationSequence> flowApplicationSequences) {
        this.applications = flowApplicationSequences;
        return this;
    }

    public TransactionFlow addApplication(FlowApplicationSequence flowApplicationSequence) {
        this.applications.add(flowApplicationSequence);
        flowApplicationSequence.setFlow(this);
        return this;
    }

    public TransactionFlow removeApplication(FlowApplicationSequence flowApplicationSequence) {
        this.applications.remove(flowApplicationSequence);
        flowApplicationSequence.setFlow(null);
        return this;
    }

    public void setApplications(Set<FlowApplicationSequence> flowApplicationSequences) {
        this.applications = flowApplicationSequences;
    }

    public TransactionFlowGroup getGroup() {
        return group;
    }

    public TransactionFlow group(TransactionFlowGroup transactionFlowGroup) {
        this.group = transactionFlowGroup;
        return this;
    }

    public void setGroup(TransactionFlowGroup transactionFlowGroup) {
        this.group = transactionFlowGroup;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TransactionFlow transactionFlow = (TransactionFlow) o;
        if (transactionFlow.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionFlow.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionFlow{" +
            "id=" + getId() +
            ", lOB='" + getlOB() + "'" +
            ", name='" + getName() + "'" +
            ", flowCorrelationId='" + getFlowCorrelationId() + "'" +
            "}";
    }
}
