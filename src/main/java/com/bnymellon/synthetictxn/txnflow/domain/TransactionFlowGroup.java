package com.bnymellon.synthetictxn.txnflow.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TransactionFlowGroup.
 */
@Entity
@Table(name = "transaction_flow_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TransactionFlowGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "group")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TransactionFlow> flows = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public TransactionFlowGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TransactionFlow> getFlows() {
        return flows;
    }

    public TransactionFlowGroup flows(Set<TransactionFlow> transactionFlows) {
        this.flows = transactionFlows;
        return this;
    }

    public TransactionFlowGroup addFlow(TransactionFlow transactionFlow) {
        this.flows.add(transactionFlow);
        transactionFlow.setGroup(this);
        return this;
    }

    public TransactionFlowGroup removeFlow(TransactionFlow transactionFlow) {
        this.flows.remove(transactionFlow);
        transactionFlow.setGroup(null);
        return this;
    }

    public void setFlows(Set<TransactionFlow> transactionFlows) {
        this.flows = transactionFlows;
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
        TransactionFlowGroup transactionFlowGroup = (TransactionFlowGroup) o;
        if (transactionFlowGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionFlowGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionFlowGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
