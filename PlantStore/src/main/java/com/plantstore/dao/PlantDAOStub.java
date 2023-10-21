package com.plantstore.dao;

import java.util.ArrayList;
import java.util.List;

import com.plantstore.dto.Plant;

public class PlantDAOStub implements IPlantDAO {

	@Override
	public List<Plant> fetchPlants() {
		
		List<Plant> allPlants = new ArrayList<Plant>();					
		
		return null;
	}

	@Override
	public void insertPlant(Plant plant) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Plant plant) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(Plant plant) throws Exception {
		// TODO Auto-generated method stub

	}

}
