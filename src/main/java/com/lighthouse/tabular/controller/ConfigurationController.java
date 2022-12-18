package com.lighthouse.tabular.controller;

import com.lighthouse.tabular.models.Frequency;
import com.lighthouse.tabular.updater.UpdateTrigger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/config")
@CrossOrigin
public class ConfigurationController {
    @Autowired
    private UpdateTrigger updateTrigger;

    @Value("${min_update_frequency_milliseconds}")
    private int minUpdateFrequencyMillis;

    @Value("${max_update_frequency_milliseconds}")
    private int maxUpdateFrequencyMillis;

    @PostMapping("/updateFrequency")
    private ResponseEntity<Frequency> setUpdateFrequency(@RequestBody Frequency frequency) {
        int newFrequencyMillis = frequency.getIntervalMillis();

        if (newFrequencyMillis < minUpdateFrequencyMillis || newFrequencyMillis > maxUpdateFrequencyMillis) {
            throw new FrequencyValidationException(String.format(
                "Frequency value should be between %s and %s", minUpdateFrequencyMillis, maxUpdateFrequencyMillis
            ));
        }

        updateTrigger.updateDelay(newFrequencyMillis);
        return ResponseEntity.ok(frequency);
    }
}
