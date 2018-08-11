package com.bnymellon.synthetictxn.txnflow.web.rest;

import com.bnymellon.synthetictxn.txnflow.TransactionFlowConfigurationApp;

import com.bnymellon.synthetictxn.txnflow.domain.ApplicationTransactionField;
import com.bnymellon.synthetictxn.txnflow.repository.ApplicationTransactionFieldRepository;
import com.bnymellon.synthetictxn.txnflow.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.bnymellon.synthetictxn.txnflow.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ApplicationTransactionFieldResource REST controller.
 *
 * @see ApplicationTransactionFieldResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TransactionFlowConfigurationApp.class)
public class ApplicationTransactionFieldResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_IDENTIFIER = false;
    private static final Boolean UPDATED_IS_IDENTIFIER = true;

    private static final String DEFAULT_FILTER_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_FILTER_VALUE = "BBBBBBBBBB";

    @Autowired
    private ApplicationTransactionFieldRepository applicationTransactionFieldRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restApplicationTransactionFieldMockMvc;

    private ApplicationTransactionField applicationTransactionField;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ApplicationTransactionFieldResource applicationTransactionFieldResource = new ApplicationTransactionFieldResource(applicationTransactionFieldRepository);
        this.restApplicationTransactionFieldMockMvc = MockMvcBuilders.standaloneSetup(applicationTransactionFieldResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ApplicationTransactionField createEntity(EntityManager em) {
        ApplicationTransactionField applicationTransactionField = new ApplicationTransactionField()
            .name(DEFAULT_NAME)
            .isIdentifier(DEFAULT_IS_IDENTIFIER)
            .filterValue(DEFAULT_FILTER_VALUE);
        return applicationTransactionField;
    }

    @Before
    public void initTest() {
        applicationTransactionField = createEntity(em);
    }

    @Test
    @Transactional
    public void createApplicationTransactionField() throws Exception {
        int databaseSizeBeforeCreate = applicationTransactionFieldRepository.findAll().size();

        // Create the ApplicationTransactionField
        restApplicationTransactionFieldMockMvc.perform(post("/api/application-transaction-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationTransactionField)))
            .andExpect(status().isCreated());

        // Validate the ApplicationTransactionField in the database
        List<ApplicationTransactionField> applicationTransactionFieldList = applicationTransactionFieldRepository.findAll();
        assertThat(applicationTransactionFieldList).hasSize(databaseSizeBeforeCreate + 1);
        ApplicationTransactionField testApplicationTransactionField = applicationTransactionFieldList.get(applicationTransactionFieldList.size() - 1);
        assertThat(testApplicationTransactionField.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testApplicationTransactionField.isIsIdentifier()).isEqualTo(DEFAULT_IS_IDENTIFIER);
        assertThat(testApplicationTransactionField.getFilterValue()).isEqualTo(DEFAULT_FILTER_VALUE);
    }

    @Test
    @Transactional
    public void createApplicationTransactionFieldWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationTransactionFieldRepository.findAll().size();

        // Create the ApplicationTransactionField with an existing ID
        applicationTransactionField.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationTransactionFieldMockMvc.perform(post("/api/application-transaction-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationTransactionField)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationTransactionField in the database
        List<ApplicationTransactionField> applicationTransactionFieldList = applicationTransactionFieldRepository.findAll();
        assertThat(applicationTransactionFieldList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllApplicationTransactionFields() throws Exception {
        // Initialize the database
        applicationTransactionFieldRepository.saveAndFlush(applicationTransactionField);

        // Get all the applicationTransactionFieldList
        restApplicationTransactionFieldMockMvc.perform(get("/api/application-transaction-fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(applicationTransactionField.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].isIdentifier").value(hasItem(DEFAULT_IS_IDENTIFIER.booleanValue())))
            .andExpect(jsonPath("$.[*].filterValue").value(hasItem(DEFAULT_FILTER_VALUE.toString())));
    }
    

    @Test
    @Transactional
    public void getApplicationTransactionField() throws Exception {
        // Initialize the database
        applicationTransactionFieldRepository.saveAndFlush(applicationTransactionField);

        // Get the applicationTransactionField
        restApplicationTransactionFieldMockMvc.perform(get("/api/application-transaction-fields/{id}", applicationTransactionField.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(applicationTransactionField.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.isIdentifier").value(DEFAULT_IS_IDENTIFIER.booleanValue()))
            .andExpect(jsonPath("$.filterValue").value(DEFAULT_FILTER_VALUE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingApplicationTransactionField() throws Exception {
        // Get the applicationTransactionField
        restApplicationTransactionFieldMockMvc.perform(get("/api/application-transaction-fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplicationTransactionField() throws Exception {
        // Initialize the database
        applicationTransactionFieldRepository.saveAndFlush(applicationTransactionField);

        int databaseSizeBeforeUpdate = applicationTransactionFieldRepository.findAll().size();

        // Update the applicationTransactionField
        ApplicationTransactionField updatedApplicationTransactionField = applicationTransactionFieldRepository.findById(applicationTransactionField.getId()).get();
        // Disconnect from session so that the updates on updatedApplicationTransactionField are not directly saved in db
        em.detach(updatedApplicationTransactionField);
        updatedApplicationTransactionField
            .name(UPDATED_NAME)
            .isIdentifier(UPDATED_IS_IDENTIFIER)
            .filterValue(UPDATED_FILTER_VALUE);

        restApplicationTransactionFieldMockMvc.perform(put("/api/application-transaction-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedApplicationTransactionField)))
            .andExpect(status().isOk());

        // Validate the ApplicationTransactionField in the database
        List<ApplicationTransactionField> applicationTransactionFieldList = applicationTransactionFieldRepository.findAll();
        assertThat(applicationTransactionFieldList).hasSize(databaseSizeBeforeUpdate);
        ApplicationTransactionField testApplicationTransactionField = applicationTransactionFieldList.get(applicationTransactionFieldList.size() - 1);
        assertThat(testApplicationTransactionField.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testApplicationTransactionField.isIsIdentifier()).isEqualTo(UPDATED_IS_IDENTIFIER);
        assertThat(testApplicationTransactionField.getFilterValue()).isEqualTo(UPDATED_FILTER_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingApplicationTransactionField() throws Exception {
        int databaseSizeBeforeUpdate = applicationTransactionFieldRepository.findAll().size();

        // Create the ApplicationTransactionField

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restApplicationTransactionFieldMockMvc.perform(put("/api/application-transaction-fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(applicationTransactionField)))
            .andExpect(status().isBadRequest());

        // Validate the ApplicationTransactionField in the database
        List<ApplicationTransactionField> applicationTransactionFieldList = applicationTransactionFieldRepository.findAll();
        assertThat(applicationTransactionFieldList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplicationTransactionField() throws Exception {
        // Initialize the database
        applicationTransactionFieldRepository.saveAndFlush(applicationTransactionField);

        int databaseSizeBeforeDelete = applicationTransactionFieldRepository.findAll().size();

        // Get the applicationTransactionField
        restApplicationTransactionFieldMockMvc.perform(delete("/api/application-transaction-fields/{id}", applicationTransactionField.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ApplicationTransactionField> applicationTransactionFieldList = applicationTransactionFieldRepository.findAll();
        assertThat(applicationTransactionFieldList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ApplicationTransactionField.class);
        ApplicationTransactionField applicationTransactionField1 = new ApplicationTransactionField();
        applicationTransactionField1.setId(1L);
        ApplicationTransactionField applicationTransactionField2 = new ApplicationTransactionField();
        applicationTransactionField2.setId(applicationTransactionField1.getId());
        assertThat(applicationTransactionField1).isEqualTo(applicationTransactionField2);
        applicationTransactionField2.setId(2L);
        assertThat(applicationTransactionField1).isNotEqualTo(applicationTransactionField2);
        applicationTransactionField1.setId(null);
        assertThat(applicationTransactionField1).isNotEqualTo(applicationTransactionField2);
    }
}
