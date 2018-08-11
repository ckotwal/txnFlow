package com.bnymellon.synthetictxn.txnflow.web.rest;

import com.bnymellon.synthetictxn.txnflow.TransactionFlowConfigurationApp;

import com.bnymellon.synthetictxn.txnflow.domain.FlowApplicationSequence;
import com.bnymellon.synthetictxn.txnflow.repository.FlowApplicationSequenceRepository;
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
 * Test class for the FlowApplicationSequenceResource REST controller.
 *
 * @see FlowApplicationSequenceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TransactionFlowConfigurationApp.class)
public class FlowApplicationSequenceResourceIntTest {

    private static final Integer DEFAULT_SEQUENCE = 1;
    private static final Integer UPDATED_SEQUENCE = 2;

    @Autowired
    private FlowApplicationSequenceRepository flowApplicationSequenceRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFlowApplicationSequenceMockMvc;

    private FlowApplicationSequence flowApplicationSequence;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FlowApplicationSequenceResource flowApplicationSequenceResource = new FlowApplicationSequenceResource(flowApplicationSequenceRepository);
        this.restFlowApplicationSequenceMockMvc = MockMvcBuilders.standaloneSetup(flowApplicationSequenceResource)
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
    public static FlowApplicationSequence createEntity(EntityManager em) {
        FlowApplicationSequence flowApplicationSequence = new FlowApplicationSequence()
            .sequence(DEFAULT_SEQUENCE);
        return flowApplicationSequence;
    }

    @Before
    public void initTest() {
        flowApplicationSequence = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlowApplicationSequence() throws Exception {
        int databaseSizeBeforeCreate = flowApplicationSequenceRepository.findAll().size();

        // Create the FlowApplicationSequence
        restFlowApplicationSequenceMockMvc.perform(post("/api/flow-application-sequences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flowApplicationSequence)))
            .andExpect(status().isCreated());

        // Validate the FlowApplicationSequence in the database
        List<FlowApplicationSequence> flowApplicationSequenceList = flowApplicationSequenceRepository.findAll();
        assertThat(flowApplicationSequenceList).hasSize(databaseSizeBeforeCreate + 1);
        FlowApplicationSequence testFlowApplicationSequence = flowApplicationSequenceList.get(flowApplicationSequenceList.size() - 1);
        assertThat(testFlowApplicationSequence.getSequence()).isEqualTo(DEFAULT_SEQUENCE);
    }

    @Test
    @Transactional
    public void createFlowApplicationSequenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flowApplicationSequenceRepository.findAll().size();

        // Create the FlowApplicationSequence with an existing ID
        flowApplicationSequence.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlowApplicationSequenceMockMvc.perform(post("/api/flow-application-sequences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flowApplicationSequence)))
            .andExpect(status().isBadRequest());

        // Validate the FlowApplicationSequence in the database
        List<FlowApplicationSequence> flowApplicationSequenceList = flowApplicationSequenceRepository.findAll();
        assertThat(flowApplicationSequenceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFlowApplicationSequences() throws Exception {
        // Initialize the database
        flowApplicationSequenceRepository.saveAndFlush(flowApplicationSequence);

        // Get all the flowApplicationSequenceList
        restFlowApplicationSequenceMockMvc.perform(get("/api/flow-application-sequences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flowApplicationSequence.getId().intValue())))
            .andExpect(jsonPath("$.[*].sequence").value(hasItem(DEFAULT_SEQUENCE)));
    }
    

    @Test
    @Transactional
    public void getFlowApplicationSequence() throws Exception {
        // Initialize the database
        flowApplicationSequenceRepository.saveAndFlush(flowApplicationSequence);

        // Get the flowApplicationSequence
        restFlowApplicationSequenceMockMvc.perform(get("/api/flow-application-sequences/{id}", flowApplicationSequence.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(flowApplicationSequence.getId().intValue()))
            .andExpect(jsonPath("$.sequence").value(DEFAULT_SEQUENCE));
    }
    @Test
    @Transactional
    public void getNonExistingFlowApplicationSequence() throws Exception {
        // Get the flowApplicationSequence
        restFlowApplicationSequenceMockMvc.perform(get("/api/flow-application-sequences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlowApplicationSequence() throws Exception {
        // Initialize the database
        flowApplicationSequenceRepository.saveAndFlush(flowApplicationSequence);

        int databaseSizeBeforeUpdate = flowApplicationSequenceRepository.findAll().size();

        // Update the flowApplicationSequence
        FlowApplicationSequence updatedFlowApplicationSequence = flowApplicationSequenceRepository.findById(flowApplicationSequence.getId()).get();
        // Disconnect from session so that the updates on updatedFlowApplicationSequence are not directly saved in db
        em.detach(updatedFlowApplicationSequence);
        updatedFlowApplicationSequence
            .sequence(UPDATED_SEQUENCE);

        restFlowApplicationSequenceMockMvc.perform(put("/api/flow-application-sequences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlowApplicationSequence)))
            .andExpect(status().isOk());

        // Validate the FlowApplicationSequence in the database
        List<FlowApplicationSequence> flowApplicationSequenceList = flowApplicationSequenceRepository.findAll();
        assertThat(flowApplicationSequenceList).hasSize(databaseSizeBeforeUpdate);
        FlowApplicationSequence testFlowApplicationSequence = flowApplicationSequenceList.get(flowApplicationSequenceList.size() - 1);
        assertThat(testFlowApplicationSequence.getSequence()).isEqualTo(UPDATED_SEQUENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlowApplicationSequence() throws Exception {
        int databaseSizeBeforeUpdate = flowApplicationSequenceRepository.findAll().size();

        // Create the FlowApplicationSequence

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFlowApplicationSequenceMockMvc.perform(put("/api/flow-application-sequences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(flowApplicationSequence)))
            .andExpect(status().isBadRequest());

        // Validate the FlowApplicationSequence in the database
        List<FlowApplicationSequence> flowApplicationSequenceList = flowApplicationSequenceRepository.findAll();
        assertThat(flowApplicationSequenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlowApplicationSequence() throws Exception {
        // Initialize the database
        flowApplicationSequenceRepository.saveAndFlush(flowApplicationSequence);

        int databaseSizeBeforeDelete = flowApplicationSequenceRepository.findAll().size();

        // Get the flowApplicationSequence
        restFlowApplicationSequenceMockMvc.perform(delete("/api/flow-application-sequences/{id}", flowApplicationSequence.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FlowApplicationSequence> flowApplicationSequenceList = flowApplicationSequenceRepository.findAll();
        assertThat(flowApplicationSequenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FlowApplicationSequence.class);
        FlowApplicationSequence flowApplicationSequence1 = new FlowApplicationSequence();
        flowApplicationSequence1.setId(1L);
        FlowApplicationSequence flowApplicationSequence2 = new FlowApplicationSequence();
        flowApplicationSequence2.setId(flowApplicationSequence1.getId());
        assertThat(flowApplicationSequence1).isEqualTo(flowApplicationSequence2);
        flowApplicationSequence2.setId(2L);
        assertThat(flowApplicationSequence1).isNotEqualTo(flowApplicationSequence2);
        flowApplicationSequence1.setId(null);
        assertThat(flowApplicationSequence1).isNotEqualTo(flowApplicationSequence2);
    }
}
