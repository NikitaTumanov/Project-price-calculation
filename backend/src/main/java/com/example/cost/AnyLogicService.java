package com.example.cost;

import com.xj.anylogic.engine.Engine;
import projectcostmodel.Simulation;
import projectcostmodel.Main;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AnyLogicService {

    Engine engine;
    Main main;

    void initModel(Data data) {
        Simulation s = new Simulation();
        engine = s.getEngine();
        engine.setDefaultRandomGenerator(new Random(System.currentTimeMillis()));
        main = new Main(engine, null, null);
        main.setDefaultRandomGenerator(new Random(System.currentTimeMillis()));
        main.totalWorkTime = data.getTotalWorkTime();
        main.totalWorkAmount = data.getTotalWorkAmount();
        main.teamEfficiency = data.getTeamEfficiency();
        main.outsourceEfficiency = data.getOutsourceEfficiency();
        main.teamPrice = data.getTeamPrice();
        main.outsourcePrice = data.getOutsourcePrice();
        main.penalty = data.getPenalty();
        main.outsourceDay = data.getOutsourceDay();

        engine.start(main);
        engine.setRealTimeMode(false);
    }

    Map<String, Object> getCostByDay(Data data) {
        this.initModel(data);
        int currentTime = 0;

        List<Double> listOfCosts = new ArrayList<>();
        while (main.currentWork >= 0) {
            engine.step();
            if (currentTime != (int)main.currentDay) {
                currentTime = (int)main.currentDay;
                listOfCosts.add(main.price_realtime);
            }
        }
        Map<String, Object> result = new HashMap<>();
        result.put("days", listOfCosts.size());
        result.put("cost", listOfCosts);
        result.put("total_cost", main.totalPrice);

        return result;
    }
}
