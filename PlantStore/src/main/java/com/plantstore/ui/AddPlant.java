package com.plantstore.ui;

import javax.faces.bean.ManagedBean;
import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.context.annotation.Scope;

import com.plantstore.dto.Plant;
import com.plantstore.service.IPlantService;

@Named
@ManagedBean
@Scope("session")
public class AddPlant {
	@Inject
	private Plant plant; 
	
	@Inject
	private IPlantService plantService;

	public String execute() {
		String returnValue = "Success";
		try {
			plantService.save(plant);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			returnValue = "fail";
		}
		return returnValue;
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

	/**
	 * @return the plantService
	 */
	public IPlantService getPlantService() {
		return plantService;
	}

	/**
	 * @param plantService the plantService to set
	 */
	public void setPlantService(IPlantService plantService) {
		this.plantService = plantService;
	}
}
