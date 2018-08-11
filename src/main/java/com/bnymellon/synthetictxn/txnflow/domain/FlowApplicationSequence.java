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
 * A FlowApplicationSequence.
 */
@Entity
@Table(name = "flow_application_sequence")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlowApplicationSequence implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_sequence")
    private Integer sequence;

    @OneToMany(mappedBy = "applicationOverride")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ApplicationTransactionField> fields = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("applications")
    private TransactionFlow flow;

    @ManyToOne
    @JsonIgnoreProperties("flows")
    private ApplicationTransaction application;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSequence() {
        return sequence;
    }

    public FlowApplicationSequence sequence(Integer sequence) {
        this.sequence = sequence;
        return this;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public Set<ApplicationTransactionField> getFields() {
        return fields;
    }

    public FlowApplicationSequence fields(Set<ApplicationTransactionField> applicationTransactionFields) {
        this.fields = applicationTransactionFields;
        return this;
    }

    public FlowApplicationSequence addField(ApplicationTransactionField applicationTransactionField) {
        this.fields.add(applicationTransactionField);
        applicationTransactionField.setApplicationOverride(this);
        return this;
    }

    public FlowApplicationSequence removeField(ApplicationTransactionField applicationTransactionField) {
        this.fields.remove(applicationTransactionField);
        applicationTransactionField.setApplicationOverride(null);
        return this;
    }

    public void setFields(Set<ApplicationTransactionField> applicationTransactionFields) {
        this.fields = applicationTransactionFields;
    }

    public TransactionFlow getFlow() {
        return flow;
    }

    public FlowApplicationSequence flow(TransactionFlow transactionFlow) {
        this.flow = transactionFlow;
        return this;
    }

    public void setFlow(TransactionFlow transactionFlow) {
        this.flow = transactionFlow;
    }

    public ApplicationTransaction getApplication() {
        return application;
    }

    public FlowApplicationSequence application(ApplicationTransaction applicationTransaction) {
        this.application = applicationTransaction;
        return this;
    }

    public void setApplication(ApplicationTransaction applicationTransaction) {
        this.application = applicationTransaction;
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
        FlowApplicationSequence flowApplicationSequence = (FlowApplicationSequence) o;
        if (flowApplicationSequence.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flowApplicationSequence.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlowApplicationSequence{" +
            "id=" + getId() +
            ", sequence=" + getSequence() +
            "}";
    }
}
