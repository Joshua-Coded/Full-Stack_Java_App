package com.plantstore.dao;

import java.util.List;

import com.plantstore.dto.Plant;

public interface IPlantDAO {
	

	public List<Plant> fetchPlants();
	
	public void insertPlant(Plant plant) throws Exception;
	public void update(Plant plant) throws Exception;
	public void delete(Plant plant) throws Exception;

	public void save(Plant plant);
}
