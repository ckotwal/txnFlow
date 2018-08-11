package com.bnymellon.synthetictxn.txnflow.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ApplicationTransactionField.
 */
@Entity
@Table(name = "application_transaction_field")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ApplicationTransactionField implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "is_identifier")
    private Boolean isIdentifier;

    @Column(name = "filter_value")
    private String filterValue;

    @ManyToOne
    @JsonIgnoreProperties("fields")
    private ApplicationTransaction application;

    @ManyToOne
    @JsonIgnoreProperties("fields")
    private FlowApplicationSequence applicationOverride;

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

    public ApplicationTransactionField name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isIsIdentifier() {
        return isIdentifier;
    }

    public ApplicationTransactionField isIdentifier(Boolean isIdentifier) {
        this.isIdentifier = isIdentifier;
        return this;
    }

    public void setIsIdentifier(Boolean isIdentifier) {
        this.isIdentifier = isIdentifier;
    }

    public String getFilterValue() {
        return filterValue;
    }

    public ApplicationTransactionField filterValue(String filterValue) {
        this.filterValue = filterValue;
        return this;
    }

    public void setFilterValue(String filterValue) {
        this.filterValue = filterValue;
    }

    public ApplicationTransaction getApplication() {
        return application;
    }

    public ApplicationTransactionField application(ApplicationTransaction applicationTransaction) {
        this.application = applicationTransaction;
        return this;
    }

    public void setApplication(ApplicationTransaction applicationTransaction) {
        this.application = applicationTransaction;
    }

    public FlowApplicationSequence getApplicationOverride() {
        return applicationOverride;
    }

    public ApplicationTransactionField applicationOverride(FlowApplicationSequence flowApplicationSequence) {
        this.applicationOverride = flowApplicationSequence;
        return this;
    }

    public void setApplicationOverride(FlowApplicationSequence flowApplicationSequence) {
        this.applicationOverride = flowApplicationSequence;
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
        ApplicationTransactionField applicationTransactionField = (ApplicationTransactionField) o;
        if (applicationTransactionField.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), applicationTransactionField.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ApplicationTransactionField{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isIdentifier='" + isIsIdentifier() + "'" +
            ", filterValue='" + getFilterValue() + "'" +
            "}";
    }
}
