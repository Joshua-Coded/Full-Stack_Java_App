package com.plantstore.service;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import com.plantstore.dao.IPlantDAO;
import com.plantstore.dto.Plant;


@Named
public  class PlantService implements IPlantService {

	@Inject
	private	IPlantDAO plantDAO;
	private List<Plant> allPlants;
	
	
	@Override
	public List<Plant> filterPlants(String filter) {
		
		if (allPlants == null ) {
			allPlants = getPlantDAO().fetchPlants();
		}
		
		// the collection we are returning.
		List<Plant> returnPlants = new ArrayList<Plant>();

		// filter the list.
		// interview all possible plants (allPlants)
		for (Plant plant : allPlants) {
			if (plant.toString().contains(filter)) {
				// this plant matches our criteria
				returnPlants.add(plant);
			}
		}
		
		return returnPlants;
		}
	
	
	@Override
	public void save(Plant Plant) throws Exception {
			plantDAO.insertPlant(Plant);
	}	
	
	/**
	 * @return the plantDAO
	*/
	public IPlantDAO getPlantDAO() {
		return plantDAO;
	}

	public void setPlantDAO(IPlantDAO plantDAO) {
		this.plantDAO = plantDAO;
	}


}
