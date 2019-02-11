package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Chti;
import io.github.jhipster.application.repository.ChtiRepository;
import io.github.jhipster.application.service.ChtiService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ChtiResource REST controller.
 *
 * @see ChtiResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ChtiResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ChtiRepository chtiRepository;

    @Autowired
    private ChtiService chtiService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restChtiMockMvc;

    private Chti chti;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChtiResource chtiResource = new ChtiResource(chtiService);
        this.restChtiMockMvc = MockMvcBuilders.standaloneSetup(chtiResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chti createEntity(EntityManager em) {
        Chti chti = new Chti()
            .name(DEFAULT_NAME);
        return chti;
    }

    @Before
    public void initTest() {
        chti = createEntity(em);
    }

    @Test
    @Transactional
    public void createChti() throws Exception {
        int databaseSizeBeforeCreate = chtiRepository.findAll().size();

        // Create the Chti
        restChtiMockMvc.perform(post("/api/chtis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chti)))
            .andExpect(status().isCreated());

        // Validate the Chti in the database
        List<Chti> chtiList = chtiRepository.findAll();
        assertThat(chtiList).hasSize(databaseSizeBeforeCreate + 1);
        Chti testChti = chtiList.get(chtiList.size() - 1);
        assertThat(testChti.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createChtiWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chtiRepository.findAll().size();

        // Create the Chti with an existing ID
        chti.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChtiMockMvc.perform(post("/api/chtis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chti)))
            .andExpect(status().isBadRequest());

        // Validate the Chti in the database
        List<Chti> chtiList = chtiRepository.findAll();
        assertThat(chtiList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllChtis() throws Exception {
        // Initialize the database
        chtiRepository.saveAndFlush(chti);

        // Get all the chtiList
        restChtiMockMvc.perform(get("/api/chtis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chti.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getChti() throws Exception {
        // Initialize the database
        chtiRepository.saveAndFlush(chti);

        // Get the chti
        restChtiMockMvc.perform(get("/api/chtis/{id}", chti.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chti.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChti() throws Exception {
        // Get the chti
        restChtiMockMvc.perform(get("/api/chtis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChti() throws Exception {
        // Initialize the database
        chtiService.save(chti);

        int databaseSizeBeforeUpdate = chtiRepository.findAll().size();

        // Update the chti
        Chti updatedChti = chtiRepository.findById(chti.getId()).get();
        // Disconnect from session so that the updates on updatedChti are not directly saved in db
        em.detach(updatedChti);
        updatedChti
            .name(UPDATED_NAME);

        restChtiMockMvc.perform(put("/api/chtis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChti)))
            .andExpect(status().isOk());

        // Validate the Chti in the database
        List<Chti> chtiList = chtiRepository.findAll();
        assertThat(chtiList).hasSize(databaseSizeBeforeUpdate);
        Chti testChti = chtiList.get(chtiList.size() - 1);
        assertThat(testChti.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingChti() throws Exception {
        int databaseSizeBeforeUpdate = chtiRepository.findAll().size();

        // Create the Chti

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChtiMockMvc.perform(put("/api/chtis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chti)))
            .andExpect(status().isBadRequest());

        // Validate the Chti in the database
        List<Chti> chtiList = chtiRepository.findAll();
        assertThat(chtiList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChti() throws Exception {
        // Initialize the database
        chtiService.save(chti);

        int databaseSizeBeforeDelete = chtiRepository.findAll().size();

        // Delete the chti
        restChtiMockMvc.perform(delete("/api/chtis/{id}", chti.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Chti> chtiList = chtiRepository.findAll();
        assertThat(chtiList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chti.class);
        Chti chti1 = new Chti();
        chti1.setId(1L);
        Chti chti2 = new Chti();
        chti2.setId(chti1.getId());
        assertThat(chti1).isEqualTo(chti2);
        chti2.setId(2L);
        assertThat(chti1).isNotEqualTo(chti2);
        chti1.setId(null);
        assertThat(chti1).isNotEqualTo(chti2);
    }
}
