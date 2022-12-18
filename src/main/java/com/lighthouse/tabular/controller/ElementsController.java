package com.lighthouse.tabular.controller;

import com.lighthouse.tabular.models.Element;
import com.lighthouse.tabular.storage.ElementsStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;

@Controller
@CrossOrigin
@RequestMapping("/elements")
public class ElementsController {
    @Autowired
    private ElementsStorage elementsStorage;

    @RequestMapping("/all")
    public ResponseEntity<Collection<Element>> getAllElements() {
        return ResponseEntity.ok(elementsStorage.getAllElements());
    }
}
