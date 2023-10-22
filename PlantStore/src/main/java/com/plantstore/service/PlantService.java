package com.plantstore.service;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import com.plantstore.dao.IPlantDAO;
import com.plantstore.dto.Plant;


@Named
public class PlantService implements IPlantService {
	
	@Inject
	private
	IPlantDAO  plantDAO;
	private List<Plant> allPlants;

	@Override
	public List<Plant> filterPlant(String filter) {
		if (allPlants == null) {
			allPlants = getPlantDAO().fetchPlants();
		}

		List<Plant> returnPlants = new ArrayList<Plant>();
       // filter the list
		// I interviewed all the possible plants, and move all plants that contains the filter text into our subset collections. (which is returnPlants)
		for (Plant plant : allPlants) {
			if (plant.toString().contains(filter)) {
				// this plant matches our criteria, so it added it to the return collections that would be returned from this methods.
				returnPlants.add(plant);
			}
		}
		
		return returnPlants;
	}

	/**
	 * @return the plantDAO
	 */
	public IPlantDAO getPlantDAO() {
		return plantDAO;
	}

	/**
	 * @param plantDAO the plantDAO to set
	 */
	public void setPlantDAO(IPlantDAO plantDAO) {
		this.plantDAO = plantDAO;
	}

}
