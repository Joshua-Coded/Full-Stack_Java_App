package com.plantstore.service;

import java.util.List;

import com.plantstore.dto.Plant;

/**
 * IPlantService interface contains all business related functions for a plant and related entity.
 * @author Joshua Alana
 */
public interface IPlantService {
	
    /**
     * Return a collection of plant object that contain the given filter text.
     * @param filter a substring that should be contained in the returned plants.
     * @return a collection of matching plants
     */
	public List<Plant> filterPlants(String filter);

	/**
	 * save the plant and perform a validation check
	 * @param plant the plant we are persisting
	 * @throws Exception if unable to save
	 */
	void save(Plant plant) throws Exception;
}
