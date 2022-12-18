package com.lighthouse.tabular.updater;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
public class UpdateTrigger implements Trigger {
    private int delayMillis;

    public UpdateTrigger(@Value("${update_frequency_milliseconds}") int delayMillis) {
        this.delayMillis = delayMillis;
    }

    @Override
    public Instant nextExecution(TriggerContext triggerContext) {
        return Instant.now().plus(delayMillis, ChronoUnit.MILLIS);
    }

    public void updateDelay(int delayMillis) {
        this.delayMillis = delayMillis;
    }
}
