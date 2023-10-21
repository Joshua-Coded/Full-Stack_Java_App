package com.plantstore.ui;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.ManagedBean;
import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.context.annotation.Scope;

import com.plantstore.dto.Plant;

@Named
@ManagedBean
@Scope("session")
public class SearchPlants {
	
	@Inject
	private Plant plant; 
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
			ArrayList<Plant> allPlants = new ArrayList<Plant>();
			
//			create all plants and add them to the collections.
			Plant redbud = new Plant();
			redbud.setName("Eastern Redbud");
			allPlants.add(redbud);
			
			Plant pawpaw =  new Plant();
			pawpaw.setName("Pawpaw");
			allPlants.add(pawpaw);
			
			Plant mango = new Plant();
			mango.setName("Mango");
			allPlants.add(mango);
			
			return allPlants;
	}

}
