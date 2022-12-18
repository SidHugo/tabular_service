package com.lighthouse.tabular.config;

import com.lighthouse.tabular.updater.UpdateTrigger;
import com.lighthouse.tabular.updater.Updater;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

import java.time.Instant;

@Configuration
@EnableScheduling
public class UpdaterConfig implements SchedulingConfigurer {
    @Autowired
    private Updater updater;

    @Autowired
    private UpdateTrigger updateTrigger;

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        taskRegistrar.addTriggerTask(
            updater,
            updateTrigger
        );
    }
}
