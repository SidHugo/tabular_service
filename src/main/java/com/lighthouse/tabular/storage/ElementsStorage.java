package com.lighthouse.tabular.storage;

import com.lighthouse.tabular.models.Element;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@EnableConfigurationProperties(ElementsStorageProperties.class)
public class ElementsStorage {
    private Map<String, Element> symbolToElement = new HashMap<>();

    public ElementsStorage(ElementsStorageProperties properties) {
        for (String symbol : properties.getSymbols()) {
            symbolToElement.put(symbol, new Element(symbol, 0));
        }
    }

    public Element updateSymbol(String symbol, float price) {
        Element element = symbolToElement.get(symbol);
        if (element == null) {
            return null;
        }

        element.setPrice(price);

        return element;
    }

    public List<String> getRandomSymbols(int amount) {
        ArrayList<String> symbols = new ArrayList<>(symbolToElement.keySet());
        Collections.shuffle(symbols);
        return symbols.subList(0, Math.min(amount, symbols.size()));
    }

    public Collection<Element> getAllElements() {
        return symbolToElement.values();
    }
}
