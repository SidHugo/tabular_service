package com.lighthouse.tabular.controller;

import com.lighthouse.tabular.models.Interval;
import com.lighthouse.tabular.updater.UpdateTrigger;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/updateInterval")
    private ResponseEntity<Interval> setUpdateInterval(@RequestBody Interval interval) {
        updateTrigger.updateDelay(interval.getIntervalMillis());
        return ResponseEntity.ok(interval);
    }
}
