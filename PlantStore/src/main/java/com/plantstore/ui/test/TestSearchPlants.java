package com.plantstore.ui.test;

import org.junit.Test;

import com.plantstore.dto.Plant;
import com.plantstore.ui.SearchPlants;

import junit.framework.TestCase;

public class TestSearchPlants extends TestCase {
	private SearchPlants searchPlants;
	private String execute;

	@Test
	public void testSearcPlantsExecute() {
		givenSearchPlantsCreatedWithRebud();
		whenInvokedExecute();
		thenVerifyReturnSuccess();
	}
	
	@Test
	public void testSearchPlantsNoRedbud() {
		givenSearchPlantsCreatedWithoutRebud();
		whenInvokedExecute();
		thenVerifyReturnNoResults();
	}
	
	@Test
	public void testSearchPlantsNull() {
		givenSearchPlantsCreatedWithNullRebud();
		whenInvokedExecute();
		thenVerifyReturnNoResults();
	}

	private void givenSearchPlantsCreatedWithNullRebud() {
		searchPlants = new SearchPlants();
	}

	private void givenSearchPlantsCreatedWithoutRebud() {
		searchPlants = new SearchPlants();
		Plant plant = new Plant();
		plant.setName("pawpaw");
		searchPlants.setPlant(plant);
	}

	private void thenVerifyReturnNoResults() {
		assertEquals("no  result", execute);
	}

	private void thenVerifyReturnSuccess() {
		assertEquals("success", execute);
	}

	private void whenInvokedExecute() {
		execute = searchPlants.execute();
	}

	private void givenSearchPlantsCreatedWithRebud() {
		searchPlants = new SearchPlants();
		Plant plant = new Plant();
		plant.setName("Redbud");
		searchPlants.setPlant(plant);
	}
}
