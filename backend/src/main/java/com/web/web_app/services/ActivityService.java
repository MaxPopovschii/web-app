
package com.web.web_app.services;

import com.web.web_app.model.Activity;
import com.web.web_app.repository.ActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ActivityService implements com.web.web_app.services.Service<Activity> {
    private static final Logger logger = LoggerFactory.getLogger(ActivityService.class);
    @Autowired
    private ActivityRepo activityRepo;

    @Override
    public List<Activity> getAll() {
        logger.info("Recupero tutte le attività");
        return activityRepo.findAll();
    }

    // Paginazione attività
    public Page<Activity> getAll(Pageable pageable) {
        logger.info("Recupero pagina attività: {}", pageable);
        return activityRepo.findAll(pageable);
    }

    @Override
    public Activity create(Activity entity) {
        logger.info("Creo nuova attività");
        return activityRepo.save(entity);
    }

    @Override
    public Activity update(Long id, Activity entity) {
        logger.info("Aggiorno attività con id {}", id);
        Activity activity = activityRepo.findById(id).orElseThrow();
        activity.setType(entity.getType());
        activity.setAmount(entity.getAmount());
        activity.setDate(entity.getDate());
        activity.setUser(entity.getUser());
        return activityRepo.save(activity);
    }

    @Override
    public void delete(Long id) {
        logger.info("Elimino attività con id {}", id);
        Activity activity = activityRepo.findById(id).orElseThrow();
        activityRepo.delete(activity);
    }

    @Override
    public Activity getById(Long id) {
        logger.info("Recupero attività con id {}", id);
        return activityRepo.findById(id).orElseThrow();
    }
}
