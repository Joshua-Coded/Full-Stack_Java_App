package com.plantstore.ui;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.ManagedBean;
import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.context.annotation.Scope;

import com.plantstore.dto.Plant;
import com.plantstore.service.IPlantService;

@Named
@ManagedBean
@Scope("session")
public class SearchPlants {
	
	@Inject
	private Plant plant; 
	
	@Inject
	private IPlantService plantService;
	public String execute() {
		
		if (plant != null &&  plant.getName().equalsIgnoreCase("redbud")) {
			return "search";
		}
			return "noresult";
	}
	/**
	 * @return the plant
	 */
	public Plant getPlant() {
		return plant;
	}
	/**
	 * @param plant the plant to set
	 */
	public void setPlant(Plant plant) {
		this.plant = plant;
	}
	
	public List<Plant> completePlants(String query) {
			return plantService.filterPlants(query);
	}

}
