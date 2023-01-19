package com.example.cost;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Data {
    Double totalWorkTime;
    Double totalWorkAmount;
    Double teamEfficiency;
    Double outsourceEfficiency;
    Double teamPrice;
    Double outsourcePrice;
    Double penalty;
    Double outsourceDay;
}
