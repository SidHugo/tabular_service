package com.lighthouse.tabular.updater;

import com.lighthouse.tabular.models.Element;
import com.lighthouse.tabular.storage.ElementsStorage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class Updater implements Runnable {
    private final Random random = new Random();
    private final int elementsPerUpdate;
    private final int maxPrice;

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private ElementsStorage elementsStorage;

    public Updater(
        @Value("${elements_per_update}") int elementsPerUpdate,
        @Value("${max_price}") int maxPrice
    ) {
        this.elementsPerUpdate = elementsPerUpdate;
        this.maxPrice = maxPrice;
    }

    @Override
    public void run() {
        List<Element> updatedElements = new ArrayList<>(elementsPerUpdate);
        elementsStorage.getRandomSymbols(elementsPerUpdate).forEach(symbol ->
            updatedElements.add(
                elementsStorage.updateSymbol(symbol, random.nextFloat() * random.nextInt(maxPrice))
            )
        );

        template.convertAndSend("/topic/updates", updatedElements);
    }
}
